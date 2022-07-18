require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

app.use(cors({ origin: 'http://localhost:3000' }))

connectDB()

app.get('/', (req, res) => {
  res.send('Welcome to ProShop API')
})

app.use('/api/products', require('./routes/product.routes'))

// Error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`)
)
