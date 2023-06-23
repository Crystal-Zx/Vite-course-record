module.exports = options => {
  return {
    // NOTE: 转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文。
    transformIndexHtml: {
      enforce: "pre", // 将当前插件的执行时间提前至 html 文件被转换之前（即 Alias 之后，vite 的核心插件执行之前）
      transform: (html, ctx) => {
        // 没有加入属性 enforce 之前， transformIndexHtml 直接返回这里的 transform 函数体，但我们会发现当 index.html 文件中有报错时（比如使用了 ejs 语法），下面一行的打印语句不会输出。因为，默认情况下，本插件会在 vite 的核心插件执行完毕后执行，而核心插件解析发现了 index.html 中有不认识的 ejs 语法，直接报错，就不会再继续往后执行我们的这一个插件了。
        console.log(html, ctx)
        // <%= title  %> 是 ejs 语法
        // 这里之所以将数据 title 放到 inject 下这么深的层级，是按照 vite-plugin-html 的规则来复刻的
        return html.replace(/<%= title  %>/g, options.inject.data.title)
      },
    },
  }
}
