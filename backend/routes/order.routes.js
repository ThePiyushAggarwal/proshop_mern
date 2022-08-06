const express = require('express')
const router = express.Router()
const { addOrder } = require('../controllers/order.controller')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, addOrder)

module.exports = router
