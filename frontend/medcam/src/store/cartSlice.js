import { createSlice } from '@reduxjs/toolkit';

// --- FONCTIONS POUR LIRE/SAUVEGARDER DANS LE NAVIGATEUR ---
const loadState = () => {
  try {
    const items = localStorage.getItem('medcam_cart_items');
    const pharmacy = localStorage.getItem('medcam_cart_pharmacy');
    return {
      items: items ? JSON.parse(items) : [],
      pharmacyId: pharmacy ? JSON.parse(pharmacy).id : null,
      pharmacyName: pharmacy ? JSON.parse(pharmacy).name : null,
    };
  } catch (err) {
    return { items: [], pharmacyId: null, pharmacyName: null };
  }
};

const saveState = (state) => {
  localStorage.setItem('medcam_cart_items', JSON.stringify(state.items));
  localStorage.setItem('medcam_cart_pharmacy', JSON.stringify({
    id: state.pharmacyId,
    name: state.pharmacyName
  }));
};

const initialState = loadState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { medicamentId, pharmacyId, pharmacyName, quantity } = action.payload;

     
      

      state.pharmacyId = pharmacyId;
      state.pharmacyName = pharmacyName;

      const existingItem = state.items.find(item => item.medicamentId === medicamentId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
      
      saveState(state); // On sauvegarde !
    },
    updateQuantity: (state, action) => {
      const { medicamentId, quantity } = action.payload;
      const item = state.items.find(item => item.medicamentId === medicamentId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveState(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.medicamentId !== action.payload);
      if (state.items.length === 0) {
        state.pharmacyId = null;
        state.pharmacyName = null;
      }
      saveState(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.pharmacyId = null;
      state.pharmacyName = null;
      saveState(state);
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartPharmacy = (state) => state.cart;

export default cartSlice.reducer;