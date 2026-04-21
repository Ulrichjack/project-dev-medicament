"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Le nom est requis";
    } else if (formData.name.length < 2) {
      newErrors.name = "Minimum 2 caractères";
    }
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 caractères";
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Confirmez votre mot de passe";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#27AE60] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user-plus text-white text-2xl" />
            </div>
            <h1
              className="text-2xl font-bold text-[#2C3E50]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Créer un compte
            </h1>
            <p className="text-sm text-[#7F8C8D] mt-1">
              Rejoignez PharmApp dès aujourd'hui
            </p>
          </div>

          {/* Erreur globale */}
          {globalError && (
            <div className="mb-4 p-3 bg-red-50 border border-[#E74C3C] rounded-xl flex items-center gap-2 text-sm text-[#E74C3C]">
              <i className="fa-solid fa-circle-exclamation" />
              {globalError}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nom complet"
              type="text"
              name="name"
              id="name"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon="user"
              required
            />

            <Input
              label="Adresse email"
              type="email"
              name="email"
              id="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon="envelope"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              placeholder="Minimum 8 caractères"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon="lock"
              required
            />

            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Répétez votre mot de passe"
              value={formData.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
              icon="lock"
              required
            />

            <Button
              type="submit"
              variant="success"
              size="md"
              loading={loading}
              className="w-full mt-2"
            >
              Créer mon compte
            </Button>
          </form>

          {/* Lien connexion */}
          <p className="text-center text-sm text-[#7F8C8D] mt-6">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-[#2C5F8D] font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}