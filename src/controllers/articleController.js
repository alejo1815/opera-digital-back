const Article = require('../models/articleModel')
const User = require('../models/userModel')

module.exports = {
  async create(req, res) {
    try {
      const { userId } = req.params

      const user = await User.findById(userId)

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const article = await Article.create({ ...req.body, author: user })

      console.log(article)

      user.articles.push(article)
      await user.save({ validateBeforeSave: false })

      res.status(201).json({ message: 'New Article created' })
    } catch {
      res.status(400).json('Something wrong creating a new post')
    }
  },
  async show(req, res) {
    try {
      const { articleId } = req.params

      const article = await Article.findById(articleId)

      console.log(article)

      res.status(200).json(article)
    } catch {
      res.send(404).json({ message: 'page not found' })
    }
  },
}
