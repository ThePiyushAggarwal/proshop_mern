import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setMessage from '../../utils/setMessage'

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (loginDetails, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/users/login', loginDetails)
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userDetails, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/users', userDetails)
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userDetails, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const { data } = await axios.put(
        '/api/users/profile',
        userDetails,
        config
      )
      return data
    } catch (error) {
      const message = setMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

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
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  loading: false,
  error: '',
  updateSuccess: false,
  // Users List States
  userList: [],
  loadingUserList: false,
  errorUserList: '',
  //
  successDelete: false,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('userInfo')
      state.user = null
      state = initialState
    },
    resetError: (state) => {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
        state.error = ''
        localStorage.setItem('userInfo', JSON.stringify(payload))
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      //
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
        localStorage.setItem('userInfo', JSON.stringify(payload))
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      //
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
        state.updateSuccess = true
        localStorage.setItem('userInfo', JSON.stringify(payload))
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      //
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

export const { logoutUser, resetError } = userSlice.actions

export default userSlice.reducer
