// src/App.jsx
// Point d'entrée de l'app — routes de Ange uniquement
// Les routes de Linus (/, /search, /medicaments/:id) seront ajoutées par Linus

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './store';
import CartPage from './pages/order/CartPage';
import CheckoutPage from './pages/order/CheckoutPage';
import PaymentPage from './pages/order/PaymentPage';

// ⚠️ Ces imports seront fournis par Linus et Leslie
// import HomePage from './pages/search/HomePage';
// import SearchResultsPage from './pages/search/SearchResultsPage';
// import MedicamentDetailPage from './pages/search/MedicamentDetailPage';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Routes Ange */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />

        {/* Placeholder accueil → sera remplacé par HomePage de Linus */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <i className="fa-solid fa-pills text-5xl mb-4 block" />
                <p className="font-semibold">HomePage — En attente de Linus</p>
                <a href="/cart" className="text-[#2C5F8D] text-sm underline mt-2 block">
                  Tester le panier →
                </a>
              </div>
            </div>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
