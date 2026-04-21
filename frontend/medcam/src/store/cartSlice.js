// src/store/cartSlice.js
// ⚠️ URGENT — Linus a besoin de ce fichier pour "Ajouter au panier"
// Une fois pushé sur develop → notifie Linus sur Discord

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
    /**
     * addItem : ajoute un médicament au panier
     * Si le médicament existe déjà (même medicamentId) → incrémente quantity
     * Si la pharmacie est différente → vide le panier et repart de zéro
     */
    addItem(state, action) {
      const newItem = action.payload;

      // Si on change de pharmacie → vider le panier
      if (state.pharmacyId && state.pharmacyId !== newItem.pharmacyId) {
        state.items = [];
        state.pharmacyId = newItem.pharmacyId;
        state.pharmacyName = newItem.pharmacyName;
      }

      // Définir la pharmacie si pas encore définie
      if (!state.pharmacyId) {
        state.pharmacyId = newItem.pharmacyId;
        state.pharmacyName = newItem.pharmacyName;
      }

      const existing = state.items.find(
        (item) => item.medicamentId === newItem.medicamentId
      );

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

    /**
     * removeItem : supprime un médicament du panier
     */
    removeItem(state, action) {
      const medicamentId = action.payload;
      state.items = state.items.filter(
        (item) => item.medicamentId !== medicamentId
      );

      // Si le panier est vide → reset la pharmacie
      if (state.items.length === 0) {
        state.pharmacyId = null;
        state.pharmacyName = '';
      }
    },

    /**
     * updateQuantity : modifie la quantité d'un item
     * Si quantity = 0 → supprime l'item
     */
    updateQuantity(state, action) {
      const { medicamentId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.medicamentId !== medicamentId
        );
        if (state.items.length === 0) {
          state.pharmacyId = null;
          state.pharmacyName = '';
        }
        return;
      }

      const item = state.items.find(
        (item) => item.medicamentId === medicamentId
      );
      if (item) {
        item.quantity = quantity;
      }
    },

    /**
     * clearCart : vide complètement le panier
     */
    clearCart(state) {
      state.items = [];
      state.pharmacyId = null;
      state.pharmacyName = '';
    },

    /**
     * setPharmacy : change de pharmacie (vide le panier si différente)
     */
    setPharmacy(state, action) {
      const { pharmacyId, pharmacyName } = action.payload;
      if (state.pharmacyId && state.pharmacyId !== pharmacyId) {
        state.items = [];
      }
      state.pharmacyId = pharmacyId;
      state.pharmacyName = pharmacyName;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setPharmacy,
} = cartSlice.actions;

// ─── SELECTORS ───────────────────────────────────────────────────────────────

/** Liste de tous les items du panier */
export const selectCartItems = (state) => state.cart.items;

/** Total général : somme(price × quantity) */
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

/** Nombre total d'articles (somme des quantités) */
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

/** Pharmacie sélectionnée */
export const selectCartPharmacy = (state) => ({
  pharmacyId: state.cart.pharmacyId,
  pharmacyName: state.cart.pharmacyName,
});

export default cartSlice.reducer;
