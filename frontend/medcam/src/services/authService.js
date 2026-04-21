const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Helper pour les headers
const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Helper pour gérer les réponses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Une erreur est survenue");
  }
  return data;
};

// Login
export const login = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

// Register
export const register = async ({ name, email, password, password_confirmation }) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });
  return handleResponse(response);
};

// Logout
export const logoutApi = async (token) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: getHeaders(token),
  });
  return handleResponse(response);
};

// Récupérer le profil utilisateur connecté
export const getMe = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return handleResponse(response);
};

// Mettre à jour le profil
export const updateProfile = async (token, data) => {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};