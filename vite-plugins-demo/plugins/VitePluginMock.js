const fs = require("fs")

// NOTE: 手撕 vite-plugin-mock。注意本插件用于拦截客户端浏览器发起的 http 请求，故采用 esmodule 规范来写更好。

// 找到相关 mock 配置文件内容并返回
function getMockConfigFile() {
  // 1. 找项目目录下的 mock 相关数据配置文件（默认都是放在根目录下）
  const mockState = fs.statSync("mock") // 可以不用采用 path.resolve，因为我们确认 mock 相关配置文件一定在根目录下
  console.log(mockState)
  // 2. 读取对应配置文件内容（此处默认是 /mock/index.js 的结构）,返回内容
  const isDir = mockState.isDirectory()
  if (isDir) {
    // 如果是 mock 目录，则找其下面的 index.js 文件
    // 关于 require：这里使用 require 是用来导入文件的具体内容。采用 fs 读取文件的话，拿到的是字符串，并不符合我们的需求
    // 关于 process.cwd() 来完成 path 拼接：我们作为第三方插件的开发者，并不知道使用者的具体项目目录结构，所以这里不是采用 __dirname 来拼接绝对路径，而应该采用使用者 yarn dev 的目录来完成拼接。
    const mockConfigFile = require(process.cwd() + "/mock/index.js")
    console.log(mockConfigFile) // 此处拿到的是我们在 /mock/index.js 导出的对象
    return mockConfigFile
  }
}

export default options => {
  return {
    /**
     * 说明：是 Vite 中用于配置开发服务器的钩子。默认在 vite 内置中间件安装执行前执行，如果想要在 Vite 的内置中间件执行完毕后再执行，那么可以将 configureServer 的内容作为新函数返回，eg:
     * configureServer: server => {
     *  return () => {
     *    server.middlewares.use((req, res, next) => {})
     *  }
     * }
     * @param {Object} server vite 本地服务器的相关配置信息
     */
    configureServer: server => {
      /**
       * req: 客户端浏览器发起的请求对象，包含：请求头、请求体、cookie 等相关信息
       * res: 准备返回给客户端浏览器的响应对象，包含：响应头、响应体等相关信息
       * next：函数，决定是否将结果交给下一个中间件（调用 next() 则交给下一个中间件，若不想继续执行后续中间件，则无需调用 next 方法）
       */
      server.middlewares.use((req, res, next) => {
        // 自定义请求处理，这里我们模拟实现一下 vite-plugin-mock 的核心功能：启动服务器的时候自动在项目根目录下找 /mock 文件夹下的 index.js（或是根目录下的 mock.js 文件），将其中配置好的与 req.url 匹配到的数据通过 res.end 返回给客户端浏览器
        // 注意，上文中如果没有找到相匹配的请求数据，需要调用 next 方法，将流程继续执行下去，否则浏览器会一直处于加载状态（既没有调用 res.end 又没有调用 next，相当于流程一直卡在这里了）
        const mockConfigFile = getMockConfigFile()
        const mathItem = mockConfigFile.find(item => item.url === req.url)
        if (mathItem) {
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify(mathItem.response(req)))
        } else {
          next()
        }
      })
    },
  }
}
