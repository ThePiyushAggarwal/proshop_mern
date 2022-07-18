require('dotenv').config()
const mongoose = require('mongoose')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/user.model')
const Product = require('./models/product.model')
const Order = require('./models/order.model')
const connectDB = require('./config/db')

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    // Finding the admin user and assigning him the products data
    const adminUser = createdUsers.find((user) => user.isAdmin)._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
