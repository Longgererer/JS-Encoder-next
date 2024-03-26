<template>
  <div
    class="template flex code-font p-l radius-l cursor-pointer fade-ease"
    :class="active ? 'active' : ''"
    @mousedown="handleChooseTemplate()">
    <svg class="lang-icon" aria-hidden="true">
      <use :xlink:href="`#${templateIcon}`"></use>
    </svg>
    <div class="flex-col flex-jcb">
      <div class="active-text font-xs template-lang">{{template.lang}}</div>
      <div
        class="font-xxs template-type"
        :class="template.isComponent ? 'golden-text' : 'describe-text'"
      >{{template.isComponent ? "component" : "default"}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IEmits, IProps, getTemplateIcon } from "./template-card"

const props = withDefaults(defineProps<IProps>(), {})
const emits = defineEmits<IEmits>()

const handleChooseTemplate = () => {
  emits("choose", props.template)
}

const templateIcon = getTemplateIcon(props.template)
</script>

<style lang="scss" scoped>
.template {
  background-color: var(--color-main-bg-1);
  border: 2px solid var(--color-main-bg-1);
  &:hover {
    border: 2px solid var(--color-primary1);
  }
  &.active {
    background-color: var(--color-primary1);
    border: 2px solid var(--color-primary2);
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
</style>