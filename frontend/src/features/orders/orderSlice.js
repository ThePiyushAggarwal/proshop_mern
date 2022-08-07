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
      return data._id
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

export const orderPay = createAsyncThunk(
  'orders/orderPay',
  async (orderId, paymentResult, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/orders/${orderId}/`,
        paymentResult,
        config
      )
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

const initialState = {
  order: {},
  orderId: '',
  orderPaySuccess: false,
  error: '',
  loading: true,
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderId: (state) => {
      state.orderId = ''
    },
    resetOrderState: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = ''
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.orderId = payload
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.error = payload
      })
      //
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
      //
      .addCase(orderPay.pending, (state) => {
        state.loading = true
        state.orderPaySuccess = false
      })
      .addCase(orderPay.fulfilled, (state, { payload }) => {
        state.orderPaySuccess = true
        state.loading = false
      })
      .addCase(orderPay.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { resetOrderId, resetOrderState } = orderSlice.actions

export default orderSlice.reducer
