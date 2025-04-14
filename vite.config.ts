import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',        // mock 文件夹路径
        localEnabled: isDev,     // 开发环境启用
        prodEnabled: false,      // 生产环境关闭 mock，如需开启设为 true
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
        watchFiles: true,
      }),
    ],
    server: {
      port: 5173, // 可选，设置 dev 服务端口
    },
  }
})
