const fs = require("fs");
const path = require("path");
const mime = require("mime")

const route = {
  "/": (req, res) => render(res, "./static/login.html"),
  "/login": (req, res) => render(res, "./static/login.html"),
  "/home": (req, res) => render(res, "./static/home.html"),
  "/404": (req, res) => {
    if (readStatic(req, res)) {
      // 目前静态资源有：网站logo
    } else {
      res.writeHead(404, {"Content-Type": "text/html;charset=utf8"})
      res.write(fs.readFileSync("./static/404.html", "utf-8"))
      res.end()
    }
  }
}

// 静态资源管理
function readStatic(req, res) {
  // 获取路径
  const myURL = new URL(req.url, "http://127.0.0.1:3000")
  const absolutePath = path.join(__dirname, '/static', myURL.pathname)
  if (myURL.pathname === '/') return false
  if (fs.existsSync(absolutePath)) {
    render(res, absolutePath, mime.getType(path.extname(absolutePath).split('.')[1]))
    return true
  }
  return false
}

function render(res, path, contentType = "text/html;charset=utf8") {
  res.writeHead(200, {"Content-Type": contentType})
  res.write(fs.readFileSync(path, "utf-8"))
  res.end()
}

module.exports = route
