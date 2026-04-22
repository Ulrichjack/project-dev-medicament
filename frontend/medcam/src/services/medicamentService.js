import api from './api';

const medicamentService = {
  // Récupérer tous les médicaments (avec pagination)
  getAll: async (page = 1, filters = {}) => {
    const response = await api.get('/medicaments', { 
      params: { page, ...filters } 
    });
    return response.data.data; // Retourne l'objet contenant { data: [...], total, etc. }
  },

  // Recherche textuelle
  search: async (query, filters = {}) => {
    const response = await api.get('/medicaments/search', { 
      params: { q: query, ...filters } 
    });
    return response.data.data;
  },

  // Détails d'un médicament
  getById: async (id) => {
    const response = await api.get(`/medicaments/${id}`);
    return response.data.data;
  },

  // Pharmacies disposant du stock
  getPharmacies: async (id, lat, lng) => {
    const response = await api.get(`/medicaments/${id}/pharmacies`, {
      params: { latitude: lat, longitude: lng }
    });
    return response.data.data;
  }
};

export default medicamentService;