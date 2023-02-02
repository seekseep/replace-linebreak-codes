const fs = require('fs')
const path = require('path')
var glob = require("glob")

const { encoding, from, to } = require("./config")
const rootDir = path.resolve(__dirname, process.argv[2])
const pattern = `${rootDir}/**/*`

glob(pattern, {}, function (er, files) {
  let fileCount = 0
  for (const filePath of files) {
    if (fs.statSync(filePath).isDirectory()) continue
    const data = fs.readFileSync(filePath, { encoding })
    fs.writeFileSync(filePath, data.replace(from, to))
    console.log(`replaced ${filePath}`)
    fileCount += 1
  }
  console.log(`end to repalce ${fileCount} files`)
})
