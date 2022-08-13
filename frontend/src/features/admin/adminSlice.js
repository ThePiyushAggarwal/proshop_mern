import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setMessage from '../../utils/setMessage'

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.get('/api/users', config)
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.delete(`/api/users/${id}`, config)
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getUserById = createAsyncThunk(
  'admin/getUserById',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.get(`/api/users/${id}`, config)
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (userDetails, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      await axios.put(
        `/api/users/${userDetails.id}`,
        userDetails.details,
        config
      )
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Product Delete
export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      await axios.delete(`/api/products/${id}`, config)
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Product Create - Sample
export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (productDetails, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      await axios.post(`/api/products`, productDetails, config)
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Product Update
export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async (productDetails, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/products/${productDetails.id}`,
        productDetails.details,
        config
      )
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Orders - Get all
export const getOrders = createAsyncThunk(
  'admin/getOrders',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.get(`/api/orders`, config)
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Orders - mark delivered
export const orderDeliver = createAsyncThunk(
  'admin/orderDeliver',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      await axios.put(`/api/orders/${id}/deliver`, {}, config)
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const initialState = {
  // Users List States
  userList: [],
  loadingUserList: false,
  errorUserList: '',
  //
  successDelete: false,
  //
  user: null,
  userLoading: true,
  userError: '',
  //
  userUpdating: false,
  userUpdateSuccess: false,
  userUpdateError: '',
  //
  productDeleteSuccess: false,
  //
  productNewLoading: false,
  productNewSuccess: false,
  productNewError: '',
  //
  productUpdateLoading: false,
  productUpdateSuccess: false,
  productUpdateError: '',
  //
  orderList: [],
  loadingOrderList: false,
  errorOrderList: '',
  //
  orderDeliverLoading: false,
  orderDeliverSuccess: false,
  orderDeliverError: '',
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: () => initialState,
    resetProductNew: (state) => {
      state.productNewLoading = false
      state.productNewSuccess = false
      state.productNewError = ''
    },
    resetProductUpdate: (state) => {
      state.productUpdateLoading = false
      state.productUpdateSuccess = false
      state.productUpdateError = ''
    },
    resetOrderDeliver: (state) => {
      state.orderDeliverLoading = false
      state.orderDeliverSuccess = false
      state.orderDeliverError = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loadingUserList = true
        state.errorUserList = ''
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loadingUserList = false
        state.userList = payload
        state.errorUserList = ''
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loadingUserList = false
        state.errorUserList = payload
      })
      //
      .addCase(deleteUser.pending, (state) => {
        state.successDelete = false
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.successDelete = true
      })
      .addCase(deleteUser.rejected, (state) => {
        state.successDelete = false
      })
      //
      .addCase(getUserById.pending, (state) => {
        state.userLoading = true
        state.user = null
        state.userError = ''
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.userLoading = false
        state.user = payload
        state.userError = ''
      })
      .addCase(getUserById.rejected, (state, { payload }) => {
        state.userLoading = false
        state.user = null
        state.userError = payload
      })
      //
      .addCase(updateUser.pending, (state) => {
        state.userUpdating = true
        state.userUpdateError = ''
        state.userUpdateSuccess = false
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.userUpdating = false
        state.userUpdateError = ''
        state.userUpdateSuccess = true
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.userUpdating = false
        state.userUpdateError = payload
        state.userUpdateSuccess = false
      })
      //
      .addCase(deleteProduct.pending, (state) => {
        state.productDeleteSuccess = false
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.productDeleteSuccess = true
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.productDeleteSuccess = false
      })
      //
      .addCase(createProduct.pending, (state) => {
        state.productNewLoading = true
        state.productNewSuccess = false
        state.productNewError = ''
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.productNewLoading = false
        state.productNewSuccess = true
        state.productNewError = ''
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.productNewLoading = false
        state.productNewSuccess = false
        state.productNewError = payload
      })
      //
      .addCase(updateProduct.pending, (state) => {
        state.productUpdateLoading = true
        state.productUpdateSuccess = false
        state.productUpdateError = ''
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.productUpdateLoading = false
        state.productUpdateSuccess = true
        state.productUpdateError = ''
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.productUpdateLoading = false
        state.productUpdateSuccess = false
        state.productUpdateError = payload
      })
      //
      .addCase(getOrders.pending, (state) => {
        state.loadingOrderList = true
        state.orderList = []
        state.errorOrderList = ''
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.loadingOrderList = false
        state.orderList = payload
        state.errorOrderList = ''
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.loadingOrderList = false
        state.orderList = []
        state.errorOrderList = payload
      })
      //
      .addCase(orderDeliver.pending, (state) => {
        state.orderDeliverLoading = true
        state.orderDeliverSuccess = false
        state.orderDeliverError = ''
      })
      .addCase(orderDeliver.fulfilled, (state) => {
        state.orderDeliverLoading = false
        state.orderDeliverSuccess = true
        state.orderDeliverError = ''
      })
      .addCase(orderDeliver.rejected, (state, { payload }) => {
        state.orderDeliverLoading = false
        state.orderDeliverSuccess = false
        state.orderDeliverError = payload
      })
  },
})

export const {
  resetAdminState,
  resetProductNew,
  resetProductUpdate,
  resetOrderDeliver,
} = adminSlice.actions

export default adminSlice.reducer
