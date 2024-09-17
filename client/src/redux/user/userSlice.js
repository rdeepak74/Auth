import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
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
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    sigInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    updateUserStart: (state) => {
      state.loading = true
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    sigOut: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    },
  },
})

export const {
  sigInStart,
  sigInSuccess,
  sigInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  sigOut,
} = userSlice.actions
export default userSlice.reducer
