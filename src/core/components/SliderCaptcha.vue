<template>
  <div class="slider-captcha">
    <div class="captcha-track" ref="captchaTrack">
      <div class="captcha-bg" :style="{ width: `${sliderProgress}%` }">
        <span v-if="sliderProgress > 0" class="captcha-text">请拖动滑块完成验证</span>
      </div>
      <div 
        class="captcha-slider" 
        :style="{ left: `${sliderPosition}px` }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <Icon icon="mdi:drag-horizontal" class="drag-icon" />
      </div>
    </div>
    <div class="captcha-status">
      <span v-if="!captchaVerified && !isDragging && sliderProgress === 0" class="status-text">
        请按住滑块拖动
      </span>
      <span v-else-if="!captchaVerified && !isDragging" class="status-text">
        请完成滑块验证
      </span>
      <span v-else-if="captchaVerified" class="success-text">
        <Icon icon="mdi:check-circle" class="success-icon" />
        验证成功
      </span>
      <span v-else class="dragging-text">
        拖动中...
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSliderCaptcha } from '@/core/composables'

// 使用滑块验证码组合式函数
const {
  captchaTrack,
  isDragging,
  captchaVerified,
  sliderPosition,
  sliderProgress,
  startDrag,
  resetCaptcha,
} = useSliderCaptcha()

// 暴露给父组件的方法和状态
defineExpose({
  captchaVerified,
  resetCaptcha,
})
</script>

<style scoped>
@reference 'tailwindcss';

.slider-captcha {
  @apply w-full;
}

.captcha-track {
  @apply relative w-full h-14 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden cursor-pointer;
}

.captcha-bg {
  @apply absolute inset-0 flex items-center justify-center;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  transition: width 0.3s ease;
}

.captcha-text {
  @apply text-white text-sm font-medium z-10 whitespace-nowrap;
}

.captcha-slider {
  @apply absolute top-0 w-10 h-14 bg-white border-2 border-blue-500 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center shadow-lg transition-all duration-200;
}

.captcha-slider:hover {
  @apply border-blue-600 shadow-xl;
}

.captcha-slider:active {
  @apply scale-105;
}

.drag-icon {
  @apply w-4 h-4 text-blue-500;
}

.captcha-status {
  @apply mt-3 text-center;
}

.status-text {
  @apply text-red-500 text-sm font-medium;
}

.success-text {
  @apply flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 text-sm font-medium;
}

.dragging-text {
  @apply text-blue-500 text-sm font-medium;
}

.success-icon {
  @apply w-4 h-4 text-green-500;
}
</style>
