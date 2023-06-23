const mockJS = require("mockjs")

const userList = mockJS.mock({
  "data|10": [
    {
      name: "@cname",
      "id|+1": 1,
    },
  ],
})

module.exports = [
  {
    method: "post",
    url: "/api/users",
    response: ({ body }) => ({
      // response 方法接收的是一个 req 对象
      code: 200,
      msg: "success",
      data: userList,
    }),
  },
]
