const express = require('express')
const router = express.Router()
const {
  addOrder,
  getOrderById,
  updateOrderToPaid,
} = require('../controllers/order.controller')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, addOrder)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)

module.exports = router
