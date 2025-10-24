<template>
  <div class="main-layout">
    <div class="layout-header">
      <h1 class="text-xl font-semibold">SynapseUI</h1>
    </div>
    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// 主布局组件
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.main-layout {
  @apply min-h-screen bg-gray-50;
}

.layout-header {
  @apply bg-white shadow-sm border-b px-6 py-4;
}

.layout-content {
  @apply p-6;
}
</style>
