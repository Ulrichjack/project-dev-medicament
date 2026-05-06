import api from './api';

const medicamentService = {
    // 1. Récupérer tous les médicaments (avec pagination)
    getAll: async (page = 1) => {
        const response = await api.get(`/medicaments?page=${page}`);
        // On retourne response.data.data car le backend enveloppe les résultats dans un objet data
        return response.data.data; 
    },

    // 2. Rechercher un médicament par son nom (utilisé dans la barre de recherche)
    search: async (query) => {
        const response = await api.get(`/medicaments/search?q=${query}`);
        return response.data.data;
    },

    // 3. Obtenir les détails complets d'un médicament spécifique
    getById: async (id) => {
        const response = await api.get(`/medicaments/${id}`);
        return response.data.data;
    },

    // 4. Trouver les pharmacies qui vendent ce médicament (avec localisation)
    getPharmacies: async (id, lat, lng) => {
        const response = await api.get(`/medicaments/${id}/pharmacies`, {
            params: { latitude: lat, longitude: lng }
        });
        return response.data.data;
    },

    // 5. Récupérer la liste des catégories pour les filtres
    getCategories: async () => {
        const response = await api.get('/categories');
        return response.data.data;
    }
};

export default medicamentService;