import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { addItem } from '../features/cart/cartSlice'
import { getProductById } from '../features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'

function Cart() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const qty = searchParams.get('qty')
  const product = useSelector((state) => state.product.product)
  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    if (product._id === id) {
      dispatch(
        addItem({
          id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty,
        })
      )
    } else {
      dispatch(getProductById(id))
    }
  }, [dispatch, id, qty, product])

  return <div>Cart</div>
}
export default Cart
