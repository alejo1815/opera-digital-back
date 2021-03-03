const router = require('express').Router()
const userController = require('../controllers/userController')
const { auth } = require('../middlewares/auth')

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/:id').get(auth, userController.show)

module.exports = router
