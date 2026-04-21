// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// authSlice sera ajouté par Leslie — ajoute-le ici quand il pousse
// import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // auth: authReducer,   // ← décommente quand Leslie pousse authSlice
  },
});

export default store;
