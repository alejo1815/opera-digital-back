const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connect } = require('./src/db')
const userRoute = require('./src/routes/user')
const articleRoute = require('./src/routes/article')

const app = express()
connect()

app.use(express.json())
app.use(cors())
app.use('/users', userRoute)
app.use('/articles', articleRoute)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
