import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setMessage from '../../utils/setMessage'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (search, thunkAPI) => {
    try {
      if (search) {
        return await axios
          .get(`/api/products?search=${search}`)
          .then((res) => res.data)
      }
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

export const createReview = createAsyncThunk(
  'products/createReview',
  async (data, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      await axios.post(`/api/products/${data.id}/reviews`, data.details, config)
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
    //
    createReviewLoading: false,
    createReviewSuccess: false,
    createReviewError: '',
  },
  reducers: {
    resetCreateReview: (state) => {
      state.createReviewLoading = false
      state.createReviewSuccess = false
      state.createReviewError = ''
    },
  },
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
      //
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
      //
      .addCase(createReview.pending, (state) => {
        state.createReviewLoading = true
        state.createReviewSuccess = false
        state.createReviewError = ''
      })
      .addCase(createReview.fulfilled, (state) => {
        state.createReviewLoading = false
        state.createReviewSuccess = true
        state.createReviewError = ''
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.createReviewLoading = false
        state.createReviewSuccess = false
        state.createReviewError = payload
      })
  },
})

export const { resetCreateReview } = productSlice.actions

export default productSlice.reducer
