import { defineConfig } from "vite"
import checker from "vite-plugin-checker"

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
  ],
  build: {
    minify: false, // 控制打包后的代码是否进行压缩
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // id 是当前资源文件的路径
          // console.log("==> id", id)
          if(id.includes("node_modules")) {  // node_modules 下的代码进行分包。此时重新打包时这部分源码会被放入到 dist/assets/vendor-[hash].js 文件中，当业务代码发生变化时，这个 hash 依旧不会发生变化，进而不会触发重新请求，直接从缓存中读取使用。
            return "vendor"
          }
        },
      },
    },
  },
})
