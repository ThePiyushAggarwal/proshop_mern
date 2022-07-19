import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      return await axios.get('/api/products').then((res) => res.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getProductById = createAsyncThunk(
  'products/getProductsById',
  async (id, thunkAPI) => {
    try {
      return await axios.get(`/api/products/${id}`).then((res) => res.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
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
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false
        state.products = payload
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false
        state.error =
          payload.response && payload.response.data.message
            ? payload.response.data.message
            : payload.message
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.product = payload
      })
      .addCase(getProductById.rejected, (state, { payload }) => {
        state.loading = false
        state.error =
          payload.response && payload.response.data.message
            ? payload.response.data.message
            : payload.message
      })
  },
})

export default productSlice.reducer
