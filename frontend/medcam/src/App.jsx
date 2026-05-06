import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './store'; // Assure-toi que l'export correspond bien à ton store

import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/search/HomePage";
import CartPage from "./pages/order/CartPage"; 
import CheckoutPage from "./pages/order/CheckoutPage";
import PaymentPage from "./pages/order/PaymentPage";

// Nouveaux imports de Linux pour la recherche
import SearchResultsPage from './pages/search/SearchResultsPage';
import MedicamentDetailPage from './pages/search/MedicamentDetailPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-bg-alt flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Routes de base et de recherche */}
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/medicaments/:id" element={<MedicamentDetailPage />} />
              
              {/* Routes de commandes */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
              
              {/* Route de connexion (temporaire ou à remplacer par ta vraie LoginPage) */}
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