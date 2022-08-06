import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
    paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || '',
  },
  reducers: {
    addItem: (state, { payload }) => {
      const itemExists = state.cartItems.find((x) => x.id === payload.id)
      if (itemExists) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === payload.id ? payload : x
        )
      } else {
        state.cartItems = state.cartItems.concat(payload)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeItem: (state, { payload }) => {
      const itemExists = state.cartItems.find((x) => x.id === payload)
      if (itemExists) {
        state.cartItems = state.cartItems.filter((x) => x.id !== payload)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    addShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      )
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    },
  },
})

export const { addItem, removeItem, addShippingAddress, savePaymentMethod } =
  cartSlice.actions

export default cartSlice.reducer
