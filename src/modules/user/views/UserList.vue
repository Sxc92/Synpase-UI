<template>
  <div class="user-list-page">
    <div class="page-header">
      <h1 class="text-2xl font-bold">用户列表</h1>
      <p class="text-gray-600 mt-2">查看和管理所有用户</p>
    </div>
    
    <div class="page-content mt-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">用户数据</h2>
          <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            添加用户
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-4 py-2 text-left">ID</th>
                <th class="px-4 py-2 text-left">用户名</th>
                <th class="px-4 py-2 text-left">邮箱</th>
                <th class="px-4 py-2 text-left">角色</th>
                <th class="px-4 py-2 text-left">状态</th>
                <th class="px-4 py-2 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="px-4 py-2">1</td>
                <td class="px-4 py-2">admin</td>
                <td class="px-4 py-2">admin@example.com</td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">管理员</span>
                </td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">活跃</span>
                </td>
                <td class="px-4 py-2">
                  <button class="text-blue-600 hover:text-blue-800 mr-2">编辑</button>
                  <button class="text-red-600 hover:text-red-800">删除</button>
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2">2</td>
                <td class="px-4 py-2">user1</td>
                <td class="px-4 py-2">user1@example.com</td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">用户</span>
                </td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">活跃</span>
                </td>
                <td class="px-4 py-2">
                  <button class="text-blue-600 hover:text-blue-800 mr-2">编辑</button>
                  <button class="text-red-600 hover:text-red-800">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 用户列表页面组件
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.user-list-page {
  @apply min-h-screen p-6 bg-gray-50;
}

.page-header {
  @apply mb-6;
}

.page-content {
  @apply max-w-7xl mx-auto;
}
</style>
