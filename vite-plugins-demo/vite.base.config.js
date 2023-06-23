import { defineConfig } from "vite"
import { ViteAliases } from "vite-aliases"
import MyViteAliases from "./plugins/ViteAliases"
import { createHtmlPlugin } from "vite-plugin-html"
import MyCreateHtmlPlugin from "./plugins/CreateHtmlPlugin"
import { viteMockServe } from "vite-plugin-mock"
import MyViteMockServe from "./plugins/VitePluginMock"

// NOTE: vite 插件相关配置展示
/**
 * 插件git仓库地址：
 * 1. vite-aliases: https://github.com/Subwaytime/vite-aliases
 */
export default defineConfig({
  plugins: [
    // -- 目录别名插件
    // MyViteAliases(),
    ViteAliases(),
    // -- 动态更改 html 文件内容的插件
    // MyCreateHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: "首页",
    //     },
    //   },
    // }),
    createHtmlPlugin({
      inject: {
        data: {
          title: "首页",
        },
      },
    }),
    // -- 拦截浏览器请求，返回 mock 数据的插件
    // viteMockServe({}),
    MyViteMockServe({}),
  ],
})

// 这里展示一下常用的 vite plugins 钩子函数的使用
defineConfig({
  plugins: [
    {
      // -- vite 特有的钩子函数
      config: options => {
        console.log("==> config hook: ", options)
      },
      transformIndexHtml: html => {
        console.log("==> transformIndexHtml hook: ", html)
      },
      configureServer: server => {
        server.middlewares.use((req, res, next) => {})
      },
      configResolved: options => {
        // 在解析 Vite 配置后调用。使用这个钩子读取和存储最终解析的配置（包含了 vite.config.js 和 vite 内置配置项）。当插件需要根据运行的命令做一些不同的事情时，它也很有用。（比如 yarn dev --mode production 时）
        // WARNING: 此时最好不要再做其他更改配置的事情，仅用于读取和存储使用。
        console.log("==> configResolved", options)
      },
      configurePreviewServer: server => {
        // 与 configureServer 相同，但用于预览服务器。
        // 通过 npx vite preview，会在本地起一个预览服务器，将 dist 下的文件显示出来。（展示效果同 dist 下打开 Live Server 是一样的）
      },
      handleHotUpdate: () => {}, // 配置热更新行为
      // --- vite 与 rollup 通用的钩子函数（两者都会关注执行的钩子函数 --> 各自都会执行一次，共执行两次）
      /**
       * 提供 rollup 下的特有配置
       * @param {Object} rollupOptions 接收 vite.config.js 中的 build.rollupOptions 配置内容
       */
      options: rollupOptions => {
        console.log("==> rollup options", rollupOptions)
      },
      // ... 更多请查阅官方文档
    },
  ],
})
