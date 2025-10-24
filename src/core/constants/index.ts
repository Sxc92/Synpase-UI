/**
 * API 相关常量
 */
export const API_CONSTANTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
} as const

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed',
} as const

/**
 * 路由相关常量
 */
export const ROUTE_CONSTANTS = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  HOME: '/',
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
} as const

/**
 * 权限相关常量
 */
export const PERMISSION_CONSTANTS = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

/**
 * 主题相关常量
 */
export const THEME_CONSTANTS = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

/**
 * 语言相关常量
 */
export const LANGUAGE_CONSTANTS = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
} as const

/**
 * 分页相关常量
 */
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const

/**
 * 文件上传相关常量
 */
export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  UPLOAD_URL: '/api/upload',
} as const

/**
 * 日期时间格式常量
 */
export const DATE_FORMAT_CONSTANTS = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
} as const

/**
 * 正则表达式常量
 */
export const REGEX_CONSTANTS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
} as const
