"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import medicamentService from "../../services/medicamentService";
import Link from "next/link";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Récupère le texte tapé
  const categoryId = searchParams.get("category_id"); // Récupère la catégorie cliquée

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      // On appelle ton service !
      const data = await medicamentService.search(query, { category_id: categoryId });
      setResults(data);
      setLoading(false);
    };
    fetchResults();
  }, [query, categoryId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* En-tête des résultats */}
      <div className="mb-8">
        <Link href="/" className="text-[#2C5F8D] hover:underline mb-4 inline-block">
          <i className="fas fa-arrow-left mr-2"></i> Retour à l'accueil
        </Link>
        <h1 className="text-2xl font-bold text-[#1E293B]">
          {query ? `Résultats pour "${query}"` : "Tous les médicaments"}
        </h1>
        <p className="text-gray-500">{results.length} médicament(s) trouvé(s)</p>
      </div>

      {/* Grille de résultats (Style Startup / Furyroad) */}
      {loading ? (
        <div className="text-center py-20">
          <i className="fas fa-spinner fa-spin text-4xl text-[#2C5F8D]"></i>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((med) => (
            <div key={med.id} className="bg-white border border-[#E8ECF0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square bg-[#F8FAFC] rounded-xl mb-4 flex items-center justify-center">
                 <i className="fas fa-pills text-4xl text-[#2C5F8D] opacity-20"></i>
              </div>
              
              {med.prescription_required && (
                <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded uppercase mb-2 inline-block">
                  Sur ordonnance
                </span>
              )}
              
              <h3 className="font-bold text-lg text-[#1E293B]">{med.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{med.brand}</p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-[#27AE60]">{med.price_min} FCFA</span>
                <Link 
                  href={`/medicaments/${med.id}`}
                  className="bg-[#2C5F8D] text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}