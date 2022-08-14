require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

app.use(cors({ origin: 'http://localhost:3000' }))

connectDB()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', require('./routes/product.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/orders', require('./routes/order.routes'))
app.use('/api/uploads', require('./routes/upload.routes'))

app.get('/api/config/paypal', (_req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')))

// Deploying to heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'frontend', 'build')))
  app.get('*', (_req, res) =>
    res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (_req, res) => {
    res.send('Welcome to ProShop API')
  })
}

// Error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`)
)
