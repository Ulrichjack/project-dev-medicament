<<<<<<< HEAD
import api from './api';

// Login
export const login = async (email, password) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data.data; // { user, token }
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) throw new Error('Email ou mot de passe incorrect');
    if (status === 422) throw error.response.data.errors;
    throw new Error('Erreur serveur, réessayez');
  }
};

// Register
export const register = async (formData) => {
  try {
    const { data } = await api.post('/auth/register', formData);
    return data.data; // { user, token }
  } catch (error) {
    const status = error.response?.status;
    if (status === 422) throw error.response.data.errors;
    throw new Error('Erreur serveur, réessayez');
  }
};

// Logout
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (_) {
    // On logout quand même même si l'API échoue
  }
};

// Récupérer l'utilisateur connecté
export const getMe = async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) throw new Error('Non authentifié');
    throw new Error('Erreur serveur, réessayez');
  }
};
=======
// TODO: remplacer par l'import de Sonia quand api.js sera disponible
// import api from './api'

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── LOGIN ───────────────────────────────────────────
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data // { user, token }
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Email ou mot de passe incorrect')
    }
    throw error
  }
}

// ─── REGISTER ────────────────────────────────────────
export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data)
    return response.data // { user, token }
  } catch (error) {
    if (error.response?.status === 422) {
      throw error.response.data // erreurs de validation Laravel
    }
    throw error
  }
}

// ─── LOGOUT ──────────────────────────────────────────
export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    // On ignore les erreurs de logout
  }
}

// ─── GET ME ──────────────────────────────────────────
export const getMe = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data // { user }
  } catch (error) {
    throw error
  }
}
>>>>>>> 2efd25f2ba624b0a24d81e6fc4b158ba14e1e4b8
