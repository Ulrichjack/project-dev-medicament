"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { setCredentials, setError } from "@/store/authSlice";
import { register } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { score: 0, label: "", color: "" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { score, label: "Faible", color: "#E74C3C" };
    if (score === 2) return { score, label: "Moyen", color: "#F39C12" };
    if (score === 3) return { score, label: "Bon", color: "#27AE60" };
    return { score, label: "Excellent", color: "#1e8449" };
  };

  const strength = getPasswordStrength();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Le nom est requis";
    else if (formData.name.length < 2) newErrors.name = "Minimum 2 caractères";
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 8) newErrors.password = "Minimum 8 caractères";
    if (!formData.password_confirmation) newErrors.password_confirmation = "Confirmez votre mot de passe";
    else if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      const data = await register(formData);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push("/");
    } catch (err) {
      setGlobalError(err.message || "Une erreur est survenue lors de l'inscription");
      dispatch(setError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) => `
    w-full px-4 py-3 pl-11 pr-11 rounded-xl border text-sm text-[#2C3E50]
    bg-white outline-none transition-all duration-200
    placeholder:text-[#B0BEC5]
    ${errors[name]
      ? "border-[#E74C3C] bg-red-50 focus:ring-2 focus:ring-[#E74C3C]/20"
      : focused[name]
      ? "border-[#2C5F8D] ring-2 ring-[#2C5F8D]/15 shadow-sm"
      : "border-[#E2E8F0] hover:border-[#94A3B8]"
    }
  `;

  return (
    <div className="min-h-screen flex">

      {/* Panneau gauche — illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e8449 0%, #27AE60 50%, #2ecc71 100%)" }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 left-1/4 w-96 h-96 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-16">
            <img src="/logo.png" alt="MEDCAM" className="h-10 w-auto brightness-0 invert" />
            <span className="text-2xl font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>
              MEDCAM
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Rejoignez<br />la communauté.
          </h1>
          <p className="text-white/70 text-lg mb-12 leading-relaxed">
            Créez votre compte en quelques secondes et accédez à toute notre gamme de services pharmaceutiques.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { icon: "fa-user-check", text: "Inscription gratuite et rapide" },
              { icon: "fa-bell", text: "Alertes sur vos médicaments favoris" },
              { icon: "fa-clock-rotate-left", text: "Historique complet de vos commandes" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${f.icon} text-white text-sm`} />
                </div>
                <span className="text-white/80 text-sm">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
            {[
              { value: "10k+", label: "Utilisateurs" },
              { value: "500+", label: "Médicaments" },
              { value: "98%", label: "Satisfaction" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>{s.value}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#F8FAFC] overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <img src="/logo.png" alt="MEDCAM" className="h-8 w-auto" />
            <span className="text-xl font-bold text-[#2C5F8D]" style={{ fontFamily: "Montserrat, sans-serif" }}>
              MEDCAM
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1A2B3C] mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Créer un compte ✨
            </h2>
            <p className="text-[#64748B] text-sm">
              Remplissez le formulaire pour commencer
            </p>
          </div>

          {/* Erreur globale */}
          {globalError && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-[#E74C3C]"
              style={{ animation: "fadeIn 0.3s ease" }}>
              <i className="fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0" />
              <span>{globalError}</span>
            </div>
          )}

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Nom */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">
                  Nom complet <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm transition-colors ${focused.name || formData.name ? "text-[#2C5F8D]" : "text-[#94A3B8]"}`}>
                    <i className="fa-solid fa-user" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused(p => ({ ...p, name: true }))}
                    onBlur={() => setFocused(p => ({ ...p, name: false }))}
                    className={inputClass("name")}
                  />
                  {formData.name.length >= 2 && !errors.name && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#27AE60] text-sm">
                      <i className="fa-solid fa-circle-check" />
                    </span>
                  )}
                </div>
                {errors.name && (
                  <p className="text-xs text-[#E74C3C] flex items-center gap-1">
                    <i className="fa-solid fa-triangle-exclamation" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">
                  Adresse email <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm transition-colors ${focused.email || formData.email ? "text-[#2C5F8D]" : "text-[#94A3B8]"}`}>
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused(p => ({ ...p, email: true }))}
                    onBlur={() => setFocused(p => ({ ...p, email: false }))}
                    className={inputClass("email")}
                  />
                  {formData.email && /\S+@\S+\.\S+/.test(formData.email) && !errors.email && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#27AE60] text-sm">
                      <i className="fa-solid fa-circle-check" />
                    </span>
                  )}
                </div>
                {errors.email && (
                  <p className="text-xs text-[#E74C3C] flex items-center gap-1">
                    <i className="fa-solid fa-triangle-exclamation" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">
                  Mot de passe <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm transition-colors ${focused.password || formData.password ? "text-[#2C5F8D]" : "text-[#94A3B8]"}`}>
                    <i className="fa-solid fa-lock" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 caractères"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused(p => ({ ...p, password: true }))}
                    onBlur={() => setFocused(p => ({ ...p, password: false }))}
                    className={inputClass("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#2C5F8D] transition-colors"
                  >
                    <i className={`fa-solid fa-${showPassword ? "eye-slash" : "eye"} text-sm`} />
                  </button>
                </div>

                {/* Barre de force */}
                {formData.password && (
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-1.5 flex-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: i <= strength.score ? strength.color : "#E2E8F0",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: strength.color }}>
                      Force du mot de passe : {strength.label}
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="text-xs text-[#E74C3C] flex items-center gap-1">
                    <i className="fa-solid fa-triangle-exclamation" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirmation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">
                  Confirmer le mot de passe <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm transition-colors ${focused.password_confirmation || formData.password_confirmation ? "text-[#2C5F8D]" : "text-[#94A3B8]"}`}>
                    <i className="fa-solid fa-lock" />
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="Répétez votre mot de passe"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    onFocus={() => setFocused(p => ({ ...p, password_confirmation: true }))}
                    onBlur={() => setFocused(p => ({ ...p, password_confirmation: false }))}
                    className={inputClass("password_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#2C5F8D] transition-colors"
                  >
                    <i className={`fa-solid fa-${showConfirm ? "eye-slash" : "eye"} text-sm`} />
                  </button>
                </div>
                {formData.password_confirmation && formData.password === formData.password_confirmation && (
                  <p className="text-xs text-[#27AE60] flex items-center gap-1">
                    <i className="fa-solid fa-circle-check" /> Les mots de passe correspondent
                  </p>
                )}
                {errors.password_confirmation && (
                  <p className="text-xs text-[#E74C3C] flex items-center gap-1">
                    <i className="fa-solid fa-triangle-exclamation" /> {errors.password_confirmation}
                  </p>
                )}
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 mt-1"
                style={{
                  background: loading ? "#94A3B8" : "linear-gradient(135deg, #27AE60, #1e8449)",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 4px 15px rgba(39, 174, 96, 0.35)",
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Lien connexion */}
          <p className="text-center text-sm text-[#64748B] mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-[#2C5F8D] font-semibold hover:underline">
              Se connecter
            </Link>
          </p>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}