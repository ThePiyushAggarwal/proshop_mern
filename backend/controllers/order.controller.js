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

// @desc Get logged in user's order
// @route GET /api/orders/myOrders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  if (!orders.length) {
    res.status(404)
    throw new Error('No Orders were found')
  }
  res.json(orders)
})

// @desc Update order to be paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const {
    id,
    status,
    update_time,
    payer: { email_address },
  } = req.body
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id,
        status,
        update_time,
        email_address,
      },
    },
    { new: true, runValidators: true }
  )
  if (!updatedOrder) {
    res.status(500)
    throw new Error('Something went wrong!')
  }
  res.json(updatedOrder)
})

// @desc Get all order
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  if (!orders.length) {
    res.status(404)
    throw new Error('No Orders were found')
  }
  res.json(orders)
})

// @desc Update order to be delivered
// @route PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  // If not already paid, we want to update to paid in COD
  if (!order.isPaid) {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentMethod: 'COD',
        isPaid: true,
        paidAt: Date.now(),
        isDelivered: true,
        deliveredAt: Date.now(),
      },
      { new: true, runValidators: true }
    )
    if (!updatedOrder) {
      res.status(500)
      throw new Error('Something went wrong!')
    }
    return res.json(updatedOrder)
  }
  // If order already paid
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isDelivered: true,
      deliveredAt: Date.now(),
    },
    { new: true, runValidators: true }
  )
  if (!updatedOrder) {
    res.status(500)
    throw new Error('Something went wrong!')
  }
  res.json(updatedOrder)
})

module.exports = {
  addOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
}
