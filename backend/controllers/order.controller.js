const asyncHandler = require('express-async-handler')
const Order = require('../models/order.model')

// @desc Create new order
// @route POST /api/orders/
// @access Private
const addOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user._id })
  res.send(order)
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id).populate('user', 'name email')
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  res.json(order)
})

module.exports = { addOrder, getOrderById }
