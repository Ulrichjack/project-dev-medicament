// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

// Décommentez la ligne ci-dessous et ajoutez 'toast: toastReducer' dans reducer 
// si vous utilisez vraiment toastSlice dans le reste du projet.
// import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Nécessaire pour PrivateRoute et la connexion
    cart: cartReducer, // Nécessaire pour le panier
  },
});

export default store;