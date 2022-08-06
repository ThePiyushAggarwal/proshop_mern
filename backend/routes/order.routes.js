const express = require('express')
const router = express.Router()
const { addOrder, getOrderById } = require('../controllers/order.controller')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, addOrder)
router.get('/:id', protect, getOrderById)

module.exports = router
