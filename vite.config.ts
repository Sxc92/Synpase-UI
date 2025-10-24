import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Vue Composition API 自动导入
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'ant-design-vue': [
            'message',
            'notification',
            'Modal',
          ],
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
        // Ant Design Vue 按需导入
        AntDesignVueResolver({
          importStyle: false, // 关闭自动导入样式，手动导入
        }),
        // Iconify 图标按需导入
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
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/core': resolve(__dirname, 'src/core'),
      '@/modules': resolve(__dirname, 'src/modules'),
      '@/shared': resolve(__dirname, 'src/shared'),
      '@/main': resolve(__dirname, 'src/main'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/styles/variables.scss" as *;`,
      },
    },
  },
})
