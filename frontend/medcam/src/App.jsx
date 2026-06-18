import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './store';

import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/search/HomePage";
import CartPage from "./pages/order/CartPage"; 
import CheckoutPage from "./pages/order/CheckoutPage";
import PaymentPage from "./pages/order/PaymentPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-bg-alt flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
              <Route path="/login" element={<div className="p-10 text-center">Page de Connexion en construction</div>} />
              
              {/* Redirection par défaut si la page n'existe pas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;