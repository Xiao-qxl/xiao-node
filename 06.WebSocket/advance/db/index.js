const mysql = require('mysql2');
const { mySqlConfig } = require('../config/db.config')

const pool = mysql.createPool(mySqlConfig);

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (error, result) => {
          connection.release(); // 释放连接
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

module.exports = {
  query
}
