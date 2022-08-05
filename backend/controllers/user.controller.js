const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const generateToken = require('../utils/generateToken')

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user
    res.send({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Checking if user is already registered
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Creating new
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    const { _id, name, email, isAdmin } = user
    res.status(201)
    res.send({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = req.user
  res.send({ _id, name, email, isAdmin })
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user
  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  if (req.body.password) {
    user.password = req.body.password
  }

  try {
    const updatedUser = await user.save()
    if (updatedUser) {
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    }
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Email already exists')
    }
  }
})

module.exports = { authUser, registerUser, getUserProfile, updateUserProfile }
