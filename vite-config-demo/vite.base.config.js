// vite.base.config.js 文件会经过 vite 处理，最终都会被转换成 CommonJS 规范，所以本文档编写时可以采用 esmodule 规范也可以采用 CommonJS 规范，亦或是两者同时使用均可
import { defineConfig } from "vite"
// path 的导入可以采用 esmodule 规范也可以采用 CommonJS 规范
import path from "path"
// const path = require("path")
const postcssPresetEnv = require("postcss-preset-env") // postcss 的预设环境，详情见 text-postcss/postcss.config.js

// 此处本身可以直接导出一个「单纯」JS对象即可。但 vite 的配置项比较复杂，所以采用内置的 defineConfig 包含该导出配置对象，这样，在对应配置处会有对应的语法提示（VS Code需要的额外处理，WebStorm则是默认提供的，不用采取这个方式）
export default defineConfig({
  optimizeDeps: {
    exclude: [], // 数组中的依赖不进行依赖预构建（依赖预构建：打包时读取收集依赖中的所有外在依赖，将其依赖代码段直接拼接到当前依赖文件中，形成一个完整无外在引用的文件，供客户端浏览器加载。）不进行预构建的话，浏览器端加载某一个内置又其他依赖的依赖包时，会将其内部依赖包全部通过网络形式加载，会加大浏览器的网络开销。而预构建是发生在node端，采用的是文件读取并替换相关代码段，效率和开销都会比客户端好很多。
  },
  envPrefix: "ENV_", // 配置 vite 注入客户端环境变量校验的 env 前缀（默认是 VITE_）
  css: {
    // 对 css 行为进行配置。modules 的所有配置最终会丢给 postcss modules
    modules: {
      // 对 css 模块化的默认行为进行覆盖
      localsConvention: "camelCase", // 修改生成的配置对象的 key 的展示形式（驼峰还是中横线形式）
      scopeBehaviour: "local", // 配置当前模块化行为是模块化还是全局化（配置对象 key 带有 hash 就是开启了模块化）
      // generateScopedName: "[name]_[local]_[hash:5]", // 修改生成的配置对象 key 的规则，可以是字符串也可以是函数（配置参数见：https://github.com/webpack/loader-utils#inerpolatename）
      hashPrefix: "hello", // hash 会根据给到的类名去生成；同时可以通过配置 prefix 来使 hash 更加独特，它会参与 hash 的生成
      globalModulePaths: ["./css-config-demo/index1.module.less"], // 不想参与 css modules 模块化的文件的路径
    },
    preprocessorOptions: {
      // 处理预处理器的配置，采取 key + config 形式（其中 key 是采用的预处理器的名称，如 less/sass 等）
      less: {
        // 整个的配置对象最终都会被传到 less 的执行参数（全局参数）中去 <== 在 less 文档中去找对应的配置参数
        math: "always", // 配置 less 中所有数学表达式进行计算，如 padding: 100px / 2; ==> padding: 50px;
        globalVars: {
          // less 的全局变量
          mainColor: "brown", // 在此处配置完成后，可以直接在各处 less 文件中直接使用
        },
      },
    },
    devSourcemap: true, // 开启css文件依赖索引（能够在出错时或控制台提示出该代码所属的源文件具体位置，控制台network查看less文件可看到文件内容中有 sourceMappingURL后面带了一个 base64 ，这个 base64 的内容就是对应源文件的代码内容被转换后的字符串)
    postcss: {
      // postcss 的配置，提供两种方式：1. 在本文件中配置； 2.在根目录创建 postcss.config.js，vite 会自动读取这个配置文件并注入到 vite 的这个配置项里
      plugins: [
        postcssPresetEnv({
          // importFrom: path.resolve(__dirname, "./css-config/variable.css"),
        }),
      ], // 插槽集合
    },
  },
  resolve: {
    // 配置静态资源加载
    alias: {
      // 配置别名
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    // 配置打包行为（vite 在生产环境的部分打包工作交由 rollup 库来处理的）
    rollupOptions: {
      // 配置 rollup 的一些构建策略
      output: {
        // 控制输出
        assetFileNames: "[hash].[name].[ext]", // 在 rollup 里面 hash 代表根据文件名和文件内容进行 hash 计算生成的字符串； ext 表示当前文件的后缀类别
      },
    },
    assetsInlineLimit: 4096, // 4kb，配置图片大小转换为base64的最大值，即：图片小于 4kb 时会被转成 base64 格式，大于 4kb 时会被转成图片文件
    outDir: "dist", // 控制打包后的打包文件夹名称
    assetsDir: "static", // 控制打包后的文件夹中静态资源目录的文件夹名称
    emptyOutDir: true, // 每次打包开始前先清除原有打包目录（dist）下的所有文件，默认值为 true
  },
})
