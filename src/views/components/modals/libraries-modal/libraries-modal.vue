<template>
  <modal
    title="库"
    width="500"
    top="85"
    bottom="85"
    v-if="commonStore.displayModal === ModalName.LIBRARIES"
    :show-footer="false"
    @close="handleCloseModal">
    <div>
      <div class="modal-sub-title">外部样式</div>
      <div class="modal-small-desc-text">你所添加的外部样式，将按照顺序在本地 CSS 执行之前依次执行，支持 http 和 https 协议链接</div>
      <div class="mt-s">
        <custom-select
          showSearch
          placeholder="查找样式库..."
          select-style="width: 100%;"
          appendToBody
          v-model="styleLibraryKeyword"
          :size="Size.LARGE"
          :data-list="matchStyleLibraries"
          @selected="handleSelectStyleLibrary"
        ></custom-select>
      </div>
      <drag-sortable v-model="styleLibraryList" uniqueKey="id">
        <template v-for="(item, index) in styleLibraryList" :key="item.id" v-slot:[`item-${item.id}`]>
          <div class="mt-s flex">
            <custom-input
              width="100%"
              placeholder="请输入样式库链接..."
              v-model="styleLibraryList[index].url"
              :size="Size.LARGE">
              <template v-slot:rightSide>
                <div class="cursor-pointer flex-y-center fill-h">
                  <i class="icon iconfont icon-close font-active fade-ease font-xs p-x-s"></i>
                </div>
              </template>
            </custom-input>
          </div>
        </template>
      </drag-sortable>
      <div class="add-new-item no-active-text flex-center cursor-pointer mt-s fade-ease">
        <i class="icon iconfont icon-add font-s"></i>
        <span class="ml-s font-xs">添加新样式</span>
      </div>
      <div class="modal-sub-title">外部脚本</div>
      <div class="modal-small-desc-text">你所添加的外部样式，将按照顺序在本地 JavaScript 执行之前依次执行，支持 http 和 https 协议链接</div>
      <div class="mt-s">
        <custom-select
          showSearch
          placeholder="查找脚本库..."
          select-style="width: 100%;"
          appendToBody
          v-model="scriptLibraryKeyword"
          :size="Size.LARGE"
          :data-list="matchScriptLibraries"
          @selected="handleSelectScriptLibrary"
        ></custom-select>
      </div>
      <drag-sortable v-model="scriptLibraryList" uniqueKey="id">
        <template v-for="(item, index) in scriptLibraryList" :key="item.id" v-slot:[`item-${item.id}`]>
          <div class="mt-s flex">
            <custom-input
              width="100%"
              placeholder="请输入脚本库链接..."
              v-model="scriptLibraryList[index].url"
              :size="Size.LARGE">
              <template v-slot:rightSide>
                <div class="cursor-pointer flex-y-center fill-h">
                  <i class="icon iconfont icon-close font-active fade-ease font-xs p-x-s"></i>
                </div>
              </template>
            </custom-input>
          </div>
        </template>
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
import { ref, watch } from "vue"
import useLibraries, { ILibraryItem } from "./use-libraries"
import DragSortable from "@components/drag-sortable/drag-sortable.vue"
import { IMatchLibraryItem, ISelectedLibraryItem } from "./libraries.modal"
import { useEditorConfigStore } from "@store/editor-config"
import { storeToRefs } from "pinia"
import { debounce } from "@utils/common"
import { ISelectOption } from "@components/form/custom-select/custom-select"

const commonStore = useCommonStore()
const editorConfigStore = useEditorConfigStore()
const editorConfigStoreRefs = storeToRefs(editorConfigStore)

/** 选中的样式和脚本库列表，默认提供一个空的 */
const styleLibraryList = ref<ISelectedLibraryItem[]>([])
const scriptLibraryList = ref<ISelectedLibraryItem[]>([])

/** id自增 */
let libraryIdCount: number = 1
const getSelectedLibraryItem = (url: string = ""): ISelectedLibraryItem => ({
  id: libraryIdCount ++,
  url,
})

/** 初始化外部库内容 */
const initSelectedLibraries = () => {
  const { libraries } = editorConfigStoreRefs
  const { style, script } = libraries.value
  const styles = style.length
    ? style.map((url) => getSelectedLibraryItem(url))
    : [getSelectedLibraryItem()]
  const scripts = script.length
    ? script.map((url) => getSelectedLibraryItem(url))
    : [getSelectedLibraryItem()]
  styleLibraryList.value = styles
  scriptLibraryList.value = scripts
}
initSelectedLibraries()

/** 处理搜索 */
/** 搜索词 */
const styleLibraryKeyword = ref<string>("")
const scriptLibraryKeyword = ref<string>("")
/** 匹配的库列表 */
const matchStyleLibraries = ref<IMatchLibraryItem[]>([])
const matchScriptLibraries = ref<IMatchLibraryItem[]>([])
/** 搜索时展示loading */
const styleLibraryLoading = ref<boolean>(false)
const scriptLibraryLoading = ref<boolean>(false)
const { searchStyleLibraries, searchScriptLibraries } = useLibraries()
const trans2MatchLibrary = ({ name: value, url }: ILibraryItem) => ({ value, url })
/** 监听搜索词改变查询匹配库列表 */
watch(styleLibraryKeyword, debounce((newKeyword) => {
  styleLibraryLoading.value = true
  searchStyleLibraries(newKeyword).then((res) => {
    styleLibraryLoading.value = false
    matchStyleLibraries.value = res.map((item) => trans2MatchLibrary(item))
  })
}, 300))
watch(scriptLibraryKeyword, debounce((newKeyword) => {
  scriptLibraryLoading.value = true
  searchScriptLibraries(newKeyword).then((res) => {
    scriptLibraryLoading.value = false
    matchScriptLibraries.value = res.map((item) => trans2MatchLibrary(item))
  })
}, 300))
/** 选中库后设置到选中的样式和脚本库列表中 */
const handleSelectStyleLibrary = ({ url }: ISelectOption) => {
  styleLibraryList.value.push(getSelectedLibraryItem(url))
  styleLibraryKeyword.value = ""
}
const handleSelectScriptLibrary = ({ url }: ISelectOption) => {
  scriptLibraryList.value.push(getSelectedLibraryItem(url))
  scriptLibraryKeyword.value = ""
}

const handleCloseModal = () => {
  commonStore.updateDisplayModal(null)
  editorConfigStore.updateLibraries({
    style: styleLibraryList.value.map(({ url }) => url),
    script: scriptLibraryList.value.map(({ url }) => url),
  })
}
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