<template>
  <div class="user-detail-page">
    <div class="page-header">
      <h1 class="text-2xl font-bold">用户详情</h1>
      <p class="text-gray-600 mt-2">查看用户详细信息</p>
    </div>
    
    <div class="page-content mt-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-4">基本信息</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">用户ID</label>
                <p class="mt-1 text-sm text-gray-900">{{ userId }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">用户名</label>
                <p class="mt-1 text-sm text-gray-900">admin</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">邮箱</label>
                <p class="mt-1 text-sm text-gray-900">admin@example.com</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">角色</label>
                <span class="mt-1 inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-sm">管理员</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">状态信息</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">状态</label>
                <span class="mt-1 inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-sm">活跃</span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">创建时间</label>
                <p class="mt-1 text-sm text-gray-900">2024-01-01 10:00:00</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">最后登录</label>
                <p class="mt-1 text-sm text-gray-900">2024-10-23 21:00:00</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex space-x-4">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            编辑用户
          </button>
          <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            返回列表
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id as string
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.user-detail-page {
  @apply min-h-screen p-6 bg-gray-50;
}

.page-header {
  @apply mb-6;
}

.page-content {
  @apply max-w-7xl mx-auto;
}
</style>
