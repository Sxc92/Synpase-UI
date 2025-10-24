# 自动导入和按需导入配置指南

## 功能概述

项目已配置完整的自动导入和按需导入功能，包括：

- ✅ Vue 3 Composition API 自动导入
- ✅ Vue 组件自动导入
- ✅ Ant Design Vue 按需导入
- ✅ Iconify 图标按需导入
- ✅ Vue Router 自动导入
- ✅ Pinia 状态管理自动导入
- ✅ 自定义工具函数自动导入

## 自动导入功能

### 1. Vue Composition API 自动导入

无需手动导入 Vue 的 Composition API：

```vue
<script setup lang="ts">
// ❌ 不再需要手动导入
// import { ref, computed, watch, onMounted } from 'vue'

// ✅ 直接使用，自动导入
const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (newVal) => {
  console.log('Count changed:', newVal)
})

onMounted(() => {
  console.log('Component mounted')
})
</script>
```

**自动导入的 Vue API：**
- `ref`, `reactive`, `computed`, `watch`, `watchEffect`
- `onMounted`, `onUnmounted`, `onUpdated`, `onBeforeMount`
- `nextTick`, `defineComponent`, `defineAsyncComponent`
- `provide`, `inject`, `getCurrentInstance`
- 等等...

### 2. Vue Router 自动导入

```vue
<script setup lang="ts">
// ❌ 不再需要手动导入
// import { useRouter, useRoute } from 'vue-router'

// ✅ 直接使用
const router = useRouter()
const route = useRoute()

const goToHome = () => {
  router.push('/')
}
</script>
```

### 3. Pinia 状态管理自动导入

```vue
<script setup lang="ts">
// ❌ 不再需要手动导入
// import { useUserStore } from '@/core/stores/app'

// ✅ 直接使用
const userStore = useUserStore()
const appStore = useAppStore()
</script>
```

### 4. Ant Design Vue 自动导入

```vue
<template>
  <!-- ❌ 不再需要手动导入组件 -->
  <!-- import { Button, Input, message } from 'ant-design-vue' -->
  
  <!-- ✅ 直接使用组件 -->
  <a-button type="primary" @click="handleClick">
    点击按钮
  </a-button>
  
  <a-input v-model:value="inputValue" placeholder="请输入" />
</template>

<script setup lang="ts">
// ✅ 直接使用 API
const handleClick = () => {
  message.success('操作成功！')
  notification.info({
    message: '通知',
    description: '这是一个通知消息'
  })
}
</script>
```

### 5. 图标按需导入

```vue
<template>
  <!-- ❌ 不再需要手动导入 -->
  <!-- import { Icon } from '@iconify/vue' -->
  
  <!-- ✅ 直接使用，自动按需导入 -->
  <Icon icon="mdi:home" class="w-6 h-6" />
  <Icon icon="heroicons:user" class="w-5 h-5" />
  <Icon icon="ant-design:heart-filled" class="w-4 h-4" />
</template>
```

### 6. 自定义工具函数自动导入

```vue
<script setup lang="ts">
// ❌ 不再需要手动导入
// import { cn, debounce, deepClone } from '@/core/utils'

// ✅ 直接使用
const className = cn('base-class', 'additional-class')
const debouncedFunction = debounce(() => {
  console.log('Debounced function called')
}, 300)

const clonedData = deepClone(originalData)
</script>
```

## 组件自动导入

### 1. 核心组件自动导入

```vue
<template>
  <!-- ❌ 不再需要手动导入 -->
  <!-- import { SliderCaptcha } from '@/core/components' -->
  
  <!-- ✅ 直接使用组件 -->
  <SliderCaptcha />
  <AutoImportTest />
</template>
```

### 2. 业务组件自动导入

```vue
<template>
  <!-- ✅ 业务模块组件也会自动导入 -->
  <UserList />
  <UserDetail />
  <Dashboard />
</template>
```

## 配置说明

### 1. Vite 配置 (`vite.config.ts`)

```typescript
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    // Vue Composition API 自动导入
    AutoImport({
      imports: [
        'vue',
        'vue-router', 
        'pinia',
        {
          'ant-design-vue': ['message', 'notification', 'Modal'],
        },
      ],
      dts: true, // 生成类型声明文件
      dirs: [
        'src/core/composables',
        'src/core/utils',
        'src/core/stores',
      ],
      vueTemplate: true,
    }),
    
    // Vue 组件自动导入
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // 关闭自动导入样式
        }),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: true, // 生成类型声明文件
      dirs: [
        'src/core/components',
        'src/modules',
      ],
    }),
    
    // Iconify 图标按需导入
    Icons({
      autoInstall: true,
    }),
  ],
})
```

### 2. TypeScript 配置 (`tsconfig.app.json`)

```json
{
  "compilerOptions": {
    "types": [
      "vite/client", 
      "./auto-imports.d.ts", 
      "./components.d.ts"
    ]
  }
}
```

## 类型支持

自动导入功能完全支持 TypeScript 类型检查：

- ✅ 自动生成 `auto-imports.d.ts` 文件
- ✅ 自动生成 `components.d.ts` 文件
- ✅ 完整的类型提示和检查
- ✅ IDE 智能提示支持

## 性能优化

### 1. 按需导入优势

- 🚀 **减少包体积**：只导入使用的组件和 API
- 🚀 **提升构建速度**：减少不必要的依赖分析
- 🚀 **优化运行时性能**：减少初始加载时间

### 2. 自动导入优势

- 📝 **减少样板代码**：无需手动导入常用 API
- 🔧 **提升开发效率**：专注于业务逻辑
- 🛡️ **类型安全**：完整的 TypeScript 支持

## 最佳实践

### 1. 组件命名规范

- 核心组件：`src/core/components/` 目录下的组件会自动导入
- 业务组件：`src/modules/` 目录下的组件会自动导入
- 组件文件名使用 PascalCase：`UserProfile.vue`

### 2. 工具函数规范

- 在 `src/core/utils/` 目录下的函数会自动导入
- 使用具名导出：`export const functionName = () => {}`
- 避免默认导出

### 3. 图标使用规范

- 使用 Iconify 图标集：`mdi:`, `heroicons:`, `ant-design:` 等
- 图标组件前缀：`<Icon icon="icon-name" />`
- 图标会自动按需下载和缓存

## 故障排除

### 1. 类型错误

如果遇到类型错误，请确保：
- `auto-imports.d.ts` 和 `components.d.ts` 文件存在
- TypeScript 配置中包含了这些类型文件
- 重启 TypeScript 服务

### 2. 组件未找到

如果组件未自动导入：
- 检查组件是否在配置的目录中
- 确认组件文件名使用 PascalCase
- 重启开发服务器

### 3. 图标不显示

如果图标不显示：
- 检查图标名称是否正确
- 确认图标集是否可用
- 查看控制台是否有错误信息

### 4. Tailwind CSS @apply 错误

如果遇到 `Cannot apply unknown utility class` 错误：

**问题原因：**
Tailwind CSS 4.x 在 SCSS 文件中使用 `@apply` 指令时需要添加 `@reference` 指令。

**解决方案：**
在 SCSS 文件的 `<style>` 标签后添加 `@reference` 指令：

```scss
<style scoped lang="scss">
@reference 'tailwindcss';

.your-class {
  @apply p-4 bg-white rounded-lg;
}
</style>
```

**注意事项：**
- 每个使用 `@apply` 的 SCSS 文件都需要添加 `@reference` 指令
- `@reference` 指令必须在 `<style>` 标签后的第一行
- 这个指令告诉 Tailwind CSS 在编译时包含所有工具类

## 示例代码

查看 `src/core/components/AutoImportTest.vue` 文件，了解完整的使用示例。
