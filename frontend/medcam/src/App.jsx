import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/search/HomePage";
import CartPage from "./pages/order/CartPage"; 
import CheckoutPage from "./pages/order/CheckoutPage"; // <-- Ajouté
import PaymentPage from "./pages/order/PaymentPage";   // <-- Ajouté

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-alt flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />            {/* <-- Ajouté */}
            <Route path="/payment/:orderId" element={<PaymentPage />} />     {/* <-- Ajouté */}
            <Route path="/login" element={<div className="p-10 text-center">Page de Connexion en construction</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;