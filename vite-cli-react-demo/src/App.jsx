import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"

/**
 * NOTE: Tree-Shaking 摇树优化
 * 打包工具会自动移除没有用到的变量或者方法
 * 对于下面一行引入语句： json 文件数据的导入来讲，如果采取 import json from './test.json' 那么 tree-shaking 时打包工具就不敢擅自删除掉该json文件中的数据，而是全盘打包到打包文件，会增大打包体积，降低性能。而如果采用下面的导入方式，tree-shaking 阶段打包工具就能识别出了 name 字段外，其他的没有用上，就不会将其余没用到的部分打包进去。
 * 再举个例子： lodash 库在使用时，不要使用 import _ from 'lodash' 而应该使用 import { deepClone } from 'lodash'
 *  */
import { name } from "./assets/jsons/test.json" // JSON 文件可以解构导入，利于性能优化（Tree-Shaking）↑↑↑
import SvgLoader from "./components/SvgLoader"

function App() {
  const [count, setCount] = useState(0)
  console.log(name)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* SVG 资源加载 */}
      <SvgLoader />
    </>
  )
}

export default App
