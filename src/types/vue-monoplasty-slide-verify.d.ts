declare module 'vue-monoplasty-slide-verify' {
  import { DefineComponent } from 'vue'

  export interface SlideVerifyProps {
    /** 滑块宽度 */
    l?: number
    /** 滑块高度 */
    r?: number
    /** 验证码图片宽度 */
    w?: number
    /** 验证码图片高度 */
    h?: number
    /** 验证码图片数组 */
    imgs?: string[]
    /** 是否显示刷新按钮 */
    showRefresh?: boolean
    /** 是否显示文字提示 */
    showTips?: boolean
    /** 自定义文字提示 */
    tips?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 验证精度 */
    accuracy?: number
    /** 自定义样式类名 */
    class?: string
    /** 自定义样式 */
    style?: Record<string, any>
  }

  export interface SlideVerifyEmits {
    /** 验证成功事件 */
    success: (data: { x: number; y: number }) => void
    /** 验证失败事件 */
    fail: () => void
    /** 刷新验证码事件 */
    refresh: () => void
    /** 开始拖拽事件 */
    start: () => void
    /** 拖拽中事件 */
    move: (data: { x: number; y: number }) => void
    /** 结束拖拽事件 */
    end: () => void
  }

  export interface SlideVerifyMethods {
    /** 刷新验证码 */
    refresh(): void
    /** 重置验证码 */
    reset(): void
    /** 获取当前状态 */
    getStatus(): 'ready' | 'success' | 'fail'
  }

  const SlideVerify: DefineComponent<SlideVerifyProps, {}, {}, {}, SlideVerifyMethods, {}, {}, SlideVerifyEmits>

  export default SlideVerify
}
