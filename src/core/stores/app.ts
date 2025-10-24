import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuItem } from '@/core/types/component'

/**
 * 应用状态管理
 */
export const useAppStore = defineStore('app', () => {
  // 状态
  const sidebarCollapsed = ref(false)
  const theme = ref<'light' | 'dark' | 'auto'>('light')
  const language = ref<'zh-CN' | 'en-US'>('zh-CN')
  const loading = ref(false)
  const pageTitle = ref('SynapseUI')
  const breadcrumbs = ref<MenuItem[]>([])

  // 计算属性
  const isDark = computed(() => {
    if (theme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === 'dark'
  })

  const isLight = computed(() => !isDark.value)

  const currentLanguage = computed(() => language.value)

  const isSidebarCollapsed = computed(() => sidebarCollapsed.value)

  const isLoading = computed(() => loading.value)

  const currentPageTitle = computed(() => pageTitle.value)

  const currentBreadcrumbs = computed(() => breadcrumbs.value)

  // 方法
  /**
   * 切换侧边栏折叠状态
   */
  const toggleSidebar = (): void => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed.value))
  }

  /**
   * 设置侧边栏折叠状态
   */
  const setSidebarCollapsed = (collapsed: boolean): void => {
    sidebarCollapsed.value = collapsed
    localStorage.setItem('sidebarCollapsed', String(collapsed))
  }

  /**
   * 切换主题
   */
  const toggleTheme = (): void => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    updateTheme()
  }

  /**
   * 设置主题
   */
  const setTheme = (newTheme: 'light' | 'dark' | 'auto'): void => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    updateTheme()
  }

  /**
   * 更新主题
   */
  const updateTheme = (): void => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  /**
   * 切换语言
   */
  const toggleLanguage = (): void => {
    language.value = language.value === 'zh-CN' ? 'en-US' : 'zh-CN'
    localStorage.setItem('language', language.value)
  }

  /**
   * 设置语言
   */
  const setLanguage = (newLanguage: 'zh-CN' | 'en-US'): void => {
    language.value = newLanguage
    localStorage.setItem('language', newLanguage)
  }

  /**
   * 设置加载状态
   */
  const setLoading = (loadingState: boolean): void => {
    loading.value = loadingState
  }

  /**
   * 设置页面标题
   */
  const setPageTitle = (title: string): void => {
    pageTitle.value = title
    document.title = `${title} - SynapseUI`
  }

  /**
   * 设置面包屑导航
   */
  const setBreadcrumbs = (items: MenuItem[]): void => {
    breadcrumbs.value = items
  }

  /**
   * 初始化应用状态
   */
  const initializeApp = (): void => {
    // 从本地存储恢复状态
    const savedSidebarCollapsed = localStorage.getItem('sidebarCollapsed')
    if (savedSidebarCollapsed) {
      sidebarCollapsed.value = savedSidebarCollapsed === 'true'
    }

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto'
    if (savedTheme) {
      theme.value = savedTheme
    }

    const savedLanguage = localStorage.getItem('language') as 'zh-CN' | 'en-US'
    if (savedLanguage) {
      language.value = savedLanguage
    }

    // 应用主题
    updateTheme()
  }

  /**
   * 重置应用状态
   */
  const resetApp = (): void => {
    sidebarCollapsed.value = false
    theme.value = 'light'
    language.value = 'zh-CN'
    loading.value = false
    pageTitle.value = 'SynapseUI'
    breadcrumbs.value = []
    
    // 清除本地存储
    localStorage.removeItem('sidebarCollapsed')
    localStorage.removeItem('theme')
    localStorage.removeItem('language')
    
    // 应用主题
    updateTheme()
  }

  return {
    // 状态
    sidebarCollapsed,
    theme,
    language,
    loading,
    pageTitle,
    breadcrumbs,
    
    // 计算属性
    isDark,
    isLight,
    currentLanguage,
    isSidebarCollapsed,
    isLoading,
    currentPageTitle,
    currentBreadcrumbs,
    
    // 方法
    toggleSidebar,
    setSidebarCollapsed,
    toggleTheme,
    setTheme,
    updateTheme,
    toggleLanguage,
    setLanguage,
    setLoading,
    setPageTitle,
    setBreadcrumbs,
    initializeApp,
    resetApp,
  }
})
