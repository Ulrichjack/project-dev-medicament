import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import PharmacyCard from '../../components/medicament/PharmacyCard';

const MedicamentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [medicament, setMedicament] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Récupérer les détails du médicament
        const medData = await medicamentService.getById(id);
        setMedicament(medData);

        // 2. Récupérer la géolocalisation pour les pharmacies
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const pharmaData = await medicamentService.getPharmacies(id, latitude, longitude);
            setPharmacies(pharmaData);
          },
          async () => {
            // Si l'utilisateur refuse la géoloc, on appelle sans coordonnées
            const pharmaData = await medicamentService.getPharmacies(id);
            setPharmacies(pharmaData);
          }
        );
      } catch (err) {
        setError("Impossible de charger les détails du médicament.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleOrder = (orderInfo) => {
    // Règle d'Ange : Utiliser un state local ou localStorage si cartSlice n'est pas prêt
    const cartItem = {
      medicamentId: medicament.id,
      name: medicament.name,
      ...orderInfo
    };
    
    const currentCart = JSON.parse(localStorage.getItem('medcam_cart') || '[]');
    localStorage.setItem('medcam_cart', JSON.stringify([...currentCart, cartItem]));
    
    alert(`Ajouté au panier : ${medicament.name} chez ${orderInfo.pharmacyName}`);
    navigate('/order/cart'); // Redirection vers le panier d'Ange
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <i className="fa-solid fa-circle-notch fa-spin text-4xl text-[#1E3A8A] mb-4"></i>
      <p className="font-inter text-slate-500">Chargement de la fiche produit...</p>
    </div>
  );

  if (error || !medicament) return (
    <div className="p-10 text-center">
      <p className="text-red-500 font-bold">{error || "Médicament introuvable"}</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-[#1E3A8A] underline">Retour</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F4FF] pb-20">
      {/* HEADER NAVIGATION */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <i className="fa-solid fa-arrow-left text-[#1E293B]"></i>
          </button>
          <h2 className="font-montserrat font-bold text-[#1E293B]">Détails du produit</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION INFOS MÉDICAMENT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0]">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-48 h-48 bg-[#F0F4FF] rounded-2xl flex items-center justify-center shrink-0">
                  {medicament.photo_url ? (
                    <img src={medicament.photo_url} alt={medicament.name} className="h-32 object-contain" />
                  ) : (
                    <i className="fa-solid fa-pills text-7xl text-[#38BDF8]"></i>
                  )}
                </div>
                
                <div className="flex-grow">
                  {medicament.prescription_required && (
                    <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full mb-3 border border-amber-200">
                      ORDONNANCE OBLIGATOIRE
                    </span>
                  )}
                  <h1 className="text-3xl font-montserrat font-bold text-[#1E293B] mb-2">{medicament.name}</h1>
                  <p className="text-[#38BDF8] font-semibold mb-4">{medicament.active_substance}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Dosage</p>
                      <p className="text-sm font-semibold text-slate-700">{medicament.dosage || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Fabricant</p>
                      <p className="text-sm font-semibold text-slate-700 truncate">{medicament.manufacturer}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-montserrat font-bold text-[#1E293B] mb-4 flex items-center">
                  <i className="fa-solid fa-file-lines mr-2 text-[#38BDF8]"></i>
                  Description & Indications
                </h3>
                <p className="text-[#64748B] leading-relaxed text-sm">
                  {medicament.description || "Aucune description détaillée disponible pour ce produit."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION DISPONIBILITÉ (PHARMACIES) */}
          <div className="space-y-6">
            <div className="bg-[#1E3A8A] rounded-3xl p-6 shadow-xl shadow-blue-900/20 text-white">
              <h3 className="font-montserrat font-bold text-lg mb-6 flex items-center">
                <i className="fa-solid fa-truck-fast mr-3 text-[#4ADE80]"></i>
                Disponible près de vous
              </h3>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {pharmacies.length > 0 ? (
                  pharmacies.map((stock, idx) => (
                    <PharmacyCard 
                      key={idx} 
                      pharmacyStock={stock} 
                      onOrder={handleOrder} 
                    />
                  ))
                ) : (
                  <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                    <i className="fa-solid fa-circle-exclamation text-2xl mb-2 text-blue-300"></i>
                    <p className="text-sm text-blue-100">Aucune pharmacie trouvée à proximité.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MedicamentDetailPage;