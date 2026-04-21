// src/services/api.js
// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  FICHIER TEMPORAIRE (mock) — À REMPLACER par le vrai api.js de Sonia
// ─────────────────────────────────────────────────────────────────────────────
// Quand Sonia pousse api.js sur develop :
//   1. git pull origin develop
//   2. Copie son api.js ici (elle utilisera probablement axios)
//   3. Vérifie que BASE_URL correspond à ton backend Laravel
//   4. Supprime ce commentaire
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
/**
 * Wrapper fetch avec gestion d'erreurs et token JWT
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, data) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
