import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/search/HomePage";
import CartPage from "./pages/order/CartPage";
import CheckoutPage from "./pages/order/CheckoutPage";
import PaymentPage from "./pages/order/PaymentPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/auth/ProfilePage";
import PrivateRoute from "./components/layout/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-alt flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;