import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import MedicamentCard from '../../components/medicament/MedicamentCard';

const CATEGORIES = [
  { id: null, name: 'Tous', icon: 'fa-house' },
  { id: 2, name: 'Antidouleurs', icon: 'fa-pills' },
  { id: 1, name: 'Antibiotiques', icon: 'fa-virus' }, // Vérifie tes IDs de BDD
  { id: 3, name: 'Vitamines', icon: 'fa-apple-whole' },
  { id: 4, name: 'Cardio', icon: 'fa-heart-pulse' }
];

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [medicaments, setMedicaments] = useState([]); // Remplace popularMeds
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Charge les médicaments au démarrage (ou selon une catégorie)
  const fetchMeds = async (searchQuery = '', categoryId = null) => {
    setLoading(true);
    try {
      if (searchQuery || categoryId) {
        setIsSearching(true);
        const data = await medicamentService.search(searchQuery, { category_id: categoryId });
        setMedicaments(data);
      } else {
        setIsSearching(false);
        const data = await medicamentService.getAll(1);
        setMedicaments(data.slice(0, 6)); // Affiche juste les 6 premiers par défaut
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeds();
    
    // Demander la géolocalisation pour le calcul de distance plus tard
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        localStorage.setItem('user_lat', pos.coords.latitude);
        localStorage.setItem('user_lng', pos.coords.longitude);
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeds(query); // Cherche sans changer de page
  };

  const handleCategoryClick = (categoryId) => {
    setQuery(''); // On vide le texte si on clique sur une catégorie
    fetchMeds('', categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8] p-12 text-center text-white rounded-b-[50px] shadow-xl">
        <div className="flex justify-center mb-2">
            <img src="/logo.svg" alt="MEDCAM" className="w-24 h-20 object-contain" />
        </div>
        <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-4">
          La pharmacie à portée de main
        </h1>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative mt-8">
          <input 
            className="w-full p-5 pl-14 rounded-2xl text-black shadow-2xl outline-none focus:ring-4 ring-[#4ADE80]/50 transition-all font-inter"
            placeholder="Rechercher un médicament (ex: Paracétamol...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1E293B]">
            Trouver
          </button>
        </form>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-xl font-montserrat font-bold text-[#1E3A8A] mb-6">Catégories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat, index) => (
            <button 
              key={index}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex-shrink-0 flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-100 hover:border-[#38BDF8] hover:shadow-md transition-all group"
            >
              <i className={`fa-solid ${cat.icon} text-slate-300 group-hover:text-[#38BDF8]`}></i>
              <span className="font-semibold text-slate-600 font-inter">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RÉSULTATS SECTION */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-montserrat font-bold text-[#1E3A8A]">
            {isSearching ? `Résultats de recherche (${medicaments.length})` : 'Médicaments Populaires'}
          </h2>
          {isSearching && (
             <button onClick={() => fetchMeds()} className="text-red-500 font-bold text-sm hover:underline">
               X Annuler la recherche
             </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-slate-200 rounded-2xl"></div>)}
          </div>
        ) : medicaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {medicaments.map(med => (
              <MedicamentCard 
                key={med.id} 
                medicament={med} 
                // LA CORRECTION DU LIEN EST ICI :
                onClick={() => navigate(`/medicaments/${med.id}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">Aucun médicament trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;