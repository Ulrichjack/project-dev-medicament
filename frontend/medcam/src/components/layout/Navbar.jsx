import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cartSlice';

export default function Navbar() {
  // On récupère le nombre d'articles dans le panier grâce à Redux
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. Logo à gauche */}
        <Link to="/" className="text-[#2C5F8D] font-bold text-2xl flex items-center gap-2">
          <i className="fa-solid fa-notes-medical"></i>
          MEDCAM
        </Link>

        {/* 2. Menu à droite */}
        <div className="flex items-center gap-6">
          
          {/* Icône Panier avec le badge dynamique */}
          <Link to="/cart" className="relative text-gray-600 hover:text-[#2C5F8D] transition-colors">
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Bouton Connexion */}
          <Link to="/login" className="bg-[#EBF4FF] text-[#2C5F8D] px-4 py-2 rounded-lg font-semibold hover:bg-[#2C5F8D] hover:text-white transition-colors">
            Connexion
          </Link>

        </div>
      </div>
    </nav>
  );
}