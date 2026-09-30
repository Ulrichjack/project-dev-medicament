import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../../store/cartSlice';
import { selectIsAuthenticated, selectUser, logout } from '../../store/authSlice';
import { logout as logoutApi } from '../../services/authService'; 

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      if (logoutApi) await logoutApi();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link to="/" className="text-[#1E3A8A] font-black text-2xl flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <img src="/logo.svg" alt="MEDCAM" className="w-24 h-24 object-contain" />
          MEDCAM
        </Link>

                {/* 2. MENU DROITE */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {isAuthenticated && (
            <div className="flex items-center gap-4 mr-2 sm:mr-4 border-r border-slate-200 pr-4 sm:pr-6">
              
              {/* Lien Mes Commandes (UNIQUEMENT POUR CLIENT) */}
              {user?.role !== 'pharmacien' && (
                <Link to="/orders" className="text-sm font-bold text-slate-500 hover:text-[#1E3A8A] hidden sm:block">
                  Mes Commandes
                </Link>
              )}

              {/* Lien Espace Pro (UNIQUEMENT POUR PHARMACIEN) */}
              {user?.role === 'pharmacien' && (
                <Link to="/pharmacist/dashboard" className="text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg">
                  <i className="fa-solid fa-store mr-2"></i>Espace Pro
                </Link>
              )}
            </div>
          )}

          {/* Panier (UNIQUEMENT POUR CLIENT OU VISITEUR) */}
          {user?.role !== 'pharmacien' && (
            <Link to="/cart" className="relative text-slate-500 hover:text-[#1E3A8A] transition-colors p-2">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Authentification & Profil */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-[#1E293B] leading-none">{user?.name}</p>
                {user?.role === 'pharmacien' && (
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Pharmacien</span>
                )}
              </div>
              <button 
                onClick={handleLogout} 
                className="text-sm font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                title="Se déconnecter"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-[#1E3A8A] transition-colors">Connexion</Link>
              <Link to="/register" className="bg-[#1E3A8A] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1e40af] transition-colors shadow-sm">S'inscrire</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}