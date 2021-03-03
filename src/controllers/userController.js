const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body
      const encPassword = await bcrypt.hash(password, 8)

      const user = await User.create({ name, email, password: encPassword })

      const payload = {
        id: user._id,
        email: user.email,
      }

      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      })

      res.status(201).json({ message: 'User succesfully created', token })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  async login(req, res) {
    try {
      const { password, email } = req.body

      const user = await User.findOne({ email })
      const isValid = await bcrypt.compare(password, user.password)

      const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      })

      if (user && isValid) {
        res.status(200).json({ message: 'Welcome Back', token })
      } else {
        res.status(400).json({ message: 'Login Error' })
      }
    } catch {
      res.status(400).json({ message: 'Something is broken in Login' })
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params

      const user = await User.findById(id)

      const users = await User.find()
        .limit(Number(5))
        .select('-password -createdAt -updatedAt -__v')

      res.status(200).json(users)

      console.log(user)
    } catch {
      res.status(500).json('oooops')
    }
  },
}
