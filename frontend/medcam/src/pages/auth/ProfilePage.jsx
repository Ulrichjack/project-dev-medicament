import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../store/authSlice';
import { logout as logoutApi } from '../../services/authService';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const getInitials = () => {
    if (!user?.name) return '?';
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'pharmacien': return { label: 'Pharmacien', color: 'bg-[#4ADE80]/20 text-green-700' };
      case 'admin': return { label: 'Administrateur', color: 'bg-red-100 text-red-700' };
      default: return { label: 'Client', color: 'bg-[#38BDF8]/20 text-[#1E3A8A]' };
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logoutApi();
    } catch (_) {}
    finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  const role = getRoleBadge();

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : 'Non disponible';

  return (
    <div className="min-h-screen bg-[#F0F4FF] py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Card header profil */}
        <div
          className="rounded-2xl overflow-hidden shadow-md"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)' }}
        >
          <div className="px-8 py-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center">
              <span className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {getInitials()}
              </span>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user?.name || 'Utilisateur'}
              </h1>
              <p className="text-white/70 text-sm mt-1">{user?.email || ''}</p>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white">
              {role.label}
            </span>
          </div>
        </div>

        {/* Card infos */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Informations personnelles
          </h2>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E3A8A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                label: 'Nom complet', value: user?.name
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E3A8A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Email', value: user?.email
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E3A8A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: 'Téléphone', value: user?.phone
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E3A8A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                label: 'Rôle', value: role.label
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E3A8A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Membre depuis', value: memberSince
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="w-8 flex-shrink-0 flex items-center justify-center">
                  {item.icon}
                </span>
                <div className="flex-1">
                  <p className="text-xs text-[#64748B] font-medium">{item.label}</p>
                  <p className="text-sm text-[#1E293B] font-semibold mt-0.5">
                    {item.value || 'Non renseigné'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card déconnexion */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E293B]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Déconnexion
            </h2>
            <p className="text-sm text-[#64748B]">
              Vous serez redirigé vers la page de connexion
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: logoutLoading ? '#94A3B8' : '#E63946',
              boxShadow: logoutLoading ? 'none' : '0 4px 15px rgba(192, 57, 43, 0.2)',
              cursor: logoutLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {logoutLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Déconnexion...
              </>
            ) : (
              <>
                {/* <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg> */}
                Se déconnecter
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}