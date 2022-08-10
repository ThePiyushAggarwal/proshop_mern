import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setMessage from '../../utils/setMessage'

export const getUsers = createAsyncThunk(
  'users/getUsers',
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
  'users/deleteUser',
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

const initialState = {
  // Users List States
  userList: [],
  loadingUserList: false,
  errorUserList: '',
  //
  successDelete: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
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
  },
})

export default adminSlice.reducer
