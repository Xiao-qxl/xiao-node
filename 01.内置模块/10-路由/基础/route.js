const fs = require("fs");

/*
function route(pathname, res) {
  switch (pathname) {
    case '/login':
      res.writeHead(200, {"Content-Type": "text/html;charset=utf8"})
      res.write(fs.readFileSync("./static/login.html", "utf-8"))
      break;
    case '/home':
      res.writeHead(200, {"Content-Type": "text/html;charset=utf8"})
      res.write(fs.readFileSync("./static/home.html", "utf-8"))
      break;
    default:
      res.writeHead(404, {"Content-Type": "text/html;charset=utf8"})
      res.write(fs.readFileSync("./static/404.html", "utf-8"))
  }
}
*/
const route = {
  "/login": (res) => render(res, "./static/login.html"),
  "/home": (res) => render(res, "./static/home.html"),
  "/404": (res) => {
    res.writeHead(404, {"Content-Type": "text/html;charset=utf8"})
    res.write(fs.readFileSync("./static/404.html", "utf-8"))
  },
  "/favicon.ico": (res) => render(res, "./static/favicon.png", "image/png"),
}

function render(res, path, contentType = "text/html;charset=utf8") {
  res.writeHead(200, {"Content-Type": contentType})
  res.write(fs.readFileSync(path, "utf-8"))
}

module.exports = route
