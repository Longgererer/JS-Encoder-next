<template>
  <transition-group
    name="fademsg"
    tag="ul"
    class="fixed flex-col-center"
    :class="namespace">
    <template v-for="item in messageList" :key="item.id">
      <message
        :text="item.text"
        :type="item.type"
        :duration="item.duration"
        :custom-style="item.customStyle"
        @close="emits('close', item.id)">
      </message>
    </template>
  </transition-group>
</template>

<script setup lang="ts">
import { watch } from "vue"
import Message from "./components/message/message.vue"
import { IMessageListEmits, IMessageListProps } from "./message-list.interface"

const namespace = "message-list"
const props = defineProps<IMessageListProps>()

const emits = defineEmits<IMessageListEmits>()
watch(() => props.messageList, (a) => {
  console.log(a)
})
</script>

<style lang="scss">
$namespace: "message-list";
$transition-name: "message-fade";

.#{$namespace} {
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  z-index: 2000;
}
.fademsg-move,
.fademsg-enter-active,
.fademsg-leave-active {
  transition: all 0.2s cubic-bezier(0, 0, 1, 1);
}
.fademsg-enter-from,
.fademsg-leave-to {
  opacity: 0;
}
.fademsg-leave-active {
  position: absolute;
}
</style>