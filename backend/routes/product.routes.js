const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require('../controllers/product.controller')
const { protect, isAdmin } = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

module.exports = router
