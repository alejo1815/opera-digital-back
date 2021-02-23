const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connect } = require('./src/db')

const app = express()
connect()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
