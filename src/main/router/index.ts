import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/core/types/component'

/**
 * 路由元信息
 */
export interface RouteMeta {
  readonly title: string
  readonly requiresAuth?: boolean
  readonly permissions?: string[]
  readonly icon?: string
  readonly hidden?: boolean
  readonly keepAlive?: boolean
}

/**
 * 扩展路由记录
 */
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  readonly meta?: RouteMeta
  readonly children?: AppRouteRecordRaw[]
}

/**
 * 基础路由
 */
const baseRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/views/Login.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/main/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/modules/views/Dashboard.vue'),
        meta: {
          title: '仪表盘',
          requiresAuth: true,
          icon: 'mdi:view-dashboard',
        },
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/modules/views/NotFound.vue'),
    meta: {
      title: '页面不存在',
      hidden: true,
    },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/modules/views/Forbidden.vue'),
    meta: {
      title: '无权限访问',
      hidden: true,
    },
  },
]

/**
 * 业务路由
 */
const businessRoutes: AppRouteRecordRaw[] = [
  {
    path: '/users',
    name: 'UserManagement',
    component: () => import('@/modules/views/UserManagement.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
      permissions: ['user:view'],
      icon: 'mdi:account-group',
    },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/modules/user/views/UserList.vue'),
        meta: {
          title: '用户列表',
          requiresAuth: true,
          permissions: ['user:view'],
        },
      },
      {
        path: 'detail/:id',
        name: 'UserDetail',
        component: () => import('@/modules/user/views/UserDetail.vue'),
        meta: {
          title: '用户详情',
          requiresAuth: true,
          permissions: ['user:view'],
        },
      },
    ],
  },
]

/**
 * 所有路由
 */
const routes: AppRouteRecordRaw[] = [
  ...baseRoutes,
  ...businessRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

/**
 * 创建路由实例
 */
export const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

/**
 * 将路由转换为菜单项
 */
export const routesToMenuItems = (routes: AppRouteRecordRaw[]): MenuItem[] => {
  return routes
    .filter(route => !route.meta?.hidden)
    .map(route => ({
      key: route.name as string,
      title: route.meta?.title || '',
      icon: route.meta?.icon,
      path: route.path,
      permissions: route.meta?.permissions,
      children: route.children ? routesToMenuItems(route.children) : undefined,
    }))
}

/**
 * 获取面包屑导航
 */
export const getBreadcrumbs = (route: AppRouteRecordRaw): MenuItem[] => {
  const breadcrumbs: MenuItem[] = []
  
  const addBreadcrumb = (r: AppRouteRecordRaw): void => {
    if (r.meta?.title) {
      breadcrumbs.unshift({
        key: r.name as string,
        title: r.meta.title,
        icon: r.meta.icon,
        path: r.path,
      })
    }
  }
  
  addBreadcrumb(route)
  
  return breadcrumbs
}

export default router
