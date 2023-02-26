<script setup lang="ts">
import Navbar from '@views/components/navbar/navbar.vue'
import Sidebar from '@views/components/sidebar/sidebar.vue'
import EditorWrapper from '@views/components/editor-wrapper/editor-wrapper.vue'
import TemplateModal from '@views/components/modals/template-modal/template-modal.vue'
import CodeSettingsModal from '@views/components/modals/code-settings-modal/code-settings-modal.vue'
import LibrariesModal from '@views/components/modals/libraries-modal/libraries-modal.vue'
import UploadCodeModal from '@views/components/modals/upload-code-modal/upload-code-modal.vue'
import DownloadCodeModal from '@views/components/modals/download-code-modal/download-code-modal.vue'
import ShortcutModal from '@views/components/modals/shortcut-modal/shortcut-modal.vue'
import UpdateLogModal from '@views/components/modals/update-log-modal/update-log-modal.vue'

</script>

<template>
  <navbar></navbar>
  <div class="main-content flex">
    <sidebar></sidebar>
    <editor-wrapper></editor-wrapper>
  </div>
  <!--modals-->
  <template-modal></template-modal>
  <code-settings-modal></code-settings-modal>
  <libraries-modal></libraries-modal>
  <upload-code-modal></upload-code-modal>
  <download-code-modal></download-code-modal>
  <shortcut-modal></shortcut-modal>
  <update-log-modal></update-log-modal>
</template>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 50px);
}
</style>