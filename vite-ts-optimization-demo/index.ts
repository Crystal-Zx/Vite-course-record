// console.log("==> vite-ts-demo index.js")
// let str: string = "123"

// str = 321

// console.log("==> str", str)
// console.log(str.charCodeAt())

// 测试环境变量
// console.log(import.meta.env.VITE_PROXY_TARGET)

// 性能优化：
import { forEach } from 'lodash'

const arr = []
forEach(arr, elm => {
  console.log("123",elm)
  console.log("456",elm)
})