import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cartSlice';

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();
  
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="MEDCAM" className="h-12 w-auto" />
          <span
            className="text-[#1E3A8A] font-bold text-xl"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            MEDCAM
          </span>
        </Link>

        {/* Menu droite */}
        <div className="flex items-center gap-4">

          {/* Panier — caché sur les pages auth */}
          {!isAuthPage && (
            <Link to="/cart" className="relative text-gray-500 hover:text-[#1E3A8A] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Bouton Connexion */}
          <Link
            to="/login"
            className="bg-[#1E3A8A] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#38BDF8] transition-colors"
          >
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}