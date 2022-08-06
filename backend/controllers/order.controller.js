const asyncHandler = require('express-async-handler')
const Order = require('../models/order.model')

// @desc Create new order
// @route POST /api/orders/
// @access Private
const addOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user._id })
  res.send(order)
})

module.exports = { addOrder }
