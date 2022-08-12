const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
} = require('../controllers/product.controller')
const { protect, isAdmin } = require('../middleware/authMiddleware')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.delete('/:id', protect, isAdmin, deleteProduct)

module.exports = router
