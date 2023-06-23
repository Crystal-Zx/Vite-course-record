// 关于 less 的编译器 lessc：
// 1. 将 less 语法转换为浏览器能够识别的 css 代码
// 2. 按照相关配置将类名进行 hash 化，使得其成为项目中的唯一值，解决命名冲突
// 3. 将 .less 文件内容全部抹除，替换为前两步执行完生成的内容
// 4. 收集原始 类名 与对应 hash 类名的映射，作为 .less 文件的默认导出内容
// TIPS：在终端中可以通过 npx lessc componentA.module.less 来获得 less 文件的编译结果
import componentACss from "./componentA.module.less" // css 文件配置测试

console.log(componentACss)

const wrapper = document.createElement("div")
wrapper.className = componentACss.wrapper

const main = document.createElement("div")
main.className = componentACss.main

wrapper.appendChild(main)

document.body.appendChild(wrapper)
