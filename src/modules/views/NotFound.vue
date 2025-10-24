<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <h1 class="text-6xl font-bold text-gray-300">404</h1>
      <h2 class="text-2xl font-semibold mt-4">页面不存在</h2>
      <p class="text-gray-600 mt-2">抱歉，您访问的页面不存在。</p>
      <router-link to="/" class="inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 页面组件
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.not-found-page {
  @apply min-h-screen flex items-center justify-center bg-gray-50;
}

.not-found-container {
  @apply text-center;
}
</style>
