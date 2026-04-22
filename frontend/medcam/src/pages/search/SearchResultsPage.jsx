import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import MedicamentCard from '../../components/medicament/PharmacyCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category_id');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        let data;
        if (query) {
          data = await medicamentService.search(query, { category_id: categoryId });
        } else {
          data = await medicamentService.getAll(1, { category_id: categoryId });
        }
        setResults(data);
      } catch (err) {
        console.error("Erreur recherche:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query, categoryId]);

  return (
    <div className="min-h-screen bg-[#F0F4FF] pt-10 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête des résultats */}
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-2xl text-[#1E293B]">
            {query ? `Résultats pour "${query}"` : "Tous les médicaments"}
          </h1>
          <p className="text-[#64748B] text-sm mt-1">
            {results.length} produit(s) trouvé(s)
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="h-72 bg-white rounded-2xl animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(med => (
              <MedicamentCard key={med.id} medicament={med} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-[#E2E8F0]">
            <i className="fa-solid fa-search text-6xl text-slate-200 mb-4 block"></i>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Aucun résultat</h3>
            <p className="text-[#64748B]">Essayez de modifier votre recherche ou vos filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;