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
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: () => initialState,
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
  },
})

export const { resetAdminState } = adminSlice.actions

export default adminSlice.reducer
