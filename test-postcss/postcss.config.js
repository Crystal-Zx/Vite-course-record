// postcss 是一个用 JavaScript 工具和插件转换 CSS 代码的工具
// postcss 的配置文件，在终端执行 npx postcss 时会自动读取本配置文件内容影响转换结果

// postcss 的预设环境（需要先yarn add安装该依赖包），包含了一些 postcss 必要的插槽，如语法降级、基础编译。
// TIPS: 在vite项目中使用时，不需要在单独安装 postcss 及 postcss-cli
const postcssPresetEnv = require("postcss-preset-env")

module.exports = {
  plugins: [postcssPresetEnv(/** pluginOptions */)],
}
