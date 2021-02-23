const mongoose = require('mongoose')

function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once('open', () => {
    console.log('Database is ready')
  })

  mongoose.connection.on('error', () => {
    console.log('Something wrong with the Database')
  })

  return mongoose.connection
}

module.exports = { connect }
