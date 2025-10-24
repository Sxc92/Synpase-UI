# SynapseUI

一个基于 Vue 3 + TypeScript + Vite 构建的现代化企业级前端应用框架。

## ✨ 特性

- 🚀 **Vue 3** - 使用最新的 Vue 3 Composition API
- 📘 **TypeScript** - 完整的类型安全和智能提示
- ⚡ **Vite 6** - 极速的开发体验和构建性能
- 🎨 **现代化 UI** - Ant Design Vue + Tailwind CSS + Shadcn UI + Vxe Table
- 🔧 **自动导入** - Vue API、组件、图标等全自动导入
- 📱 **响应式设计** - 移动端优先的响应式布局
- 🎯 **模块化架构** - 核心包与业务包分离设计
- 🔐 **状态管理** - Pinia 状态管理 + Vue Router 路由
- 🎨 **主题系统** - 支持明暗主题切换
- 📊 **数据可视化** - 集成 Vxe Table 高性能表格组件

## 🛠️ 技术栈

### 核心框架
- **Vue 3.5+** - 渐进式 JavaScript 框架
- **TypeScript 5.9+** - JavaScript 的超集
- **Vite 6** - 下一代前端构建工具

### UI 框架
- **Ant Design Vue 4.x** - 企业级 UI 组件库
- **Tailwind CSS 4.x** - 实用优先的 CSS 框架
- **Shadcn UI** - 现代化组件库
- **Vxe Table 4.x** - 高性能表格组件
- **Iconify** - 统一的图标库

### 开发工具
- **Pinia** - Vue 状态管理
- **Vue Router 4** - Vue 官方路由
- **Axios** - HTTP 客户端
- **SCSS** - CSS 预处理器
- **ESLint + Prettier** - 代码质量工具

### 自动导入
- **unplugin-auto-import** - Vue API 自动导入
- **unplugin-vue-components** - 组件自动导入
- **unplugin-icons** - 图标按需导入

## 📁 项目结构

```
src/
├── core/                    # 核心包 - 通用功能
│   ├── components/         # 核心组件
│   ├── composables/        # 核心组合式函数
│   ├── utils/             # 核心工具函数
│   ├── types/             # 核心类型定义
│   ├── constants/         # 核心常量
│   ├── stores/            # 核心状态管理
│   └── api/               # 核心 API
├── modules/                # 业务模块
│   ├── user/              # 用户模块
│   └── views/             # 业务页面
├── main/                   # 应用入口
│   ├── layouts/           # 布局组件
│   └── router/            # 路由配置
├── shared/                 # 共享资源
│   ├── assets/            # 静态资源
│   ├── styles/            # 样式文件
│   └── locales/           # 国际化文件
└── App.vue                # 应用根组件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 或
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 🎯 核心功能

### 自动导入

项目配置了完整的自动导入功能，无需手动导入常用 API：

```vue
<script setup lang="ts">
// ✅ 这些都不需要手动导入
const count = ref(0)
const doubled = computed(() => count.value * 2)
const router = useRouter()
const userStore = useUserStore()

const showMessage = () => {
  message.success('操作成功！')
}
</script>

<template>
  <!-- ✅ 组件和图标自动导入 -->
  <a-button type="primary" @click="showMessage">按钮</a-button>
  <Icon icon="mdi:home" class="w-6 h-6" />
</template>
```

### 组件使用

```vue
<template>
  <!-- Ant Design Vue 组件 -->
  <a-button type="primary">主要按钮</a-button>
  <a-input v-model:value="inputValue" placeholder="请输入" />
  
  <!-- 自定义组件 -->
  <SliderCaptcha />
  
  <!-- 图标 -->
  <Icon icon="mdi:home" class="w-6 h-6 text-blue-500" />
</template>
```

### 样式系统

```vue
<template>
  <!-- Tailwind CSS 工具类 -->
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800">标题</h2>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      按钮
    </button>
  </div>
</template>

<style scoped lang="scss">
@reference 'tailwindcss';

.custom-class {
  @apply p-4 bg-gray-100 rounded-lg;
}
</style>
```

## 📚 开发指南

### 创建新组件

```vue
<template>
  <div class="component-name">
    <h3>{{ title }}</h3>
    <a-button @click="handleClick">点击</a-button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: [value: string]
}>()

const handleClick = () => {
  emit('click', 'new value')
}
</script>

<style scoped lang="scss">
@reference 'tailwindcss';

.component-name {
  @apply p-4 bg-white rounded-lg;
}
</style>
```

### 创建新 Store

```typescript
// src/core/stores/exampleStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExampleStore = defineStore('example', () => {
  const data = ref<string[]>([])
  const loading = ref(false)
  
  const dataCount = computed(() => data.value.length)
  
  const fetchData = async () => {
    loading.value = true
    try {
      // API 调用
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    dataCount,
    fetchData,
  }
})
```

### 创建新 API

```typescript
// src/core/api/exampleApi.ts
import { request } from '@/core/api'

export const exampleApi = {
  getList: () => request.get('/examples'),
  create: (data: any) => request.post('/examples', data),
  update: (id: string, data: any) => request.put(`/examples/${id}`, data),
  delete: (id: string) => request.delete(`/examples/${id}`),
}
```

## 🎨 主题定制

项目支持明暗主题切换：

```typescript
// 在组件中使用主题
const appStore = useAppStore()

// 切换主题
appStore.toggleTheme()

// 获取当前主题
const isDark = computed(() => appStore.isDark)
```

## 📖 文档

- [自动导入和按需导入指南](./AUTO_IMPORT_GUIDE.md) - 详细的自动导入使用说明
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Ant Design Vue 文档](https://antdv.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)

## 🔧 开发工具

### VS Code 推荐插件

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- SCSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer

### 代码规范

项目使用 ESLint + Prettier 进行代码格式化：

```bash
# 检查代码规范
pnpm lint

# 自动修复代码规范问题
pnpm lint:fix
```

## 🚀 部署

### 构建优化

项目已配置生产环境优化：

- Tree Shaking - 移除未使用的代码
- 代码分割 - 按路由分割代码
- 资源压缩 - CSS、JS、图片压缩
- 缓存优化 - 静态资源缓存策略

### 部署命令

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Ant Design Vue](https://antdv.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

---

**SynapseUI** - 让前端开发更简单、更高效！ 🚀