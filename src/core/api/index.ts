import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/core/types/common'

/**
 * HTTP 请求方法
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  readonly showLoading?: boolean
  readonly showError?: boolean
}

/**
 * API 客户端类
 */
class ApiClient {
  private instance: AxiosInstance

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加认证 token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 添加请求时间戳
        config.headers['X-Request-Time'] = Date.now().toString()

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { data } = response

        // 检查业务状态码
        if (data.code !== 200) {
          throw new Error(data.message || '请求失败')
        }

        return response
      },
      (error) => {
        // 处理 HTTP 错误
        if (error.response) {
          const { status, data } = error.response

          switch (status) {
            case 401:
              // 未授权，清除 token 并跳转到登录页
              localStorage.removeItem('token')
              window.location.href = '/login'
              break
            case 403:
              throw new Error('没有权限访问')
            case 404:
              throw new Error('请求的资源不存在')
            case 500:
              throw new Error('服务器内部错误')
            default:
              throw new Error(data?.message || '请求失败')
          }
        } else if (error.request) {
          throw new Error('网络连接失败')
        } else {
          throw new Error(error.message || '请求失败')
        }
      }
    )
  }

  /**
   * 发送请求
   */
  private async request<T = unknown>(config: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.request<ApiResponse<T>>(config)
    return response.data
  }

  /**
   * GET 请求
   */
  async get<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  /**
   * POST 请求
   */
  async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  /**
   * PUT 请求
   */
  async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  /**
   * DELETE 请求
   */
  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }

  /**
   * PATCH 请求
   */
  async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }
}

// 创建默认 API 客户端实例
export const request = new ApiClient()

// 导出 API 客户端类
export { ApiClient }
