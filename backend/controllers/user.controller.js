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

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = req.user
  res.send({ _id, name, email, isAdmin })
})

module.exports = { authUser, getUserProfile }
