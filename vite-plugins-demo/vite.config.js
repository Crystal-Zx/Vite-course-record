import { defineConfig, loadEnv } from "vite"
import viteBaseConfig from "./vite.base.config"
import viteDevConfig from "./vite.dev.config"
import viteProdConfig from "./vite.prod.config"

// 策略模式
const envResolver = {
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }), // 这里使用函数形式是为了方便以后进行扩展（传参、打印）
  serve: () => Object.assign({}, viteBaseConfig, viteDevConfig),
}

export default defineConfig(({ command, mode }) => {
  // <--- 配置环境变量
  // 1. mode: 是 vite 根据启动命令中的 --mode 参数值传递过来的（yarn dev 默认是 --mode development; yarn build 是 production）
  // 2. loadEnv: vite 提供的修改环境变量的目录配置的补偿措施。loadEnv 会根据当前mode找到对应.env.[mode]文件，并将其内容覆盖到默认环境变量配置的文件.env中
  const env = loadEnv(mode, process.cwd(), "") // process.cwd() 方法返回 node 下当前进程的目录
  console.log("==> env", env.ENV_APP_KEY) // 在 node 服务端下读取对应环境变量
  // 配置环境变量 --->

  return envResolver[command]()
  // if (command === "build") {
  //   // 生产环境
  // } else {
  //   // 开发环境（command === 'serve'）
  // }
})
