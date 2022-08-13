const express = require('express')
const router = express.Router()
const {
  addOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require('../controllers/order.controller')
const { protect, isAdmin } = require('../middleware/authMiddleware')

router.post('/', protect, addOrder)
router.get('/', protect, isAdmin, getOrders)
router.get('/myOrders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered)

module.exports = router
