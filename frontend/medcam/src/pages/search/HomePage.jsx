import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import MedicamentCard from '../../components/medicament/PharmacyCard';
import MedicamentCard from "../../components/PharmacyCard"; 
// Enlève "/medicament/" si le fichier est directement dans components
const HomePage = () => {
  const [query, setQuery] = useState('');
  const [popularMeds, setPopularMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await medicamentService.getAll();
        setPopularMeds(data.slice(0, 8)); // On prend les 8 premiers
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION HERO */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8] pt-20 pb-32 px-4 relative overflow-hidden">
        {/* Cercles décoratifs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <img src="/logo.png" alt="MEDCAM" className="h-16 mx-auto mb-6 brightness-0 invert" />
          <h1 className="font-montserrat font-bold text-3xl md:text-5xl text-white mb-4">
            La pharmacie à portée de main
          </h1>
          <p className="text-blue-100 mb-10 font-inter">Commandez vos médicaments et faites-vous livrer partout au Cameroun.</p>

          {/* Barre de recherche style Furyroad */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex p-2 bg-white rounded-2xl shadow-2xl">
            <div className="flex-grow flex items-center px-4">
              <i className="fa-solid fa-magnifying-glass text-slate-400 mr-3"></i>
              <input 
                type="text" 
                className="w-full py-3 focus:outline-none text-slate-700"
                placeholder="Rechercher un médicament (ex: Paracétamol...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-colors">
              Trouver
            </button>
          </form>
        </div>
      </section>

      {/* SECTION MÉDICAMENTS POPULAIRES */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 pb-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-montserrat font-bold text-xl text-[#1E293B]">Médicaments populaires</h2>
            <button onClick={() => navigate('/search')} className="text-[#38BDF8] font-semibold text-sm hover:underline">
              Voir tout <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-64 bg-slate-100 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularMeds.map(med => (
                <MedicamentCard key={med.id} medicament={med} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;