<template>
  <modal
    title="库"
    width="500"
    top="85"
    bottom="85"
    v-if="commonStore.displayModal === ModalName.LIBRARIES"
    :show-footer="false"
    @close="updateDisplayModal(null)">
    <div>
      <div class="modal-sub-title">外部样式</div>
      <div class="modal-small-desc-text">你所添加的外部样式，将按照顺序在本地 CSS 执行之前依次执行，支持 http 和 https 协议链接</div>
      <div class="mt-s">
        <custom-select
          showSearch
          placeholder="输入想查找的样式库..."
          select-style="width: 100%;"
          v-model="styleLibraryKeyword"
          :size="Size.LARGE"
        ></custom-select>
      </div>
      <div class="mt-s flex" v-for="(item, index) in styleLibraryList" :key="item">
        <custom-input
          width="100%"
          v-model="styleLibraryList[index]"
          :size="Size.LARGE"
          :radius="0">
          <template v-slot:leftSide>
            <div class="fill-h cursor-pointer flex-col-center inline-flex font-s">
              <div class="flex-1 flex-y-center">
                <i class="icon iconfont icon-down line-h-unset icon-rotate-180 flex-1
                  inline-flex font-active fade-ease p-x-s pt-xs"></i>
              </div>
              <div class="flex-1 flex-y-center">
                <i class="icon iconfont icon-down line-h-unset flex-1 inline-flex
                  font-active fade-ease p-x-s pb-xs"></i>
              </div>
            </div>
          </template>
          <template v-slot:rightSide>
            <div class="cursor-pointer flex-y-center fill-h">
              <i class="icon iconfont icon-close font-active fade-ease font-xs p-x-s"></i>
            </div>
          </template>
        </custom-input>
      </div>
      <div class="add-new-item no-active-text flex-center cursor-pointer mt-s fade-ease">
        <i class="icon iconfont icon-add font-s"></i>
        <span class="ml-s font-xs">添加新样式</span>
      </div>
      <div class="modal-sub-title">外部脚本</div>
      <div class="modal-small-desc-text">你所添加的外部样式，将按照顺序在本地 JavaScript 执行之前依次执行，支持 http 和 https 协议链接</div>
      <div class="mt-s">
        <custom-select
          showSearch
          placeholder="输入想查找的脚本库..."
          select-style="width: 100%;"
          v-model="scriptLibraryKeyword"
          :size="Size.LARGE"
        ></custom-select>
      </div>
      <drag-sortable v-model="scriptLibraryList" draggable-target=".draggable-library">
        <div class="mt-s flex draggable-library" v-for="(item, index) in scriptLibraryList" :key="item">
          <custom-input
            width="100%"
            v-model="styleLibraryList[index]"
            :size="Size.LARGE"
            :radius="0">
            <template v-slot:leftSide>
              <div class="fill-h cursor-pointer flex-col-center inline-flex font-s">
                <div class="flex-1 flex-y-center">
                  <i class="icon iconfont icon-down line-h-unset icon-rotate-180 flex-1
                    inline-flex font-active fade-ease p-x-s pt-xs"></i>
                </div>
                <div class="flex-1 flex-y-center">
                  <i class="icon iconfont icon-down line-h-unset flex-1 inline-flex
                    font-active fade-ease p-x-s pb-xs"></i>
                </div>
              </div>
            </template>
            <template v-slot:rightSide>
              <div class="cursor-pointer flex-y-center fill-h">
                <i class="icon iconfont icon-close font-active fade-ease font-xs p-x-s"></i>
              </div>
            </template>
          </custom-input>
        </div>
      </drag-sortable>
      <div class="add-new-item no-active-text flex-center cursor-pointer mt-s fade-ease">
        <i class="icon iconfont icon-add font-s"></i>
        <span class="ml-s font-xs">添加新脚本</span>
      </div>
    </div>
  </modal>
</template>

<script lang="ts" setup>
import Modal from "@components/modal/modal.vue"
import CustomInput from "@components/form/custom-input/custom-input.vue"
import CustomSelect from "@components/form/custom-select/custom-select.vue"
import { useCommonStore } from "@store/common"
import { ModalName, Size } from "@type/interface"
import { onMounted, reactive, ref } from "vue"
import useLibraries from "./use-libraries"
import useDragSortable from "@hooks/use-drag-sortable"
import DragSortable from "@components/drag-sortable/drag-sortable.vue"

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const styleLibraryKeyword = ref<string>("")
const scriptLibraryKeyword = ref<string>("")

/** 初始选中的样式和脚本库列表，默认提供一个空的 */
const styleLibraryList = reactive<string[]>([""])
const scriptLibraryList = reactive<string[]>([""])

const { searchStyleLibraries, searchScriptLibraries } = useLibraries()

const handleChangeKeyword = () => {

}

// const styleDraggableArea =
onMounted(() => {
  // useDragSortable()
})
</script>

<style lang="scss" scoped>
.add-new-item {
  height: 41px;
  border: 2px dashed var(--color-no-active-color);
  border-radius: 8px;
  &:hover {
    border-color: var(--color-describe);
    color: var(--color-describe);
  }
}
</style>