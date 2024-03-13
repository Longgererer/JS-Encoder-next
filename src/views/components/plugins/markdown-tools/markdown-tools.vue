<template>
  <div class="markdown-tools">
    <div
      class="markdown-tool flex-center"
      v-for="tool in toolInfoMap"
      :key="tool.type"
      :title="tool.title"
      @click="handleClickTool(tool)">
      <div class="fill">
        <i class="icon iconfont" :class="tool.icon"></i>
        <dropdown v-model="tool.showDropdown" :align="Align.MIDDLE">
          <template #options>
            <dropdown-item
              v-for="(item, index) in tool.dropdown"
              :key="index"
              @click="handleClickDropdownItem(tool, index)">
              <div :title="item.title">
                <i v-if="item.icon" class="icon icon" :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </div>
            </dropdown-item>
          </template>
        </dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * desc: 使用markdown的时候作为快捷工具栏出现在编辑区域上方
 */
import { ITitleInfo, IToolInfo, ToolType, toolInfoMap } from "./markdown-tools"
import Dropdown from "@components/dropdown/dropdown.vue"
import DropdownItem from "@components/dropdown/dropdown-item.vue"
import { Align } from "@type/interface"
import { MarkdownTools } from "@utils/editor/utils/markdown-tools"

// const markdownTools = new MarkdownTools()
const toolType2FuncMap = {
  [ToolType.BOLD]: () => {},
  [ToolType.ITALIC]: () => {},
  [ToolType.DELETE]: () => {},
  [ToolType.TITLE]: () => {},
  [ToolType.LINK]: () => {},
  [ToolType.IMAGE]: () => {},
  [ToolType.QUOTE]: () => {},
  [ToolType.CODE]: () => {},
  [ToolType.UL]: () => {},
  [ToolType.OL]: () => {},
  [ToolType.LINE]: () => {},
  [ToolType.PDF]: () => {},
}

const processChooseTitle = (titleInfo: ITitleInfo) => {
  const { level } = titleInfo
}

const handleClickTool = (tool: IToolInfo) => {
  const { dropdown, type } = tool
  if (dropdown) {
    tool.showDropdown = true
  } else {
    toolType2FuncMap[type]()
  }
}

/** 点击下拉菜单项 */
const handleClickDropdownItem = (tool: IToolInfo, index: number) => {
  const { type, dropdown = [] } = tool
  if (type === ToolType.TITLE) {
    processChooseTitle(dropdown[index] as ITitleInfo)
  } else { }
}
</script>

<style lang="scss" scoped></style>