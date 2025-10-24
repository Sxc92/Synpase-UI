<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 现在这些导入都是自动的
// import { onMounted } from 'vue'
// import { useAppStore } from '@/core/stores/app'

const appStore = useAppStore()

onMounted(() => {
  // 应用主题
  appStore.updateTheme()
})
</script>

<style scoped lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>