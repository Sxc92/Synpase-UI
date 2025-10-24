<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <h1 class="text-3xl font-bold text-center mb-8">仪表盘</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">用户管理</h3>
          <p class="text-gray-600">管理系统用户</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">数据统计</h3>
          <p class="text-gray-600">查看系统数据</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">系统设置</h3>
          <p class="text-gray-600">配置系统参数</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 仪表盘页面组件
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.dashboard-page {
  @apply min-h-screen p-6 bg-gray-50;
}

.dashboard-container {
  @apply max-w-7xl mx-auto;
}
</style>
