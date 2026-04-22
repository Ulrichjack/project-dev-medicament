// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
<<<<<<< Updated upstream
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
=======
import authReducer from './authSlice'; // ← Leslie a pushé authSlice, on le décommente

export const store = configureStore({
  reducer: {
    auth: authReducer, // ← nécessaire pour PrivateRoute (Leslie)
    cart: cartReducer,
  },
});
>>>>>>> Stashed changes
