import { EditorView } from "@codemirror/view"
import { CodemirrorBase } from "./codemirror-base"
import { isHttpUrl } from "@utils/tools/common"

export class MarkdownTools extends CodemirrorBase {
  constructor(view: EditorView) {
    super(view)
  }

  /**
   * 将标志字符串如：~、**、`等插入选中文本两边以达到改变样式的效果
   * 用于代码，粗体，斜体和中划线样式
   */
  public changeTextStyle(flagText: string): void {
    const changeOffset = flagText.length
    let [preExist, sufExist] = [false, false]
    if (this.somethingSelected()) {
      // 已经选中范围信息
      const selectRange = this.getListSelections()[0]
      // 获取选中的文本和前后光标位置
      const { head, anchor } = this.getRangeBothSides(selectRange)
      const { line: headLine, col: headCol } = head
      const { line: anchorLine, col: anchorCol } = anchor
      // 判断文本前后是否有标记字符串
      const preRangeText = this.getRangeText({ line: headLine, col: headCol - changeOffset }, head)
      const sufRangeText = this.getRangeText(anchor, { line: anchorLine, col: anchorCol + changeOffset })
      preExist = preRangeText === flagText
      sufExist = sufRangeText === flagText
      // 获取选中文本
      const selectText = this.getSelectionText()
      // 替换选中的文本，插入标记字符串（如果已经有标记字符串就删除）
      this.replaceRange(
        { line: headLine, col: preExist ? headCol - changeOffset : headCol },
        { line: anchorLine, col: sufExist ? anchorCol + changeOffset : anchorCol },
        `${preExist ? "" : flagText}${selectText}${sufExist ? "" : flagText}`,
      )
    } else {
      const cursor = this.getCursor()
      const { line: cursorLine, col: cursorCol } = cursor
      // 判断光标前后是否有标记字符串
      const preRangeText = this.getRangeText({ line: cursorLine, col: cursorCol - changeOffset }, cursor)
      const sufRangeText = this.getRangeText(cursor, { line: cursorLine, col: cursorCol + changeOffset })
      preExist = preRangeText === flagText
      sufExist = sufRangeText === flagText
      if (preExist && sufExist) {
        // 如果已经有标记字符串就删除
        this.replaceRange(
          { line: cursorLine, col: cursorCol - changeOffset },
          { line: cursorLine, col: cursorCol + changeOffset },
        )
        this.setCursor({ line: cursorLine, col: cursorCol - changeOffset })
      } else if (!preExist && !sufExist) {
        this.replaceSelection(flagText + flagText)
        this.setCursor({ line: cursorLine, col: cursorCol + changeOffset })
      } else { }
    }
  }

  /** 插入有序列表 */
  public insertOrderList(): void {
    if (this.somethingSelected()) {
      // 已经选中范围信息
      const selectRange = this.getListSelections()[0]
      // 获取选中的文本和前后光标位置
      const { head, anchor } = this.getRangeBothSides(selectRange)
      const { line: headLine } = head
      const { line: anchorLine } = anchor
      if (headLine !== anchorLine) {
        let col = 0
        let orderNumber = 1
        for (let i = headLine; i <= anchorLine; i++) {
          // 光标移到选择的每一行开头加上数字
          this.setCursor({ line: i, col: 0 })
          const replaceText = `${orderNumber++}. `
          this.replaceSelection(replaceText)
          if (i === anchorLine) {
            col += (replaceText + this.getLine(i)).length
          }
        }
        this.setCursor({ line: anchorLine, col })
      } else {
        const selectText = this.getSelectionText()
        const preRangeText = this.getRangeText({ line: headLine, col: 0 }, head)
        // 获取item前面的制表符空格和列表号数
        const { orderNumber, preBlank } = this.getSplitListItem(preRangeText)
        const replaceText = `\n${preBlank}${orderNumber + 1}. ${selectText}\n`
        this.replaceSelection(replaceText)
        this.setCursor({ line: headLine + 1, col: replaceText.length })
      }
    } else {
      const cursor = this.getCursor()
      const { line: cursorLine } = cursor
      const preRangeText = this.getRangeText({ line: cursorLine, col: 0 }, cursor)
      // 获取item前面的制表符空格和列表号数
      const { orderNumber, preBlank } = this.getSplitListItem(preRangeText)
      const replaceText = `\n${preBlank}${orderNumber + 1}. `
      this.replaceSelection(replaceText)
      this.setCursor({ line: cursorLine + 1, col: replaceText.length - 1 })
    }
  }

  /** 插入无序列表或引用 */
  public insertUnorderedList(flagText: string): void {
    if (this.somethingSelected()) {
      // 已经选中范围信息
      const selectRange = this.getListSelections()[0]
      // 获取选中的文本和前后光标位置
      const { head, anchor } = this.getRangeBothSides(selectRange)
      const { line: headLine } = head
      const { line: anchorLine } = anchor
      if (headLine === anchorLine) {
        // 选中了单行文本，检测开头是否有标记的字符串，有就将其删除，否则插入标记字符
        const preRangeText = this.getRangeText({ line: headLine, col: 0 }, head)
        if (preRangeText === flagText) {
          this.replaceRange({ line: headLine, col: 0 }, head)
        } else {
          const selectText = this.getSelectionText()
          const replaceText = `\n${flagText}${selectText}\n`
          this.replaceSelection(replaceText)
          this.setCursor({ line: headLine + 2, col: (flagText + selectText).length })
        }
      } else {
        // 选中了多行文本，在每行前加上标记字符
        let changeOffset = flagText.length
        for (let i = headLine; i <= anchorLine; i++) {
          // 光标移到选择的每一行开头加上无序列表或引用标志
          this.setCursor({ line: i, col: 0 })
          this.replaceSelection(flagText)
          if (i === anchorLine) {
            changeOffset += this.getLine(i).text.length
          }
        }
        this.setCursor({ line: anchorLine, col: changeOffset })
      }
    } else {
      const cursor = this.getCursor()
      // eslint-disable-next-line prefer-const
      let { line: cursorLine, col: cursorCol } = cursor
      const preRangeText = this.getRangeText({ line: cursorLine, col: 0 }, cursor)
      const { preBlank } = this.getSplitListItem(preRangeText)
      let replaceText = flagText
      if (cursorCol) {
        // 前面已经有东西就换到下一行
        replaceText = `\n${preBlank}${replaceText}`
        cursorLine ++
      }
      this.replaceSelection(replaceText)
      this.setCursor({ line: cursorLine, col: replaceText.length - 1 })
    }
  }

  /** 插入横线 */
  public insertLine(): void {
    if (this.somethingSelected()) {
      const selectRange = this.getListSelections()[0]
      const { head } = this.getRangeBothSides(selectRange)
      this.replaceSelection("\n\n---\n")
      this.setCursor(head)
    } else {
      const cursor = this.getCursor()
      // eslint-disable-next-line prefer-const
      let { line: cursorLine, col: cursorCol } = cursor
      const replaceText = cursorCol ? "\n\n---\n\n" : "\n---\n\n"
      cursorLine += cursorCol ? 4 : 3
      this.replaceSelection(replaceText)
      this.setCursor({ line: cursorLine, col: 0 })
    }
  }

  /** 根据标题级别H1,H2,H3,H4,H5,H6，添加标题 */
  public insertTitle(level: number): void {
    let prefix = ""
    for (let i = 0; i < level; i++) {
      prefix += "#"
    }
    prefix += " "
    if (this.somethingSelected()) {
      const selectRange = this.getListSelections()[0]
      const selectText = this.getSelectionText()
      const { head, anchor } = this.getRangeBothSides(selectRange)
      const { line: headLine, col: headCol } = head
      const { line: anchorLine } = anchor
      if (headLine !== anchorLine) { return }
      if (headCol) {
        const cursorLineText = this.getLine(headLine).text
        const preText = cursorLineText.substring(0, headCol)
        // 选中了文字但起始不为0，判断前面是否已经有标题了
        if (/^(#*) $/.test(preText)) {
          // 如果前面是以多个#开头并以一个空格结尾，删除标题
          this.replaceRange({ line: headLine, col: 0 }, head)
        } else {
          this.replaceSelection(`\n${prefix}${selectText}\n`)
        }
      } else {
        this.replaceSelection(`${prefix}${selectText}\n`)
      }
    } else {
      const cursor = this.getCursor()
      let { line: cursorLine, col: cursorCol } = cursor
      const cursorLineText = this.getLine(cursorLine).text
      if (cursorCol) {
        prefix = "\n\n" + prefix
      }
      this.setCursor({ line: cursorLine + 1, col: 0 })
      this.replaceSelection("\n")
      this.setCursor(cursor)
      this.replaceSelection(prefix)
      this.setCursor(cursor)
      cursorLine += cursorCol ? 3 : 1
      if (cursorCol === cursorLineText.length) {
        cursorLine -= 1
        cursorCol = prefix.length
      } else {
        cursorCol = 0
      }
      this.setCursor({ line: cursorLine, col: cursorCol })
    }
  }

  /** 插入链接或图片 */
  public insertLink(isImage?: boolean): void {
    if (this.somethingSelected()) {
      const selectRange = this.getListSelections()[0]
      const selectText = this.getSelectionText()
      const { head, anchor } = this.getRangeBothSides(selectRange)
      // eslint-disable-next-line prefer-const
      let { line: headLine, col: headCol } = head
      const { line: anchorLine } = anchor
      if (headLine !== anchorLine) { return }
      const isLink = isHttpUrl(selectText)
      let replaceText = isLink ? `[](${selectText})` : `[${selectText}]()`
      headCol += isLink ? 1 : selectText.length + 3
      if (isImage) {
        headCol += 1
        replaceText = "!" + replaceText
      }
      this.replaceSelection(replaceText)
      this.setCursor({ line: headLine, col: headCol })
    } else {
      const cursor = this.getCursor()
      // eslint-disable-next-line prefer-const
      let { line: cursorLine, col: cursorCol } = cursor
      let replaceText = "[]()"
      cursorCol += 3
      if (isImage) {
        replaceText = "!" + replaceText
        cursorCol ++
      }
      this.replaceSelection(replaceText)
      this.setCursor({ line: cursorLine, col: cursorCol })
    }
  }

  private getSplitListItem(text: string): { orderNumber: number, preBlank: string } {
    const matchRegExp = /^( |\t)+/
    /** 列表每项前面的数字 */
    let orderNumber = 1
    /** 列表每项前面的制表符或空格 */
    let preBlank = ""
    if (matchRegExp.test(text)) {
      // 取出前面的空格和制表符
      preBlank = text.match(matchRegExp)?.[0] || ""
      text = text.trimStart()
    }
    if (/^\d+(\.) /.test(text)) {
      // 取出前面的数字
      orderNumber = Number(text.match(/^\d+/)?.[0] || orderNumber)
    }
    return { orderNumber, preBlank }
  }
}