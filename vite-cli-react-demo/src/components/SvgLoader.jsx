// NOTE: 本文件用于演示 vite 对 svg 资源文件的加载方式

// 方式一：导入本地 svg 的路径，装入 img 元素的 src 属性，以图片形式加载 svg 资源。但缺点是不能更改 svg 的颜色。
import svgMathUrl from "../assets/svgs/math.svg?url"
// 方式二：导入本地 svg 的源文件（以 string 的形式），直接将其作为 innerHTML 注入目标容器元素，此时在界面上该 svg 资源会以原本的 <svg> 元素形式渲染，优点是可以更改其颜色。
import svgMathRaw from "../assets/svgs/math.svg?raw"

console.log("==> svgMath", svgMathUrl, svgMathRaw)

export default function SvgLoader() {
  return (
    <>
      {/* 方式一： */}
      {/* <div style={{ color: "red" }}>
        <img src={svgMathUrl} />
      </div> */}

      {/* 方式二： */}
      <div style={{ color: "gray" }}>
        <div dangerouslySetInnerHTML={{ __html: svgMathRaw }}></div>
      </div>
    </>
  )
}
