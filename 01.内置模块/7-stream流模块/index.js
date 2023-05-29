const fs = require("fs")

/* 可读流 */
const rs = fs.createReadStream("./1.txt", "utf-8")
rs.on("data", chunk => {
  console.log('chunk-', chunk)
})

rs.on("end", () => {
  console.log("end")
})

rs.on("error", (err) => {
  console.log(err)
})

/* 可写流 */
const ws = fs.createWriteStream("./1.txt", {
  flags: "a",
  encoding: "utf-8"
})
ws.write("77777777\n")
ws.write("88888888\n")
ws.write("99999999\n")

ws.end()

/* 管道 */
const readStream = fs.createReadStream('./1.txt')
const writeStream = fs.createWriteStream('./2.txt')

readStream.pipe(writeStream)
