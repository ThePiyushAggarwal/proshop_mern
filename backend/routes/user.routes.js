const express = require('express')
const router = express.Router()
const { authUser } = require('../controllers/user.controller')

router.post('/login', authUser)

module.exports = router
