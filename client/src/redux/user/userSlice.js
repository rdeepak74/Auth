import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currenUser: null,
  loading: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sigInStart: (state) => {
      state.loading = true
    },
    sigInSuccess: (state, action) => {
      state.currenUser = action.payload
      state.loading = false
      state.error = false
    },
    sigInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { sigInStart, sigInSuccess, sigInFailure } = userSlice.actions
export default userSlice.reducer
