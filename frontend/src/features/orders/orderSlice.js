import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderDetails, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.post('/api/orders', orderDetails, config)
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getOrderDetails = createAsyncThunk(
  'orders/getOrderDetails',
  async (orderId, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.get(`/api/orders/${orderId}`, config)
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: {},
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.loading = false
        state.order = payload
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
        state.loading = false
        state.order = payload
      })
      .addCase(getOrderDetails.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export default orderSlice.reducer
