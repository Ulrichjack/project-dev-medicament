import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { register } from '../../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'client',
    password: '',
    password_confirmation: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setGlobalError('');
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { score: 0, label: '', color: '' };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { score, label: 'Faible', color: '#E74C3C' };
    if (score === 2) return { score, label: 'Moyen', color: '#F39C12' };
    if (score === 3) return { score, label: 'Bon', color: '#4ADE80' };
    return { score, label: 'Excellent', color: '#1e8449' };
  };

  const strength = getPasswordStrength();

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2)
      newErrors.name = 'Le nom est requis (min 2 caractères)';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email invalide';
    if (!formData.phone || !/^[62]\d{8}$/.test(formData.phone))
      newErrors.phone = 'Téléphone invalide (ex: 6XXXXXXXX)';
    if (!formData.password || formData.password.length < 8)
      newErrors.password = 'Minimum 8 caractères';
    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    if (!formData.terms)
      newErrors.terms = 'Vous devez accepter les conditions';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      const { user, token } = await register(formData);
      dispatch(setCredentials({ user, token }));
      navigate('/');
    } catch (err) {
      if (typeof err === 'object' && !err.message) {
        setErrors(err);
      } else {
        setGlobalError(err?.message || "Erreur lors de l'inscription");
      }
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
      text: 'Inscription gratuite',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      text: 'Alertes médicaments',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      text: 'Suivi de commandes',
    },
  ];

  const inputClass = (name) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-[#F8FAFC] text-[#1E293B] placeholder:text-[#94A3B8] ${
      errors[name]
        ? 'border-red-400 bg-red-50'
        : focused[name]
        ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/10 bg-white'
        : 'border-[#E2E8F0] hover:border-[#94A3B8]'
    }`;

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]">

        {/* Panneau gauche — MODIFIÉ: ajout text-center */}
        <div
          className="hidden md:flex md:w-5/12 relative flex-col items-center justify-between py-10 px-8 text-center"
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
            <Link to="/login" className="hover:text-white transition-colors">CONNEXION</Link>
          </div>

          {/* Centre — MODIFIÉ: ajout -mt-10 */}
          <div className="flex flex-col items-center gap-4 z-10 -mt-10">
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
              Rejoignez la communauté MEDCAM et accédez à tous nos services pharmaceutiques.
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
        <div className="w-full md:w-7/12 flex flex-col justify-center px-10 py-10 overflow-y-auto">

          {/* Logo mobile */}
          <div className="flex md:hidden items-center gap-2 mb-6 justify-center">
            <img src="/logo.svg" alt="MEDCAM" className="h-8 w-auto" />
            <span className="text-xl font-bold text-[#1E3A8A]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
              MEDCAM
            </span>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-[#1E293B] mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Créer un compte 
            </h1>
            <p className="text-[#64748B] text-sm">
              Rejoignez MEDCAM en quelques secondes
            </p>
          </div>

          {globalError && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{globalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nom */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Nom complet</label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.name ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input type="text" name="name" placeholder="Jean Dupont"
                  value={formData.name} onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, name: true }))}
                  onBlur={() => setFocused(p => ({ ...p, name: false }))}
                  className={inputClass('name')} />
              </div>
              {errors.name && <p className="text-xs text-red-500">⚠ {errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Adresse email</label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.email ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input type="email" name="email" placeholder="votre@email.com"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, email: true }))}
                  onBlur={() => setFocused(p => ({ ...p, email: false }))}
                  className={inputClass('email')} />
              </div>
              {errors.email && <p className="text-xs text-red-500">⚠ {errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Téléphone</label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.phone ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <input type="tel" name="phone" placeholder="6XXXXXXXX"
                  value={formData.phone} onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, phone: true }))}
                  onBlur={() => setFocused(p => ({ ...p, phone: false }))}
                  className={inputClass('phone')} />
              </div>
              {errors.phone && <p className="text-xs text-red-500">⚠ {errors.phone}</p>}
            </div>

            {/* Rôle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Je suis</label>
              <div className="flex gap-3">
                {[
                  { value: 'client', label: 'Client', icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )},
                  { value: 'pharmacien', label: 'Pharmacien', icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )},
                ].map((r) => (
                  <label key={r.value} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                    formData.role === r.value
                      ? 'border-[#1E3A8A] bg-[#F0F4FF] text-[#1E3A8A]'
                      : 'border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]'
                  }`}>
                    <input type="radio" name="role" value={r.value}
                      checked={formData.role === r.value}
                      onChange={handleChange} className="hidden" />
                    {r.icon}
                    {r.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Mot de passe</label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.password ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input type={showPassword ? 'text' : 'password'} name="password"
                  placeholder="Minimum 8 caractères"
                  value={formData.password} onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, password: true }))}
                  onBlur={() => setFocused(p => ({ ...p, password: false }))}
                  className={`${inputClass('password')} pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E3A8A] transition-colors">
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
              {formData.password && (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= strength.score ? strength.color : '#E2E8F0' }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strength.color }}>
                    Force : {strength.label}
                  </p>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-500">⚠ {errors.password}</p>}
            </div>

            {/* Confirmation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Confirmer le mot de passe</label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused.password_confirmation ? 'text-[#1E3A8A]' : 'text-[#CBD5E1]'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input type={showConfirm ? 'text' : 'password'} name="password_confirmation"
                  placeholder="Répétez votre mot de passe"
                  value={formData.password_confirmation} onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, password_confirmation: true }))}
                  onBlur={() => setFocused(p => ({ ...p, password_confirmation: false }))}
                  className={`${inputClass('password_confirmation')} pr-10`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E3A8A] transition-colors">
                  {showConfirm ? (
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
              {formData.password_confirmation && formData.password === formData.password_confirmation && (
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Les mots de passe correspondent
                </p>
              )}
              {errors.password_confirmation && <p className="text-xs text-red-500">⚠ {errors.password_confirmation}</p>}
            </div>

            {/* CGU */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="terms"
                  checked={formData.terms} onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-[#1E3A8A]" />
                <span className="text-sm text-[#64748B]">
                  J'accepte les{' '}
                  <Link to="/terms" className="text-[#1E3A8A] font-medium hover:underline">
                    conditions d'utilisation
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500">⚠ {errors.terms}</p>}
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
                  Création en cours...
                </>
              ) : (
                <>Créer mon compte </>
              )}
            </button>

            {/* Lien connexion */}
            <p className="text-center text-sm text-[#64748B]">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-[#1E3A8A] font-bold hover:underline">
                Se connecter
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}