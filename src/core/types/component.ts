import type { VNode } from 'vue'

/**
 * 组件基础 Props
 */
export interface BaseComponentProps {
  readonly className?: string
  readonly style?: Readonly<Record<string, string | number>>
  readonly id?: string
}

/**
 * 表单组件 Props
 */
export interface FormComponentProps extends BaseComponentProps {
  readonly disabled?: boolean
  readonly readonly?: boolean
  readonly required?: boolean
  readonly placeholder?: string
}

/**
 * 按钮组件 Props
 */
export interface ButtonProps extends BaseComponentProps {
  readonly type?: 'button' | 'submit' | 'reset'
  readonly variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  readonly size?: 'sm' | 'md' | 'lg'
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly icon?: VNode
}

/**
 * 表格列定义
 */
export interface TableColumn<T = unknown> {
  readonly key: string
  readonly title: string
  readonly dataIndex: keyof T
  readonly width?: number
  readonly align?: 'left' | 'center' | 'right'
  readonly sortable?: boolean
  readonly filterable?: boolean
  readonly render?: (value: unknown, record: T, index: number) => VNode
}

/**
 * 菜单项类型
 */
export interface MenuItem {
  readonly key: string
  readonly title: string
  readonly icon?: string
  readonly path?: string
  readonly children?: MenuItem[]
  readonly permissions?: string[]
}

/**
 * 面包屑类型
 */
export interface BreadcrumbItem {
  readonly title: string
  readonly path?: string
  readonly icon?: string
}
