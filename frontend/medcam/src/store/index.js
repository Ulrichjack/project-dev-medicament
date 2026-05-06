// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Nécessaire pour PrivateRoute et la connexion
    cart: cartReducer, // Nécessaire pour le panier
    toast: toastReducer, // Nécessaire pour les notifications
  },
});

export default store;