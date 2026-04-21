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