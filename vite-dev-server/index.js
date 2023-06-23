const Koa = require("koa")
const fs = require("fs")
const path = require("path")

// alias 配置
const viteConfig = require("./vite.config")
const aliasResolver = require("./aliasResolver")

const app = new Koa()

// 当请求来临时，会直接进入到 use 注册的回调函数中
app.use(async ctx => {
  console.log("==> ctx.request.url", ctx.request.url)
  if (ctx.request.url === "/") {
    const indexContent = await fs.promises.readFile(
      path.resolve(__dirname, "./index.html")
    )
    ctx.response.body = indexContent
    ctx.response.set("Content-Type", "text/html")
  }
  if (ctx.request.url.endsWith(".js")) {
    const jsContent = await fs.promises.readFile(
      path.resolve(__dirname, "." + ctx.request.url)
    )
    // 将 jsContent 中涉及到导入的语句进行检查，将其中的 @ alias 别名按照配置文件进行替换后返回
    const convertJsContent = aliasResolver(
      viteConfig.resolve.alias,
      jsContent.toString()
    )
    ctx.response.body = convertJsContent
    ctx.response.set("Content-Type", "text/javascript")
  }
})

app.listen(5173, () => {
  console.log("vite dev server listen on 5173")
})
