const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  // Using different method for comparison because
  // I just couldn't fetch the password using "this.password"
  if (user && (await bcrypt.compare(password, user.password))) {
    const { _id, name, email, isAdmin } = user
    res.send({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

module.exports = { authUser }
