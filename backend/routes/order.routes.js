const express= require('express')
const router express.Router()
const {addOrder} = require('../controllers/order.controller')
const protect = require('../middleware/authMiddleware')

route.post('/', protect, addOrder  )

module.exports = router