// import _ from "lodash"
import "./request" // 客户端读取环境变量
import "./css-config/componentA"

// console.log("lodash", _)

import estarProPicUrl from "@assets/image/estarPro.jpeg"

const img = document.createElement("img")
img.src = estarProPicUrl
document.body.appendChild(img)
