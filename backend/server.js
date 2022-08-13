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

app.get('/', (req, res) => {
  res.send('Welcome to ProShop API')
})

app.use('/api/products', require('./routes/product.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/orders', require('./routes/order.routes'))
app.use('/api/uploads', require('./routes/upload.routes'))

app.get('/api/config/paypal', (_req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')))

// Error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`)
)
