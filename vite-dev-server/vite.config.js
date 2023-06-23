const path = require("path")

// NOTE: 这里说明一下为什么要使用 CommonJS 规范： vite 会将所有的规范处理成 CommonJS 规范，我们为了和 vite 保持同步，这里就直接采用 CommonJS 规范
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}
