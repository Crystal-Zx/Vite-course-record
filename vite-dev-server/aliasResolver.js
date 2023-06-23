module.exports = function (aliasConf, jsContent) {
  const entries = Object.entries(aliasConf)
  console.log("==> entries", entries)
  let convertJsContent = jsContent
  entries.forEach(([alias, path]) => {
    convertJsContent = convertJsContent.replace(alias, path)
  })
  convertJsContent = convertJsContent.replace(__dirname, "")
  return convertJsContent
}
