<template>
  <div class="user-management-page">
    <div class="page-header">
      <h1 class="text-2xl font-bold">用户管理</h1>
      <p class="text-gray-600 mt-2">管理系统用户信息</p>
    </div>
    
    <div class="page-content mt-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-4">用户列表</h2>
        <p class="text-gray-600">用户列表功能开发中...</p>
        <router-link 
          to="/users/list" 
          class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          查看用户列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 用户管理页面组件
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.user-management-page {
  @apply min-h-screen p-6 bg-gray-50;
}

.page-header {
  @apply mb-6;
}

.page-content {
  @apply max-w-7xl mx-auto;
}
</style>
