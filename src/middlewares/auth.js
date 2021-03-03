const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    if (!authorization || !token) {
      throw new Error('Session Invalid')
    }

    const { id } = jwt.verify(token, process.env.SECRET)

    req.user = id

    next()
  } catch {
    res
      .status(400)
      .json({ message: 'Something failed with the Authentication Middleware' })
  }
}
