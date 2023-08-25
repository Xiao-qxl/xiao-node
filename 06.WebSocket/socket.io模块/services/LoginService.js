const db = require('../db')

const LoginService = {
  postLogin: (username, password) => {
    return db.query(`
        select id, username, nickname
            from users 
            where username=? and password=?
    `,
      [username, password])
  }
}

module.exports = LoginService
