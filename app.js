const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const { notFound } = require('./middlewares/notFound')


app.use('/', routes)
app.use(notFound)


app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})