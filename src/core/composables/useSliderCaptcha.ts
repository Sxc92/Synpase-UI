import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * 滑块验证码组合式函数
 * @returns 滑块验证码相关的状态和方法
 */
export function useSliderCaptcha() {
  // 状态
  const captchaTrack = ref<HTMLElement>()
  const isDragging = ref<boolean>(false)
  const captchaVerified = ref<boolean>(false)
  const sliderPosition = ref<number>(0)
  const trackWidth = ref<number>(0)
  const sliderWidth = ref<number>(40)

  // 计算属性
  const sliderProgress = computed((): number => {
    if (trackWidth.value === 0) return 0
    return Math.min((sliderPosition.value / (trackWidth.value - sliderWidth.value)) * 100, 100)
  })

  // 开始拖拽
  const startDrag = (e: MouseEvent | TouchEvent): void => {
    e.preventDefault()
    isDragging.value = true
    
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX
    const trackRect = captchaTrack.value?.getBoundingClientRect()
    
    if (trackRect) {
      const startX = clientX - trackRect.left
      const maxPosition = trackWidth.value - sliderWidth.value
      
      const handleMove = (moveEvent: MouseEvent | TouchEvent): void => {
        const moveClientX = 'touches' in moveEvent ? moveEvent.touches[0]?.clientX || 0 : moveEvent.clientX
        const newPosition = moveClientX - trackRect!.left - startX
        
        sliderPosition.value = Math.max(0, Math.min(newPosition, maxPosition))
        
        // 检查是否到达终点
        if (sliderPosition.value >= maxPosition - 5) {
          captchaVerified.value = true
          isDragging.value = false
          removeEventListeners()
        }
      }
      
      const handleEnd = (): void => {
        isDragging.value = false
        removeEventListeners()
        
        // 如果没有到达终点，重置位置
        if (!captchaVerified.value) {
          sliderPosition.value = 0
        }
      }
      
      const removeEventListeners = (): void => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchmove', handleMove)
        document.removeEventListener('touchend', handleEnd)
      }
      
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleEnd)
    }
  }

  // 重置验证码
  const resetCaptcha = (): void => {
    captchaVerified.value = false
    sliderPosition.value = 0
    isDragging.value = false
  }

  // 初始化
  const initCaptcha = (): void => {
    if (captchaTrack.value) {
      trackWidth.value = captchaTrack.value.offsetWidth
    }
  }

  // 清理事件监听器
  const cleanup = (): void => {
    document.removeEventListener('mousemove', () => {})
    document.removeEventListener('mouseup', () => {})
    document.removeEventListener('touchmove', () => {})
    document.removeEventListener('touchend', () => {})
  }

  // 生命周期
  onMounted(() => {
    initCaptcha()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    // 状态
    captchaTrack,
    isDragging,
    captchaVerified,
    sliderPosition,
    trackWidth,
    sliderWidth,
    sliderProgress,
    
    // 方法
    startDrag,
    resetCaptcha,
    initCaptcha,
    cleanup,
  }
}
