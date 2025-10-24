<template>
    <div class="login-container">
    <!-- 左侧品牌展示区 -->
    <div class="login-left">
      <div class="brand-section">
        <div class="logo">
          <div class="logo-icon">
            <Icon icon="mdi:hexagon-multiple" class="logo-svg" />
          </div>
          <h1 class="brand-title">SynapseUI</h1>
        </div>
        
        <div class="illustration">
          <div class="illustration-content">
            <div class="chart-icon">
              <Icon icon="mdi:chart-line" class="w-12 h-12" />
            </div>
            <div class="user-icon">
              <Icon icon="mdi:account-group" class="w-10 h-10" />
            </div>
            <div class="cloud-icon">
              <Icon icon="mdi:cloud" class="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div class="slogan">
          <h2 class="slogan-title">开箱即用的大型中后台管理系统</h2>
          <p class="slogan-subtitle">工程化、高性能、跨组件库的前端模版</p>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单区 -->
    <div class="login-right">
      <!-- 顶部工具栏 -->
      <div class="login-toolbar">
        <a-space>
          <a-button type="text" size="small" class="toolbar-btn">
            <Icon icon="mdi:earth" class="w-4 h-4" />
          </a-button>
          <a-button type="text" size="small" class="toolbar-btn">
            <Icon icon="mdi:monitor" class="w-4 h-4" />
          </a-button>
          <a-button type="text" size="small" class="toolbar-btn">
            <Icon icon="mdi:format-font" class="w-4 h-4" />
          </a-button>
          <a-button type="text" size="small" class="toolbar-btn" @click="toggleTheme">
            <Icon :icon="isDark ? 'mdi:sun' : 'mdi:moon'" class="w-4 h-4" />
          </a-button>
        </a-space>
      </div>

      <!-- 登录表单 -->
      <div class="login-form-container">
        <div class="login-header">
          <h1 class="login-title">欢迎回来 <span class="wave-emoji">👋</span></h1>
          <p class="login-subtitle">请输入您的帐户信息以开始管理您的项目</p>
        </div>

        <a-form
          :model="loginForm"
          :rules="loginRules"
          @finish="handleLogin"
          class="login-form"
        >
          <!-- 角色选择 -->
          <a-form-item name="role">
            <a-radio-group v-model:value="loginForm.role" class="role-selector">
              <a-radio-button value="admin">管理员</a-radio-button>
              <a-radio-button value="user">普通用户</a-radio-button>
              <a-radio-button value="guest">访客</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <!-- 用户名 -->
          <a-form-item name="username">
            <a-input
              v-model:value="loginForm.username"
              placeholder="用户名"
              size="large"
              class="form-input"
            >
              <template #prefix>
                <Icon icon="mdi:account" class="input-icon" />
              </template>
            </a-input>
          </a-form-item>

          <!-- 密码 -->
          <a-form-item name="password">
            <a-input-password
              v-model:value="loginForm.password"
              placeholder="密码"
              size="large"
              class="form-input"
            >
              <template #prefix>
                <Icon icon="mdi:lock" class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>

           <!-- 验证码 -->
           <a-form-item name="captcha">
             <div class="captcha-container">
               <SliderCaptcha ref="sliderCaptchaRef" />
             </div>
           </a-form-item>

          <!-- 记住账号和忘记密码 -->
          <div class="login-options">
            <div class="options-left">
              <a-checkbox v-model:checked="loginForm.remember" class="remember-checkbox">
                记住账号
              </a-checkbox>
            </div>
            <div class="options-right">
              <a-button type="link" size="small" class="forgot-link">忘记密码?</a-button>
            </div>
          </div>

          <!-- 登录按钮 -->
          <a-form-item class="login-button-item">
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              :loading="loading"
              class="login-button"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>

        <!-- 其他登录方式 -->
        <div class="other-login">
          <div class="login-methods">
            <a-button size="small" class="method-btn">手机号登录</a-button>
            <a-button size="small" class="method-btn">扫码登录</a-button>
          </div>
          
          <div class="social-login">
            <p class="social-title">其他登录方式</p>
            <div class="social-icons">
              <a-button shape="circle" size="small" class="social-btn wechat">
                <Icon icon="mdi:wechat" class="w-4 h-4" />
              </a-button>
              <a-button shape="circle" size="small" class="social-btn qq">
                <Icon icon="mdi:qqchat" class="w-4 h-4" />
              </a-button>
              <a-button shape="circle" size="small" class="social-btn github">
                <Icon icon="mdi:github" class="w-4 h-4" />
              </a-button>
              <a-button shape="circle" size="small" class="social-btn google">
                <Icon icon="mdi:google" class="w-4 h-4" />
              </a-button>
            </div>
          </div>
        </div>

        <!-- 注册链接 -->
        <div class="register-link">
          <a-button type="link" class="register-btn">还没有账号?创建账号</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { SliderCaptcha } from '@/core/components'
import { useAppStore } from '@/core/stores/app'
import type { LoginRequest } from '@/modules/user/types'

const appStore = useAppStore()
const loading = ref<boolean>(false)

// 滑块验证码相关
const sliderCaptchaRef = ref<InstanceType<typeof SliderCaptcha>>()

// 登录表单数据
const loginForm = ref<LoginRequest>({
  username: 'admin',
  password: '',
  remember: false,
  role: 'admin',
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
  captcha: [
    { 
      validator: (_rule: unknown, _value: unknown, callback: (error?: Error) => void) => {
        if (!sliderCaptchaRef.value?.captchaVerified) {
          callback(new Error('请完成滑块验证'))
        } else {
          callback()
        }
      }, 
      trigger: 'change' 
    },
  ],
}

// 主题切换
const isDark = ref<boolean>(false)
const toggleTheme = (): void => {
  isDark.value = !isDark.value
  appStore.setTheme(isDark.value ? 'dark' : 'light')
}

// 登录处理
const handleLogin = async (values: LoginRequest): Promise<void> => {
  loading.value = true
  try {
    // 检查滑块验证码
    if (!sliderCaptchaRef.value?.captchaVerified) {
      console.error('请完成滑块验证')
      return
    }
    
    // 这里调用登录 API
    console.log('登录数据:', values)
    // await userStore.login(values)
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.login-container {
  @apply min-h-screen flex bg-gray-50 dark:bg-gray-900;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.login-left {
  @apply flex-1 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-12 flex items-center justify-center relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
}

.brand-section {
  @apply text-center text-white relative z-10;
  max-width: 400px;
}

.logo {
  @apply flex items-center justify-center mb-12;
}

.logo-icon {
  @apply mr-4;
}

.logo-svg {
  @apply w-10 h-10 text-white;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.brand-title {
  @apply text-3xl font-light;
  letter-spacing: 0.5px;
  font-weight: 300;
}

.illustration {
  @apply mb-12;
}

.illustration-content {
  @apply flex flex-col items-center space-y-6;
  position: relative;
}

.chart-icon, .user-icon, .cloud-icon {
  @apply flex items-center justify-center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
}

.chart-icon {
  @apply w-20 h-20;
}

.user-icon {
  @apply w-16 h-16;
}

.cloud-icon {
  @apply w-12 h-12;
}

.slogan-title {
  @apply text-xl font-light mb-3;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 0.3px;
}

.slogan-subtitle {
  @apply text-blue-100 text-sm font-light;
  line-height: 1.5;
  font-weight: 300;
  opacity: 0.9;
}

.login-right {
  @apply flex-1 flex flex-col bg-white dark:bg-gray-800;
  min-height: 100vh;
}

.login-toolbar {
  @apply p-6 flex justify-end;
}

.toolbar-btn {
  @apply hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
}

.login-form-container {
  @apply flex-1 flex flex-col justify-center px-16 py-8 max-w-lg mx-auto w-full;
}

.login-header {
  @apply mb-10 text-center;
}

.login-title {
  @apply text-3xl font-light text-gray-800 dark:text-white mb-4;
  letter-spacing: 0.5px;
  font-weight: 300;
}

.wave-emoji {
  @apply text-2xl;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

.login-subtitle {
  @apply text-gray-500 dark:text-gray-400 text-sm font-light;
  line-height: 1.6;
  font-weight: 300;
}

.login-form {
  @apply space-y-6;
}

.role-selector {
  @apply w-full;
  
  :deep(.ant-radio-button-wrapper) {
    @apply flex-1 text-center border-gray-200 hover:border-blue-300 hover:text-blue-500;
    font-weight: 400;
  }
  
  :deep(.ant-radio-button-wrapper-checked) {
    @apply bg-blue-500 border-blue-500 text-white;
  }
}

.form-input {
  @apply h-12;
  
  :deep(.ant-input) {
    @apply border-gray-200 hover:border-blue-300 focus:border-blue-500;
    font-weight: 400;
  }
  
  :deep(.ant-input-prefix) {
    @apply text-gray-400;
  }
}

.input-icon {
  @apply w-4 h-4;
}

.captcha-container {
  @apply w-full flex justify-center;
}

.login-options {
  @apply flex justify-between items-center py-2;
}

.options-left {
  @apply flex items-center;
}

.options-right {
  @apply flex items-center;
}

.remember-checkbox {
  :deep(.ant-checkbox-wrapper) {
    @apply text-gray-600 dark:text-gray-300;
    font-weight: 400;
  }
}

.forgot-link {
  @apply text-blue-500 hover:text-blue-600 font-medium transition-colors;
}

.login-button-item {
  @apply mt-6;
}

.login-button {
  @apply w-full h-12 text-lg font-medium;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    transform: translateY(-1px);
  }
}

.other-login {
  @apply mt-8 space-y-6;
}

.login-methods {
  @apply flex space-x-4 justify-center;
}

.method-btn {
  @apply border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500 font-medium;
}

.social-login {
  @apply text-center;
}

.social-title {
  @apply text-sm text-gray-400 dark:text-gray-500 mb-4 font-light;
}

.social-icons {
  @apply flex justify-center space-x-3;
}

.social-btn {
  @apply border-gray-200 hover:border-gray-300 transition-all duration-300;
  
  &.wechat:hover {
    @apply border-green-400 text-green-500;
  }
  
  &.qq:hover {
    @apply border-blue-400 text-blue-500;
  }
  
  &.github:hover {
    @apply border-gray-600 text-gray-700;
  }
  
  &.google:hover {
    @apply border-red-400 text-red-500;
  }
}

.register-link {
  @apply text-center mt-8;
}

.register-btn {
  @apply text-gray-500 hover:text-blue-500 font-medium;
}

// 响应式设计
@media (max-width: 1024px) {
  .login-form-container {
    @apply px-12;
  }
}

@media (max-width: 768px) {
.login-container {
    @apply flex-col;
  }
  
  .login-left {
    @apply p-8 min-h-96;
  }
  
  .login-form-container {
    @apply px-8;
  }
  
  .brand-title {
    @apply text-2xl;
  }
  
  .slogan-title {
    @apply text-lg;
  }
}

@media (max-width: 480px) {
  .login-form-container {
    @apply px-6;
  }
  
  .login-toolbar {
    @apply p-4;
  }
}
</style>