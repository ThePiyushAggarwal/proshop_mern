import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/users/userSlice'
import orderReducer from '../features/orders/orderSlice'
import adminReducer from '../features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    admin: adminReducer,
  },
})
