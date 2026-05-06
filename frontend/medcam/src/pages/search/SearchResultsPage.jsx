import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import MedicamentCard from '../../components/medicament/MedicamentCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Récupère le texte cherché
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        if (query) {
          const data = await medicamentService.search(query);
          setResults(data);
        }
      } catch (err) {
        console.error("Erreur recherche:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#1E3A8A] font-medium mb-8 hover:underline"
        >
          ← Retour à l'accueil
        </button>

        <h1 className="text-3xl font-montserrat font-bold text-[#1E3A8A] mb-2">
          Résultats pour "{query}"
        </h1>
        <p className="text-gray-500 mb-8">{results.length} médicament(s) trouvé(s)</p>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Recherche en cours...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map(med => (
              <MedicamentCard 
                key={med.id} 
                medicament={med} 
                onClick={() => navigate(`/medicament/${med.id}`)} 
              />
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">Désolé, aucun médicament ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
