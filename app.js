const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')
const { notFound } = require('./middlewares/notFound')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})