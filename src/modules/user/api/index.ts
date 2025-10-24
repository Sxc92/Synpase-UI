import { request } from '@/core/api'
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
 * 用户相关 API
 */
export const userApi = {
  /**
   * 用户登录
   */
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return request.post<LoginResponse>('/auth/login', data).then(res => res.data)
  },

  /**
   * 用户登出
   */
  logout: (): Promise<void> => {
    return request.post<void>('/auth/logout').then(() => {})
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: (): Promise<User> => {
    return request.get<User>('/user/me').then(res => res.data)
  },

  /**
   * 获取用户列表
   */
  getUserList: (params: UserListParams): Promise<PaginationResponse<User>> => {
    return request.get<PaginationResponse<User>>('/users', { params }).then(res => res.data)
  },

  /**
   * 获取用户详情
   */
  getUserById: (id: string): Promise<User> => {
    return request.get<User>(`/users/${id}`).then(res => res.data)
  },

  /**
   * 创建用户
   */
  createUser: (data: CreateUserRequest): Promise<User> => {
    return request.post<User>('/users', data).then(res => res.data)
  },

  /**
   * 更新用户信息
   */
  updateUser: (id: string, data: UpdateUserRequest): Promise<User> => {
    return request.put<User>(`/users/${id}`, data).then(res => res.data)
  },

  /**
   * 删除用户
   */
  deleteUser: (id: string): Promise<void> => {
    return request.delete<void>(`/users/${id}`).then(() => {})
  },

  /**
   * 批量删除用户
   */
  batchDeleteUsers: (ids: string[]): Promise<void> => {
    return request.delete<void>('/users/batch', { data: { ids } }).then(() => {})
  },

  /**
   * 重置用户密码
   */
  resetPassword: (id: string, newPassword: string): Promise<void> => {
    return request.put<void>(`/users/${id}/password`, { password: newPassword }).then(() => {})
  },

  /**
   * 更新用户头像
   */
  updateAvatar: (id: string, avatar: string): Promise<User> => {
    return request.put<User>(`/users/${id}/avatar`, { avatar }).then(res => res.data)
  },

  /**
   * 获取用户统计信息
   */
  getUserStats: (): Promise<UserStats> => {
    return request.get<UserStats>('/users/stats').then(res => res.data)
  },

  /**
   * 检查用户名是否可用
   */
  checkUsername: (username: string): Promise<{ available: boolean }> => {
    return request.get<{ available: boolean }>(`/users/check-username/${username}`).then(res => res.data)
  },

  /**
   * 检查邮箱是否可用
   */
  checkEmail: (email: string): Promise<{ available: boolean }> => {
    return request.get<{ available: boolean }>(`/users/check-email/${email}`).then(res => res.data)
  },
}
