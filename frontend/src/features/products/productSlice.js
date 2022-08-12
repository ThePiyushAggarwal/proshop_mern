import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setMessage from '../../utils/setMessage'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      return await axios.get('/api/products').then((res) => res.data)
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getProductById = createAsyncThunk(
  'products/getProductsById',
  async (id, thunkAPI) => {
    try {
      return await axios.get(`/api/products/${id}`).then((res) => res.data)
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true
        state.products = []
        state.error = ''
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false
        state.products = payload
        state.error = ''
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false
        state.products = []
        state.error = payload
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true
        state.product = {}
        state.error = ''
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.product = payload
        state.error = ''
      })
      .addCase(getProductById.rejected, (state, { payload }) => {
        state.loading = false
        state.product = {}
        state.error = payload
      })
  },
})

export default productSlice.reducer
