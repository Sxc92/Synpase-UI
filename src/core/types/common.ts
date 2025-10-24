/**
 * API 响应基础类型
 */
export interface ApiResponse<T = unknown> {
  readonly code: number
  readonly message: string
  readonly data: T
  readonly timestamp: number
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  readonly page: number
  readonly pageSize: number
  readonly total?: number
  readonly sortBy?: string
  readonly sortOrder?: 'asc' | 'desc'
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T> extends ApiResponse<T[]> {
  readonly pagination: {
    readonly page: number
    readonly pageSize: number
    readonly total: number
    readonly totalPages: number
  }
}

/**
 * 通用响应类型
 */
export type ApiResult<T> = ApiResponse<T>

/**
 * 分页响应类型
 */
export type PaginatedResult<T> = PaginationResponse<T>

/**
 * 可选字段类型
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 必需字段类型
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * 深度只读类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}
