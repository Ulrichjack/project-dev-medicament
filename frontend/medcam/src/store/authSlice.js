import { createSlice } from '@reduxjs/toolkit'

// Restaurer la session depuis localStorage au démarrage
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

  },
})

export const { setCredentials, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer