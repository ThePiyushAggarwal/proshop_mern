import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
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
  },
})

export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
