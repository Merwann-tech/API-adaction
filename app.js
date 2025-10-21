const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const routes = require('./routes')
const { notFound } = require('./middlewares/notFound')
const cors = require("cors");
app.use(cors());

app.use('/', routes)
app.use(notFound)


app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})