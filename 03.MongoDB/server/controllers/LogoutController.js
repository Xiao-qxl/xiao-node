const logoutController = {
  logout: (req, res) => {
    req.session.destroy(() => {
      res.send({ ok: 1 })
    })
  }
}

module.exports = logoutController
