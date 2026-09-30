import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {

    addToast: (state, action) => {
      state.toasts.push({
        id: Date.now(),
        type: action.payload.type || 'info', // 'success' | 'error' | 'warning' | 'info'
        message: action.payload.message,
        duration: action.payload.duration || 4000,
      })
    },

    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
    },

  },
})

export const { addToast, removeToast } = toastSlice.actions
export default toastSlice.reducer