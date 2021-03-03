const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.route('/create/:userId').post(articleController.create)
router.route('/show/:articleId').get(articleController.show)

module.exports = router
