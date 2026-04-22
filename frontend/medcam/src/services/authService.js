import api from './api';

// ─── LOGIN ───────────────────────────────────────────
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

// ─── REGISTER ────────────────────────────────────────
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

// ─── LOGOUT ──────────────────────────────────────────
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (_) {
    // On logout côté client même si l'API échoue
  }
};

// ─── GET ME ──────────────────────────────────────────
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