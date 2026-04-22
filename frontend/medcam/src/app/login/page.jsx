"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { setCredentials, setError } from "@/store/authSlice";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 caractères";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      const data = await login(formData);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push("/");
    } catch (err) {
      setGlobalError(err.message || "Email ou mot de passe incorrect");
      dispatch(setError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DCE9F5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[540px]">

        {/* Panneau gauche — bleu avec vagues et logo */}
        <div className="hidden md:flex md:w-2/5 relative flex-col items-center justify-between py-10 px-8"
          style={{ background: "linear-gradient(160deg, #2C5F8D 0%, #1e4a73 100%)" }}>

          {/* Vague décorative droite */}
          <div className="absolute right-0 top-0 h-full w-16 overflow-hidden">
            <svg viewBox="0 0 60 600" preserveAspectRatio="none" className="h-full w-full">
              <path d="M60,0 C30,100 60,200 30,300 C0,400 40,500 60,600 L60,0 Z"
                fill="white" fillOpacity="0.08" />
              <path d="M60,0 C20,150 50,250 20,350 C-10,450 50,550 60,600 L60,0 Z"
                fill="white" fillOpacity="0.06" />
              <path d="M60,50 C35,180 60,280 25,380 C0,460 45,540 60,600 L60,50 Z"
                fill="white" fillOpacity="0.12" />
            </svg>
          </div>

          {/* Liens haut */}
          <div className="flex gap-6 text-white/60 text-xs font-medium z-10">
            <Link href="/" className="hover:text-white transition-colors">ACCUEIL</Link>
            <span>|</span>
            <Link href="/register" className="hover:text-white transition-colors">S'INSCRIRE</Link>
          </div>

          {/* Logo central */}
          <div className="flex flex-col items-center gap-5 z-10">
            <div className="w-24 h-24 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
              <img src="/logo.png" alt="MEDCAM" className="w-14 h-14 object-contain" />
            </div>
            <h2 className="text-white text-2xl font-bold text-center"
              style={{ fontFamily: "Montserrat, sans-serif" }}>
              MEDCAM
            </h2>
            <p className="text-white/65 text-sm text-center leading-relaxed max-w-44">
              Votre plateforme de santé en ligne. Commandez vos médicaments en toute sécurité.
            </p>
          </div>

          {/* Bas */}
          <div className="text-white/40 text-xs z-10">
            © 2026 MEDCAM
          </div>
        </div>

        {/* Panneau droit — formulaire */}
        <div className="w-full md:w-3/5 flex flex-col justify-center px-10 py-10">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1A2B3C] mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}>
              Bon retour 👋
            </h1>
            <p className="text-[#94A3B8] text-sm">
              Connectez-vous à votre compte
            </p>
          </div>

          {/* Erreur globale */}
          {globalError && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-[#E74C3C]">
              <i className="fa-solid fa-circle-exclamation flex-shrink-0" />
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">
                Adresse email
              </label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${focused.email || formData.email ? "text-[#2C5F8D]" : "text-[#CBD5E1]"}`}>
                  <i className="fa-solid fa-envelope" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Entrez votre email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, email: true }))}
                  onBlur={() => setFocused(p => ({ ...p, email: false }))}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] text-[#2C3E50] outline-none transition-all duration-200 placeholder:text-[#CBD5E1] ${
                    errors.email ? "border-[#E74C3C] bg-red-50" : focused.email ? "border-[#2C5F8D] ring-2 ring-[#2C5F8D]/10 bg-white" : "border-[#E2E8F0] hover:border-[#94A3B8]"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-[#E74C3C] flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation" />{errors.email}</p>}
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">
                Mot de passe
              </label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${focused.password || formData.password ? "text-[#2C5F8D]" : "text-[#CBD5E1]"}`}>
                  <i className="fa-solid fa-lock" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, password: true }))}
                  onBlur={() => setFocused(p => ({ ...p, password: false }))}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-[#F8FAFC] text-[#2C3E50] outline-none transition-all duration-200 placeholder:text-[#CBD5E1] ${
                    errors.password ? "border-[#E74C3C] bg-red-50" : focused.password ? "border-[#2C5F8D] ring-2 ring-[#2C5F8D]/10 bg-white" : "border-[#E2E8F0] hover:border-[#94A3B8]"
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-[#2C5F8D] transition-colors">
                  <i className={`fa-solid fa-${showPassword ? "eye-slash" : "eye"} text-sm`} />
                </button>
              </div>
              {errors.password && <p className="text-xs text-[#E74C3C] flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation" />{errors.password}</p>}
            </div>

            {/* Mot de passe oublié */}
            <div className="text-right -mt-1">
              <Link href="/forgot-password" className="text-xs text-[#2C5F8D] hover:underline font-medium">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading ? "#94A3B8" : "linear-gradient(135deg, #2C5F8D, #1e4a73)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(44, 95, 141, 0.4)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Connexion...</>
              ) : (
                <>Se connecter <i className="fa-solid fa-arrow-right text-xs" /></>
              )}
            </button>

            {/* Séparateur */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#E2E8F0]" />
              <span className="text-xs text-[#94A3B8]">ou</span>
              <div className="flex-1 h-px bg-[#E2E8F0]" />
            </div>

            {/* Lien inscription */}
            <p className="text-center text-sm text-[#64748B]">
              Pas encore de compte ?{" "}
              <Link href="/register" className="text-[#2C5F8D] font-bold hover:underline">
                S'inscrire
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}