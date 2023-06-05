function render(res, data, type="application/json;charset=utf-8") {
  res.writeHead(200, { "Content-Type": type })
  res.write(data)
  res.end()
}

const apiRouter = {
  "/api/login": (req, res) => {
    const myURL = new URL(req.url, 'http://127.0.0.1');
    if (
      myURL.searchParams.get("password") === '123456'
      && myURL.searchParams.get("username") === 'admin'
    ) {
      render(res, `{ "ok": 1 }`)
    } else {
      render(res, `{ "ok": 0 }`)
    }
  },
  "/api/loginpost": (req, res) => {
    let post = ''
    req.on("data", chunk => {
      post += chunk
    })
    req.on("end", () => {
      const params = JSON.parse(post)
      if (params.password === '123456' && params.username === 'admin') {
        render(res, `{ "ok": 1 }`)
      } else {
        render(res, `{ "ok": 0 }`)
      }
    })
  }
}

module.exports = apiRouter
