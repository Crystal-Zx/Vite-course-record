# Vite 中使用 TS
首先，Vite 是直接支持 typescript 语法的。比如我们把入口文件 index.js 直接改为 index.ts ，并在其内部使用 ts 语法，Vite 是可以认识的不需要任何额外的配置。
## Vite 仅进行 .ts 文件的转译工作
Vite 仅执行 .ts 文件的**转译**工作，并不执行 任何类型检查。并假定类型检查已经被你的 IDE 或构建过程处理了。
> Vite 之所以不把类型检查作为转换过程的一部分，是因为这两项工作在本质上是不同的。转译可以在每个文件的基础上进行，与 Vite 的按需编译模式完全吻合。相比之下，类型检查需要了解整个模块图。把类型检查塞进 Vite 的转换管道，将不可避免地损害 Vite 的速度优势。

那么我们如何将 .ts 文件中检查出来的问题醒目的输出出来呢？
+ 开发环境中：
  1. 通过安装 [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker) 来将错误直接打印到页面，直接阻止界面正常显示。
  ```shell
  yarn add vite-plugin-checker typescript -D
  ```
  **【注意】** 这个插件依赖于 typescript，所以我们还需额外安装一下 typescript
  
  2. 在一个单独的进程中运行 tsc --noEmit --watch

+ 构建过程中：在 vite 的构建命令前加上 tsc --noEmit 即可（此时当 .ts 有检出的错误没有被解决时，会阻止打包生成 dist 目录）
  ```json
  build: "tsc --noEmit && vite build"  // package.json 中
  ```

> Vite 中使用 typescript 需要在根目录下新建 tsconfig.js 文件，用于 Vite 读取 ts 相关的配置（没有任何配置的情况下，可以写一个空对象）。

## .ts 文件中使用 vite 的环境变量
> import.meta 是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的 URL。 —— MDN

首先 ts 的转译会默认将 ts 语法转成比较低的 es 语法（es3），而 import.meta 属于 ES2020 的语法，所以需要在 tsconfig.js 中配置 `compilerOptions.module` 属性为 `"ESNext"`。

之后我们就可以在 .ts 文件中使用 `import.meta.` 了。但需要注意，此时使用 `import.meta.env` 还是会有错误的波浪线提示，因为我们需要在根目录下（或是 /src下）做一个 vite 环境变量的类型声明（详见本项目的 `[vite-]env.d.ts（vite- 可加可不加）`，这个文件的命名是约定俗成的，不要更改，Vite 会在启动时自动找寻这个文件，并将其声明记录下来）。
> 三斜线语法是 ts 的内容，详见 ts 的相关文档说明。