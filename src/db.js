const mongoose = require('mongoose')

function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  mongoose.connection.once('open', () => {
    console.log('Database is ready')
  })

  mongoose.connection.on('error', (err) => {
    console.log('Something wrong with the Database', err)
  })

  return mongoose.connection
}

module.exports = { connect }
