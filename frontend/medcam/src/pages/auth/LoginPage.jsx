import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { login } from '../../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const { user, token } = await login(email, password);
      dispatch(setCredentials({ user, token }));
      if (user.role === 'pharmacien') {
         navigate('/pharmacist/dashboard');
      } else {
         navigate('/');
      }
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Médicaments certifiés',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      text: 'Livraison rapide 24h',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      text: 'Paiement sécurisé',
    },
  ];

  const inputClass = (name) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-[#F8FAFC] text-[#1E293B] placeholder:text-[#94A3B8] ${
      focused[name]
        ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/10 bg-white'
        : 'border-[#E2E8F0] hover:border-[#94A3B8]'
    }`;

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[560px]">

        {/* Panneau gauche */}
        <div
          className="hidden md:flex md:w-5/12 relative flex-col items-center justify-between py-10 px-8"
          style={{ background: 'linear-gradient(160deg, #1E3A8A 0%, #38BDF8 100%)' }}
        >
          {/* Vagues décoratives */}
          <div className="absolute right-0 top-0 h-full w-20 overflow-hidden">
            <svg viewBox="0 0 80 600" preserveAspectRatio="none" className="h-full w-full">
              <path d="M80,0 C40,100 70,200 30,300 C0,400 50,500 80,600 L80,0 Z" fill="white" fillOpacity="0.07" />
              <path d="M80,0 C20,150 60,280 20,380 C-10,460 60,540 80,600 L80,0 Z" fill="white" fillOpacity="0.05" />
              <path d="M80,80 C45,200 70,300 30,400 C5,470 55,550 80,600 L80,80 Z" fill="white" fillOpacity="0.10" />
            </svg>
          </div>

          {/* Liens haut */}
          <div className="flex gap-6 text-white/60 text-xs font-medium z-10">
            <Link to="/" className="hover:text-white transition-colors">ACCUEIL</Link>
            <span>|</span>
            <Link to="/register" className="hover:text-white transition-colors">S'INSCRIRE</Link>
          </div>

          {/* Centre */}
          <div className="flex flex-col items-center gap-4 z-10">
            <div
             className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <img src="/logo.svg" alt="MEDCAM" className="w-24 h-24 object-contain" />
          </div>

            <h2 className="text-white text-2xl font-bold text-center"
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
              MEDCAM
            </h2>

            <p className="text-white/65 text-sm text-center leading-relaxed max-w-48">
              La pharmacie à portée de main. Commandez vos médicaments en toute sécurité.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-3 mt-4 w-full">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </div>
                  <span className="text-white/75 text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bas */}
          <p className="text-white/40 text-xs z-10">© 2026 MEDCAM</p>
        </div>

        {/* Panneau droit */}
        <div className="w-full md:w-7/12 flex flex-col justify-center px-10 py-10">

          {/* Logo mobile */}
          <div className="flex md:hidden items-center gap-2 mb-8 justify-center">
            <img src="/logo.svg" alt="MEDCAM" className="h-8 w-auto" />
            <span className="text-xl font-bold text-[#1E3A8A]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
              MEDCAM
            </span>
          </div>

          {/* Header */}
          <div className="mb-4 text-center">
            <h1
              className="text-5xl font-bold text-[#1E293B] mb-2"
              style={{ fontFamily: "'Dancing Script', Georgia, serif" }}
            >
              Bon retour 
            </h1>
            <p className="text-[#64748B] text-base">
              Connectez-vous à votre compte MEDCAM
            </p>
          </div>

          {/* Erreur globale */}
          {errorMsg && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Adresse email</label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.email ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(p => ({ ...p, email: true }))}
                  onBlur={() => setFocused(p => ({ ...p, email: false }))}
                  required
                  className={inputClass('email')}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#374151]">Mot de passe</label>
                <Link to="/forgot-password" className="text-xs text-[#38BDF8] hover:underline font-medium">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.password ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused(p => ({ ...p, password: true }))}
                  onBlur={() => setFocused(p => ({ ...p, password: false }))}
                  required
                  className={`${inputClass('password')} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E3A8A] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 mx-auto py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 mt-1"
              style={{
                background: loading ? '#94A3B8' : 'linear-gradient(135deg, #1E3A8A, #38BDF8)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(30, 58, 138, 0.35)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                <>Se connecter </>
              )}
            </button>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E2E8F0]" />
              <span className="text-xs text-[#94A3B8]">ou</span>
              <div className="flex-1 h-px bg-[#E2E8F0]" />
            </div>

            {/* Lien inscription */}
            <p className="text-center text-sm text-[#64748B]">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-[#1E3A8A] font-bold hover:underline">
                Créer un compte
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}