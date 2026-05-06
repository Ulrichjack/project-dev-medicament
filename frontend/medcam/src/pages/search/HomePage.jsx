import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import MedicamentCard from '../../components/medicament/MedicamentCard';

const CATEGORIES = [
  { id: 1, name: 'Tous', icon: 'fa-house' },
  { id: 2, name: 'Antidouleurs', icon: 'fa-pills' },
  { id: 3, name: 'Antibiotiques', icon: 'fa-virus' },
  { id: 4, name: 'Vitamines', icon: 'fa-apple-whole' },
  { id: 5, name: 'Dermatologie', icon: 'fa-hand-dots' }
];

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [popularMeds, setPopularMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await medicamentService.getAll(1);
        setPopularMeds(data.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
    
    // Demander la géolocalisation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        localStorage.setItem('user_lat', pos.coords.latitude);
        localStorage.setItem('user_lng', pos.coords.longitude);
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8] p-12 text-center text-white rounded-b-[50px] shadow-xl">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="MEDCAM" className="h-14 brightness-0 invert" />
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
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => navigate(`/search?category_id=${cat.id}`)}
              className="flex-shrink-0 flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-100 hover:border-[#38BDF8] hover:shadow-md transition-all group"
            >
              <i className={`fa-solid ${cat.icon} text-slate-300 group-hover:text-[#38BDF8]`}></i>
              <span className="font-semibold text-slate-600 font-inter">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* POPULAR SECTION */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-montserrat font-bold text-[#1E3A8A]">Médicaments Populaires</h2>
          <button onClick={() => navigate('/search')} className="text-[#38BDF8] font-bold text-sm">Voir tout →</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-200 rounded-2xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularMeds.map(med => (
              <MedicamentCard 
                key={med.id} 
                medicament={med} 
                onClick={() => navigate(`/medicaments/${med.id}`)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;