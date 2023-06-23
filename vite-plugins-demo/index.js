import "@components/imgLoader.js"

// 测试 vite-plugin-mock 的请求拦截
fetch("/api/users", {
  method: "post",
})``
  .then(data => console.log(data))
  .catch(error => console.log(error))
