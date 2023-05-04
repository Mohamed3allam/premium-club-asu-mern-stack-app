const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')
const { signupUser, loginUser } = require('../controllers/userAuthController')

router.post('/login', loginUser)
router.post('/signup',requireAuth, grantAccess('createAny', 'user'), signupUser)

module.exports = router