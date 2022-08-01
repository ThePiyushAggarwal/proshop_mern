import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (loginDetails, thunkAPI) => {
    try {
      const config = { 'Content-Type': 'application/json' }
      const { data } = await axios.post(
        '/api/users/login',
        loginDetails,
        config
      )
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
        localStorage.setItem('userInfo', JSON.stringify(payload))
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error =
          payload.response && payload.response.data.message
            ? payload.response.data.message
            : payload.message
      })
  },
})

export default userSlice.reducer
