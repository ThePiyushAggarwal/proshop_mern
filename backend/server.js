const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const products = require('./data/products')

app.get('/', (req, res) => {
  res.send('Welcome to ProShop API')
})

// All Products JSON
app.get('/api/products', (req, res) => {
  res.send(products)
})

// Single Product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.send(product)
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
