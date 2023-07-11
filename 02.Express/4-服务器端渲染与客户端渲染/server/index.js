const express = require('express')

const app = express()

app.use(express.static("web"))
app.get('/', (req, res) => {
  res.redirect('/home.html');
})

const HomeRouter = require('./router/homeRouter')
app.use('/home', HomeRouter)

app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
