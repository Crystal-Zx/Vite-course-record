import "@/test.js" // NOTE: alias 路径处理的测试

/**
 * NOTE: 关于 path.resolve()
 * 1. 首先，在 node 执行时如果发现我们使用的是相对路径，那么就会自动调用 process.cwd() 作为前缀路径，最终拼接成绝对路径来获取对应文件
 * 2. process.cwd(): 返回当前 node 的执行目录
 */

const fs = require("fs")
const path = require("path") // path 本质上是一个字符串处理模块，内置了许多路径字符串处理方法，同时也可以帮助我们自动处理各浏览器路径格式的兼容问题

// WARNING: 此时这种相对路径的写法，在终端处于当前根目录（vite-dev-server/.）时能够正确读取到相关文件，但是在 cd ../ 后再次执行 node vite-dev-server/main.js 则会报错，提示 Error: ENOENT: no such file or directory, open './variable.css'
// const content = fs.readFileSync("./variable.css")

/**
 * NOTE: CommonJS 规范会给模块注入几个变量，如:
 * 1. __dirname：返回当前模块文件解析过后所在的文件夹(目录)的绝对路径
 * 2. __filename: 返回当前模块文件被解析过后的绝对路径
 * 此时在 vite-demo 目录下执行 node vite-dev-server/main.js 则能正常打印 variable.css 内容
 */
// const content = fs.readFileSync(__dirname + "/variable.css")

/**
 * path 库可以处理很多兼容问题
 * path.resolve 就是在拼接路径字符串
 */
const content = fs.readFileSync(path.resolve(__dirname, "./variable.css"))

console.log("==> content", content.toString())

/**
 * NOTE: 为什么在 CommonJS 规范的文件中可以直接使用 __dirname 而不用导入？
 * 每一个 CommonJS 规范的 JS 文件都会被视为一个模块，这个模块的代码会被放在一个立即执行的函数中执行，且函数有传入的实参：
 * 可通过 console.log(arguments) 打印出来看看
 * (function (exports, require, module, __filename, __dirname))()
 *
 * TIPS: exports = module.export = {}
 */
console.log(arguments)
