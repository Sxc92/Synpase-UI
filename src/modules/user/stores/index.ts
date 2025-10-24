import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '../api'
import type { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  LoginRequest, 
  LoginResponse,
  UserListParams,
  UserStats 
} from '../types'
import type { PaginationResponse } from '@/core/types/common'

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', () => {
  // 状态
  const currentUser = ref<User | null>(null)
  const users = ref<User[]>([])
  const userStats = ref<UserStats | null>(null)
  const loading = ref(false)
  const isLoggedIn = ref(false)

  // 计算属性
  const userDisplayName = computed(() => {
    return currentUser.value?.name || currentUser.value?.username || '未登录'
  })

  const userAvatar = computed(() => {
    return currentUser.value?.avatar || '/default-avatar.png'
  })

  const userRole = computed(() => {
    return currentUser.value?.role || 'guest'
  })

  const userPermissions = computed(() => {
    return currentUser.value?.permissions || []
  })

  const hasPermission = computed(() => {
    return (permission: string): boolean => {
      return userPermissions.value.includes(permission)
    }
  })

  const isAdmin = computed(() => {
    return userRole.value === 'admin'
  })

  const userCount = computed(() => {
    return users.value.length
  })

  const activeUsers = computed(() => {
    return users.value.filter(user => user.status === 'active')
  })

  // 方法
  /**
   * 用户登录
   */
  const login = async (data: LoginRequest): Promise<LoginResponse> => {
    loading.value = true
    try {
      const response = await userApi.login(data)
      
      // 保存 token
      localStorage.setItem('token', response.token)
      localStorage.setItem('refreshToken', response.refreshToken)
      
      // 保存用户信息
      currentUser.value = response.user
      isLoggedIn.value = true
      
      return response
    } finally {
      loading.value = false
    }
  }

  /**
   * 用户登出
   */
  const logout = async (): Promise<void> => {
    try {
      await userApi.logout()
    } finally {
      // 清除本地存储
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      
      // 重置状态
      currentUser.value = null
      isLoggedIn.value = false
      users.value = []
      userStats.value = null
    }
  }

  /**
   * 获取当前用户信息
   */
  const fetchCurrentUser = async (): Promise<void> => {
    loading.value = true
    try {
      const user = await userApi.getCurrentUser()
      currentUser.value = user
      isLoggedIn.value = true
    } finally {
      loading.value = false
    }
  }

  /**
   * 获取用户列表
   */
  const fetchUsers = async (params: UserListParams): Promise<void> => {
    loading.value = true
    try {
      const response = await userApi.getUserList(params)
      users.value = response.data
    } finally {
      loading.value = false
    }
  }

  /**
   * 获取用户统计信息
   */
  const fetchUserStats = async (): Promise<void> => {
    try {
      const stats = await userApi.getUserStats()
      userStats.value = stats
    } catch (error) {
      console.error('获取用户统计信息失败:', error)
    }
  }

  /**
   * 创建用户
   */
  const createUser = async (data: CreateUserRequest): Promise<User> => {
    const user = await userApi.createUser(data)
    users.value.push(user)
    return user
  }

  /**
   * 更新用户信息
   */
  const updateUser = async (id: string, data: UpdateUserRequest): Promise<User> => {
    const user = await userApi.updateUser(id, data)
    
    // 更新用户列表中的用户信息
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = user
    }
    
    // 如果是当前用户，更新当前用户信息
    if (currentUser.value?.id === id) {
      currentUser.value = user
    }
    
    return user
  }

  /**
   * 删除用户
   */
  const deleteUser = async (id: string): Promise<void> => {
    await userApi.deleteUser(id)
    users.value = users.value.filter(user => user.id !== id)
  }

  /**
   * 批量删除用户
   */
  const batchDeleteUsers = async (ids: string[]): Promise<void> => {
    await userApi.batchDeleteUsers(ids)
    users.value = users.value.filter(user => !ids.includes(user.id))
  }

  /**
   * 重置状态
   */
  const reset = (): void => {
    currentUser.value = null
    users.value = []
    userStats.value = null
    loading.value = false
    isLoggedIn.value = false
  }

  return {
    // 状态
    currentUser,
    users,
    userStats,
    loading,
    isLoggedIn,
    
    // 计算属性
    userDisplayName,
    userAvatar,
    userRole,
    userPermissions,
    hasPermission,
    isAdmin,
    userCount,
    activeUsers,
    
    // 方法
    login,
    logout,
    fetchCurrentUser,
    fetchUsers,
    fetchUserStats,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
    reset,
  }
})
