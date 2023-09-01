const path = require('path');
/*
* webpack打包项目
* html-webpack-plugin生成产出html文件
* user-agent把浏览器的userAgent变成一个对象
* */
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js', // 入口文件
  context: process.cwd(), // 上下文目录
  mode: 'development', // 开发模式
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'monitor.js' // 文件名
  },
  devServer: {
    port: 8888,
    static: path.resolve(__dirname, 'dist'), // devServer静态文件目录
  },
  plugins: [
    new HtmlWebpackPlugin({ // 自动打包出html文件的
      template: './src/index.html',
      inject: 'head'
    })
  ]
}
