const Product = require('../models/product.model')
const asyncHandler = require('express-async-handler')

// @desc Fetch all products
// @route GET /api/products/
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.send(product)
})

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)
  if (!deletedProduct) {
    res.status(400)
    throw new Error('Product not found')
  }
  res.json({ message: 'Product removed' })
})

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await Product.create(product)
  res.status(201).json(createdProduct)
})

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  )
  if (!updatedProduct) {
    res.status(400)
    throw new Error('Product not found')
  }
  res.json(updatedProduct)
})

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
