declare module 'vue3-slider-verify' {
  import { DefineComponent } from 'vue'

  export interface SliderVerifyProps {
    /** 验证码宽度 */
    width?: number
    /** 验证码高度 */
    height?: number
    /** 滑块大小 */
    sliderSize?: number
    /** 验证精度 */
    accuracy?: number
    /** 是否显示提示 */
    showTips?: boolean
    /** 提示文字 */
    tips?: string
    /** 是否显示刷新按钮 */
    showRefresh?: boolean
    /** 自定义样式类名 */
    class?: string
    /** 自定义样式 */
    style?: Record<string, any>
  }

  export interface SliderVerifyEmits {
    /** 验证成功事件 */
    success: (data: { x: number; y: number }) => void
    /** 验证失败事件 */
    fail: () => void
    /** 刷新验证码事件 */
    refresh: () => void
  }

  export interface SliderVerifyMethods {
    /** 刷新验证码 */
    refresh(): void
    /** 重置验证码 */
    reset(): void
  }

  const SliderVerify: DefineComponent<SliderVerifyProps, {}, {}, {}, SliderVerifyMethods, {}, {}, SliderVerifyEmits>

  export default SliderVerify
}
