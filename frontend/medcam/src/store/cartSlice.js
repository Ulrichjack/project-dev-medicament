import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  pharmacyId: null,
  pharmacyName: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      if (state.pharmacyId && state.pharmacyId !== newItem.pharmacyId) {
        state.items = [];
        state.pharmacyId = newItem.pharmacyId;
        state.pharmacyName = newItem.pharmacyName;
      }
      if (!state.pharmacyId) {
        state.pharmacyId = newItem.pharmacyId;
        state.pharmacyName = newItem.pharmacyName;
      }
      const existing = state.items.find(item => item.medicamentId === newItem.medicamentId);
      if (existing) {
        existing.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          medicamentId: newItem.medicamentId,
          medicamentName: newItem.medicamentName,
          photo_url: newItem.photo_url || null,
          pharmacyId: newItem.pharmacyId,
          pharmacyName: newItem.pharmacyName,
          price: newItem.price,
          quantity: newItem.quantity || 1,
        });
      }
    },
    removeItem(state, action) {
      const medicamentId = action.payload;
      state.items = state.items.filter(item => item.medicamentId !== medicamentId);
      if (state.items.length === 0) {
        state.pharmacyId = null;
        state.pharmacyName = '';
      }
    },
    updateQuantity(state, action) {
      const { medicamentId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.medicamentId !== medicamentId);
        if (state.items.length === 0) {
          state.pharmacyId = null;
          state.pharmacyName = '';
        }
        return;
      }
      const item = state.items.find(item => item.medicamentId === medicamentId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.pharmacyId = null;
      state.pharmacyName = '';
    }
  },
});

// 1. On exporte les Actions pour modifier le panier
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// 2. On exporte les Selectors pour lire le panier (C'EST ÇA QUI MANQUAIT !)
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartCount = (state) => state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartPharmacy = (state) => ({
  pharmacyId: state.cart.pharmacyId,
  pharmacyName: state.cart.pharmacyName,
});

// 3. On exporte le reducer par défaut
export default cartSlice.reducer;