// import api from './api'; // Commenté car on utilise des fausses données pour l'instant

const MOCK_MEDICAMENTS = [
    { id: 1, name: "Paracétamol Biogaran 500mg", brand: "Biogaran", category_id: 2, price_min: 500, pharmacies_count: 3, prescription_required: false },
    { id: 2, name: "Amoxicilline 1g", brand: "Sandoz", category_id: 1, price_min: 2500, pharmacies_count: 5, prescription_required: true }
];

const medicamentService = {
    // Recherche
    search: async (query = "", filters = {}) => {
        console.log(`[API] Searching for: "${query}" with filters:`, filters); // <-- On utilise filters ici pour le linter
        
        let results = MOCK_MEDICAMENTS;
        if (query) {
            results = results.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
        }
        
        // Si on a un filtre de catégorie
        if (filters.category_id) {
            results = results.filter(m => m.category_id === parseInt(filters.category_id));
        }
        
        return results; // Simulation (On appellera "await api.get(...)" plus tard)
    },
    
    // Catégories
    getCategories: async () => {
        return [
            { id: 1, name: "Antibiotiques", icon: "fa-bacteria" },
            { id: 2, name: "Antidouleurs", icon: "fa-hand-holding-medical" },
            { id: 3, name: "Vitamines", icon: "fa-apple-whole" },
            { id: 4, name: "Cardio", icon: "fa-heart-pulse" }
        ];
    }
};

export default medicamentService;