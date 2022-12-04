<script setup lang="ts">
import Modal from '@components/modal/modal.vue'
import { computed, ref } from 'vue'
import { useCommonStore } from '@store/common'
import { ModalName } from '@type/interface'
import { TemplateLang, TemplateType } from '@type/editor'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

interface ITemplateItem {
  lang: TemplateLang
  type: TemplateType
}

/* 内置模板列表 */
const inbuiltTemplateList: ITemplateItem[] = [
  { lang: TemplateLang.VUE2, type: TemplateType.DEFAULT },
  { lang: TemplateLang.VUE3, type: TemplateType.DEFAULT },
  { lang: TemplateLang.VANILLA, type: TemplateType.DEFAULT },
  { lang: TemplateLang.REACT, type: TemplateType.DEFAULT },
  { lang: TemplateLang.ANGULAR, type: TemplateType.DEFAULT },
  { lang: TemplateLang.VUE2, type: TemplateType.COMPONENT },
  { lang: TemplateLang.VUE3, type: TemplateType.COMPONENT },
]

const TemplateLang2IconMap = {
  [TemplateLang.VUE2]: 'icon-vue',
  [TemplateLang.VUE3]: 'icon-vue',
  [TemplateLang.VANILLA]: 'icon-javascript',
  [TemplateLang.REACT]: 'icon-react',
  [TemplateLang.ANGULAR]: 'icon-angular',
  [TemplateLang.CUSTOM]: 'icon-custom-template',
}

const selectInbuiltIndex = ref<number>(-1)

const handleClickInbuiltTemplate = (index: number): void => {
  selectInbuiltIndex.value = index
}
</script>

<template>
  <modal v-if="commonStore.displayModal === ModalName.TEMPLATE" @close="updateDisplayModal(null)"
    title="模板" :showFooter="false" width="730">
    <div class="modal-sub-title">内置模板</div>
    <div class="modal-desc-text">选择你想使用的模板</div>
    <div class="inbuilt-template-list">
      <div class="template flex code-font p-l radius-l cursor-pointer fade-ease"
        :class="index === selectInbuiltIndex ? 'active' : ''" v-for="(item, index) in inbuiltTemplateList"
        :key="index" @mousedown="handleClickInbuiltTemplate(index)">
        <svg class="lang-icon" aria-hidden="true">
          <use :xlink:href="`#${TemplateLang2IconMap[item.lang]}`"></use>
        </svg>
        <div class="flex-col flex-jcb">
          <div class="active-text font-xs template-lang">{{item.lang}}</div>
          <div class="font-xxs template-type"
            :class="item.type === TemplateType.COMPONENT ? 'gold-text' : 'describe-text'">{{item.type}}</div>
        </div>
      </div>
    </div>
    <div class="modal-sub-title">自定义模板</div>
  </modal>
</template>

<style lang="scss" scoped>
.inbuilt-template-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  .template {
    width: 214px;
    background-color: var(--color-main-bg-1);
    border: 2px solid var(--color-main-bg-1);
    &:hover {
      border: 2px solid var(--color-primary);
    }
    &.active {
      background-color: var(--color-primary);
      border: 2px solid var(--color-primary);
    }
    .lang-icon {
      width: 40px;
      height: 40px;
      margin-right: 32px;
    }
    .template-lang {
      line-height: 18px;
    }
    .template-type {
      line-height: 16px;
    }
  }
}
</style>