import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'

// authSlice (Leslie) et cartSlice (Ange) pas encore créés
// On les importe conditionnellement pour éviter les erreurs
let authReducer = (state = {}) => state
let cartReducer = (state = {}) => state

try {
  authReducer = require('./authSlice').default
} catch (e) {}

try {
  cartReducer = require('./cartSlice').default
} catch (e) {}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    toast: toastReducer,
  },
})

export default store