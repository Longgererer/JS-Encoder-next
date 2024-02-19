<template>
  <div
    class="active-text relative bg-form-item code-font cursor-pointer"
    ref="selectRef"
    :class="`${namespace}-wrapper ${namespace}-wrapper--${size}`"
    :style="customSelectStyle"
    @click="handleClickSelect">
    <div
      class="fade-ease"
      :class="`${namespace} ${namespace}--${size} ${isHighlightBorder ? 'highlight' : ''}`"
      :style="customSelectInnerStyle">
      <span :class="`${namespace}-value`">{{getOptionLabel(currSelectItem)}}</span>
      <div class="icon-area flex-y-center absolute">
        <i
          class="icon iconfont icon-down font-xs line-h-unset flex-1 inline-flex font-active fade-ease p-x-s"
          :class="isUnfoldOptions ? 'up' : ''"
        ></i>
      </div>
    </div>
    <teleport to="body" :disabled="!appendToBody">
      <div
        v-if="isUnfoldOptions"
        class="absolute bg-form-item shadow code-font"
        :class="`${namespace}-options ${namespace}-options--${size}`"
        :style="{...optionsStyle}">
        <div
          class="cursor-pointer fade-ease fill-w"
          :class="`${namespace}-option ${modelValue === item.value ? 'selected' : ''}`"
          :style="customOptionStyle"
          v-for="(item, index) in dataList"
          :key="index"
          @click.stop="handleClickOption(item)"
        >{{getOptionLabel(item)}}</div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue"
import useClickOutside from "@hooks/useClickOutside"
import { ISelectOption, IProps, IEmits } from "./custom-select"
import { Size } from "@type/interface"

const props = withDefaults(defineProps<IProps>(), {
  size: Size.MEDIUM,
  appendToBody: false,
})
const emits = defineEmits<IEmits>()

const namespace = "custom-select"
/** 是否展开 */
const isUnfoldOptions = ref<boolean>(false)
/** 是否高亮边框 */
const isHighlightBorder = ref<boolean>(false)

/** 当前选中选项 */
const currSelectItem = computed(() => {
  const { modelValue, dataList } = props
  return dataList.filter(({ value }) => value === modelValue)[0]
})
/** 获取选项的label，如果不传就取当前选中选项的label */
const getOptionLabel = (item?: ISelectOption): string => {
  return item
    ? String(item.label === undefined ? item.value : item.label)
    : ""
}

/** 点击选择框 */
const handleClickSelect = (): void => {
  isUnfoldOptions.value = !isUnfoldOptions.value
  isHighlightBorder.value = true
}
/** 点击选项缓存下选项内容 */
const handleClickOption = (item: ISelectOption): void => {
  emits("update:modelValue", item.value)
  isUnfoldOptions.value = false
  isHighlightBorder.value = false
}

// 监听弹窗外点击事件
const selectRef = ref<HTMLElement | null>(null)
const isClickOutSide = useClickOutside(selectRef)
watch(isClickOutSide, () => {
  if (isClickOutSide.value) {
    isUnfoldOptions.value = false
    isHighlightBorder.value = false
  }
})

/** 定位样式 */
const optionsStyle = ref<Record<string, string>>({})
onMounted(() => {
  if (props.appendToBody) {
    const { width = 0, height = 0, top = 0, left = 0 } = selectRef.value!.getBoundingClientRect()
    optionsStyle.value = {
      top: `${top + height}px`,
      left: `${left}px`,
      width: `${width}px`,
      transform: "none",
    }
  }
})
</script>

<style src="./custom-select.scss" lang="scss"></style>