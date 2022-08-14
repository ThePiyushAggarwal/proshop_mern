const Product = require('../models/product.model')
const asyncHandler = require('express-async-handler')

// @desc Fetch all products
// @route GET /api/products/
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {}
  const products = await Product.find(keyword)
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
  const newProduct = {
    ...req.body,
    user: req.user.id,
  }
  const createdProduct = await Product.create(newProduct)
  res.status(201).json(createdProduct)
})

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true }
  )
  if (!updatedProduct) {
    res.status(400)
    throw new Error('Product not found')
  }
  res.json(updatedProduct)
})

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  // Checking the input
  if (!rating || !comment) {
    res.status(400)
    throw new Error('Please add both Rating and Comment')
  }
  if (comment.length < 20) {
    res.status(400)
    throw new Error('Please add a comment with at least 20 characters.')
  }
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(400)
    throw new Error('Product not found')
  }
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  )
  if (alreadyReviewed) {
    res.status(400)
    throw new Error('Product already reviewed.')
  }
  const review = {
    name: req.user.name,
    rating,
    comment,
    user: req.user._id,
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        reviews: review,
      },
    },
    { new: true, runValidators: true }
  )
  if (!updatedProduct) {
    res.status(500)
    throw new Error('Something went wrong')
  }
  const numReviews = updatedProduct.reviews.length
  const averageRating =
    updatedProduct.reviews.reduce((acc, item) => acc + item.rating, 0) /
    updatedProduct.reviews.length
  const updatedProduct2 = await Product.findByIdAndUpdate(
    req.params.id,
    {
      numReviews,
      rating: averageRating,
    },
    { new: true, runValidators: true }
  )
  if (!updatedProduct2) {
    res.status(500)
    throw new Error('Something went wrong')
  }
  res.status(201)
  res.json({ message: 'Review added' })
})

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
