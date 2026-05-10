import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/index'; 
import { setCredentials, logout } from './store/authSlice'; 

// Layout & UI
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/layout/PrivateRoute"; // Si tu l'as, sinon enlève-le

// Pages de Recherche (Linux)
import HomePage from "./pages/search/HomePage";
import SearchResultsPage from './pages/search/SearchResultsPage';
import MedicamentDetailPage from './pages/search/MedicamentDetailPage';

// Pages Auth (Leslie)
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/auth/ProfilePage"; // Si tu l'as

// Pages Commandes (Ange)
import CartPage from "./pages/order/CartPage"; 
import CheckoutPage from "./pages/order/CheckoutPage";
import PaymentPage from "./pages/order/PaymentPage";

import UserOrdersPage from './pages/order/UserOrdersPage'; // À créer
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboard';
//Toast
import ToastContainer from "./components/layout/ToastContainer";

// --- COMPOSANT POUR MAINTENIR LA CONNEXION AU REFRESH (F5) ---
function AppInit({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // On lit les clés exactes de ton authSlice
    const token = localStorage.getItem('medcam_token');
    const userString = localStorage.getItem('medcam_user');

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        dispatch(setCredentials({ user, token }));
      } catch (e) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return children;
}
// -------------------------------------------------------------

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppInit>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <ToastContainer />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Routes Publiques */}
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/medicaments/:id" element={<MedicamentDetailPage />} />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                
                {/* Routes Privées (Il faut être connecté pour commander) */}
                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment/:orderId" element={<PaymentPage />} />
                  <Route path="/orders" element={<UserOrdersPage />} />
                  <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
                </Route>
                
                {/* Redirection par défaut */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </AppInit>
      </Router>
    </Provider>
  );
}

export default App;