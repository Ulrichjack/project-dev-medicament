import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-[#E8ECF0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary font-sans">PharmApp</Link>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="text-gray-600 hover:text-primary">
            <i className="fas fa-cart-shopping text-xl"></i>
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-primary font-semibold">
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}