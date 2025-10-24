import type { PaginationParams } from '@/core/types/common'

/**
 * 用户信息接口
 */
export interface User {
  readonly id: string
  readonly username: string
  readonly email: string
  readonly name: string
  readonly avatar?: string
  readonly phone?: string
  readonly status: 'active' | 'inactive' | 'banned'
  readonly role: 'admin' | 'user' | 'guest'
  readonly permissions: string[]
  readonly createdAt: string
  readonly updatedAt: string
}

/**
 * 创建用户请求
 */
export interface CreateUserRequest {
  readonly username: string
  readonly email: string
  readonly name: string
  readonly password: string
  readonly phone?: string
  readonly role?: 'admin' | 'user' | 'guest'
}

/**
 * 更新用户请求
 */
export interface UpdateUserRequest {
  readonly name?: string
  readonly email?: string
  readonly phone?: string
  readonly avatar?: string
  readonly status?: 'active' | 'inactive' | 'banned'
  readonly role?: 'admin' | 'user' | 'guest'
  readonly permissions?: string[]
}

/**
 * 用户登录请求
 */
export interface LoginRequest {
  readonly username: string
  readonly password: string
  readonly remember?: boolean
  readonly role?: string
  captcha?: string
}

/**
 * 用户登录响应
 */
export interface LoginResponse {
  readonly token: string
  readonly refreshToken: string
  readonly user: User
  readonly expiresIn: number
}

/**
 * 用户列表查询参数
 */
export interface UserListParams extends PaginationParams {
  readonly username?: string
  readonly email?: string
  readonly status?: 'active' | 'inactive' | 'banned'
  readonly role?: 'admin' | 'user' | 'guest'
}

/**
 * 用户状态统计
 */
export interface UserStats {
  readonly total: number
  readonly active: number
  readonly inactive: number
  readonly banned: number
  readonly admin: number
  readonly user: number
  readonly guest: number
}
