import api from './api';

const medicamentService = {
    // 1. Récupérer tous les médicaments (avec pagination)
    getAll: async (page = 1) => {
        const response = await api.get(`/medicaments?page=${page}`);
        return response.data.data || response.data; 
    },

    // 2. Rechercher un médicament par son nom
    search: async (query, filters = {}) => {
        let url = `/medicaments/search?q=${query}`;
        if (filters.category_id) {
            url += `&category_id=${filters.category_id}`;
        }
        const response = await api.get(url);
        return response.data.data || response.data;
    },

    // 3. Obtenir les détails complets d'un médicament spécifique
    getById: async (id) => {
        const response = await api.get(`/medicaments/${id}`);
        return response.data.data || response.data;
    },

    // 4. Trouver les pharmacies qui vendent ce médicament (avec localisation)
    getPharmacies: async (id, lat, lng) => {
        const response = await api.get(`/medicaments/${id}/pharmacies`, {
            params: { latitude: lat, longitude: lng }
        });
        return response.data.data || response.data;
    },

    // 5. Récupérer la liste des catégories pour les filtres
    getCategories: async () => {
        const response = await api.get('/categories');
        return response.data.data || response.data;
    }
};

export default medicamentService;