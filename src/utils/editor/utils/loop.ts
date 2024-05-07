const acorn = require("acorn")
import estraverse from "estraverse"

const WINDOW_LOOP_ATTR = "JSE_LOOP_CONTROLLER"

/** 在循环中插入终止代码，防止用户代码中的死循环导致浏览器页面卡死 */
// eslint-disable-next-line max-lines-per-function
export const processLoop = async (code: string) => {
  if (!code) { return code }
  let codeCpy = code
  let AST = null

  // 将代码解析成AST，如果代码语法解析错误，直接返回源代码
  try {
    AST = acorn.parse(codeCpy, {
      ecmaVersion: 2022,
      sourceType: "script",
    })
  } catch (error) {
    console.log(error)
    return codeCpy
  }

  /** 需要插入代码的位置范围 */
  const fragments: Array<{ pos: number, str: string }> = []
  /** loopID 用于标记循环 */
  let loopID = 1
  /** 标记循环时需要插入的代码 */
  const insertCode = {
    setMonitor: `window.${WINDOW_LOOP_ATTR}.loopMonitor(%d);`,
    delMonitor: `;window.${WINDOW_LOOP_ATTR}.delLoop(%d);`,
  }

  // 遍历AST，找出循环位置
  estraverse.traverse(AST, {
    // eslint-disable-next-line @typescript-eslint/typedef
    enter(node: any) {
      switch (node.type) {
        case "WhileStatement":
        case "DoWhileStatement":
        case "ForStatement":
        case "ForInStatement":
        case "ForOfStatement": {
          // 获取循环体的头和尾
          // eslint-disable-next-line prefer-const
          let { start, end } = node.body
          start++
          let prefix = insertCode.setMonitor.replace("%d", String(loopID))
          let suffix = ""
          // 如果循环体没有被{}包裹，而是采用缩进的形式，需要手动添加{}
          if (node.body.type !== "BlockStatement") {
            prefix = "{" + prefix
            suffix = "}"
            --start
          }
          fragments.push({ pos: start, str: prefix })
          fragments.push({ pos: end, str: suffix })
          fragments.push({ pos: node.end, str: insertCode.delMonitor.replace("%d", String(loopID)) })
          ++loopID
          break
        }
        default:
          break
      }
    },
  })

  // 将代码插入到相应位置中
  fragments.sort((a, b) => {
    return b.pos - a.pos
  }).forEach(({ pos, str }) => {
    codeCpy = code.slice(0, pos) + str + code.slice(pos)
  })

  return codeCpy
}

interface ILoopInfo {
  /** 是否被初始化 */
  isInit: boolean
  /** 该循环执行累计时间 */
  sumExeTime: number,
  /** 循环开始时间 */
  startTime: number,
  /** 循环执行次数 */
  count: number,
}

// eslint-disable-next-line max-lines-per-function
export const setLoopController = (window: Window) => {
  if (window.hasOwnProperty(WINDOW_LOOP_ATTR)) { return }
  const loopController = {
    timeConfig: {
      /** 每个循环最大累计执行时间 */
      maxSumExeTime: 3000,
      /** 循环最大次数 */
      maxLoopCount: 1000000,
    },
    loopMap: new Map<number, ILoopInfo>(),
    /** 初始化loop */
    initLoop(loopID: number) {
      this.setLoop(loopID, {
        isInit: true, // 是否被初始化
        sumExeTime: 0, // 该循环执行累计时间
        startTime: Date.now(), // 循环开始时间
        count: 0, // 循环执行次数
      })
    },
    getLoop(loopID: number) {
      return this.loopMap.get(loopID)
    },
    setLoop(loopID: number, loop: any) {
      this.loopMap.set(loopID, loop)
    },
    delLoop(loopID: number) {
      this.loopMap.delete(loopID)
    },
    clearLoops() {
      this.loopMap.clear()
    },
    /** 退出循环 */
    exitLoop(loopID: number) {
      this.delLoop(loopID)
    },
    calcLoop(loopID: number) {
      if (this.loopMap.has(loopID)) {
        const loop = this.getLoop(loopID)
        if (!loop) { return }
        // eslint-disable-next-line prefer-const
        let { isInit, sumExeTime, startTime, count } = loop
        if (isInit) {
          sumExeTime = Date.now() - startTime
          count++
          this.setLoop(loopID, {
            isInit,
            sumExeTime,
            startTime,
            count,
          })
        } else {
          this.initLoop(loopID)
        }
      } else {
        this.initLoop(loopID)
      }
    },
    loopMonitor(loopID: number) {
      this.calcLoop(loopID)
      const loop = this.getLoop(loopID)
      if (!loop) { return }
      const { maxSumExeTime, maxLoopCount } = this.timeConfig
      // 如果循环次数超过最大次数，并且时间超过最大循环时间，就抛出异常
      if (loop.sumExeTime > maxSumExeTime && loop.count > maxLoopCount) {
        this.clearLoops()
        // eslint-disable-next-line max-len
        throw new Error("This loop executes so many times that JS-Encoder have to exit the loop in case the page gets stuck")
      }
    },
  }
  Object.defineProperty(window, WINDOW_LOOP_ATTR, { value: loopController })
}