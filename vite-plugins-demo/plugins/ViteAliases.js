const fs = require("fs")
const path = require("path")

// vite 的插件必须返回给 vite 一个配置对象，即在 vite.config.js 中的 plugins 参数值为一个数组，数组项为对象，vite 会在生命周期特定的时间段遍历 plugins 数组，看看有没有需要被执行的插件，有则执行。
// TIPS: 插件运行在 node 端，推荐使用 CommonJS 规范

// 将读取到的目录数组中的文件夹名称和文件名称分离开
function diffDirAndFile(dirFilesArr = [], basePath = "") {
  const result = {
    dirs: [],
    files: [],
  }
  dirFilesArr.forEach(fileName => {
    const stat = fs.statSync(path.resolve(__dirname, basePath + "/" + fileName))
    if (stat.isDirectory()) {
      result.dirs.push(fileName)
    } else {
      result.files.push(fileName)
    }
  })
  return result
}
// 读取 /src 目录下的所有文件夹名称并转换成 vite 的 resolve.alias 能识别的格式
function getSrcDirAlias(prefix) {
  const result = fs.readdirSync(path.resolve(__dirname, "../src"))
  const diffResult = diffDirAndFile(result, "../src")
  const resolveAliasObj = {} // { @assets: xxx }
  diffResult.dirs.forEach(dirName => {
    resolveAliasObj[`${prefix}${dirName}`] = path.resolve(
      __dirname,
      "../src/" + dirName
    )
  })
  return resolveAliasObj
}

module.exports = ({ prefix = "@" } = {}) => ({
  /**
   * config 是 Vite 特有的钩子函数：在解析 Vite 配置前调用
   * @param {Object} config baseConfig vite.config.js 中的原始配置对象（此时 vite 只是把配置文件内容原封不动丢给我们，并没有开始执行它）
   * @param {Object} env: { command, mode }
   * @param {String} command: "build" | "serve"
   * @param {String} mode: "development" | "production"
   * @returns 一个将被深度合并到现有配置中的部分配置对象，或者直接改变配置（如果默认的合并不能达到预期的结果）
   */
  config: async (config, env) => {
    // console.log("==> MyViteAliases config", config, env)
    const resolveAliasObj = getSrcDirAlias(prefix)
    return {
      // 返回一个 resolve 出去，将 /src 目录下的所有文件夹进行别名控制
      resolve: { alias: resolveAliasObj },
    }
  },
})
