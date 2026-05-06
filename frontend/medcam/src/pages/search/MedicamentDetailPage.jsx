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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Récupération des infos du médicament
        const med = await medicamentService.getById(id);
        setMedicament(med);
        
        // 2. Récupération de la position stockée (si dispo) pour les pharmacies
        const lat = localStorage.getItem('user_lat');
        const lng = localStorage.getItem('user_lng');
        
        const pharms = await medicamentService.getPharmacies(id, lat, lng);
        setPharmacies(pharms);
      } catch (err) {
        console.error("Erreur lors du chargement des détails:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Fonction pour gérer l'ajout au panier (Logique temporaire)
  const onOrder = (stock) => {
    const cartItem = {
      medId: id,
      name: medicament.name,
      price: stock.price,
      pharmacyName: stock.pharmacy.name,
      qty: 1
    };
    
    // Sauvegarde locale pour le module d'Ange
    const cart = JSON.parse(localStorage.getItem('temp_cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('temp_cart', JSON.stringify(cart));
    
    alert(`✅ ${medicament.name} ajouté au panier !`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E3A8A]"></div>
        <p className="mt-4 text-[#1E3A8A] font-bold font-montserrat">Chargement MEDCAM...</p>
      </div>
    );
  }

  if (!medicament) {
    return (
      <div className="p-20 text-center font-inter">
        <h2 className="text-2xl font-bold text-slate-800">Médicament introuvable</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-[#38BDF8] font-bold underline">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER DE LA PAGE */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto p-6">
          {/* Bouton Retour fonctionnel */}
          <button 
            onClick={() => navigate(-1)} 
            className="text-[#1E3A8A] font-bold flex items-center gap-2 mb-8 hover:translate-x-[-4px] transition-transform duration-200"
          >
            <i className="fa-solid fa-arrow-left"></i> Retour aux résultats
          </button>

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Image du produit */}
            <div className="w-full md:w-1/3 bg-[#F0F4FF] rounded-3xl aspect-square flex items-center justify-center p-6 shadow-inner">
              <img 
                src={medicament.photo_url || '/logo.png'} 
                className="max-h-full object-contain drop-shadow-lg" 
                alt={medicament.name} 
              />
            </div>
            
            {/* Infos principales */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
                <h1 className="text-4xl font-montserrat font-extrabold text-[#1E3A8A] capitalize">
                  {medicament.name}
                </h1>
                {medicament.prescription_required && (
                  <span className="bg-red-100 text-red-600 text-[10px] px-3 py-1 rounded-full font-black border border-red-200 tracking-tighter">
                    ORDONNANCE OBLIGATOIRE
                  </span>
                )}
              </div>

              <p className="text-slate-400 font-medium font-inter mb-4">
                {medicament.active_substance || 'Substance active non précisée'} • {medicament.manufacturer || 'MEDCAM'}
              </p>

              <div className="bg-[#4ADE80]/10 text-[#4ADE80] inline-block px-6 py-2 rounded-2xl font-black text-2xl mb-8">
                À partir de {medicament.price_min} FCFA
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-[#1E3A8A] mb-3 uppercase text-xs tracking-widest">Indications</h3>
                <p className="text-slate-600 leading-relaxed font-inter italic">
                  {medicament.description || "Aucune description détaillée n'est disponible pour ce produit."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION DES PHARMACIES DISPONIBLES */}
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-montserrat font-bold text-[#1E3A8A] flex items-center gap-3">
            <i className="fa-solid fa-map-location-dot text-[#38BDF8]"></i>
            Pharmacies avec stock
          </h2>
          <span className="text-slate-400 text-sm font-medium">
            {pharmacies.length} disponible(s)
          </span>
        </div>
        
        <div className="space-y-4">
          {pharmacies.length > 0 ? (
            pharmacies.map((item, index) => (
              <PharmacyCard 
                key={index} 
                pharmacyStock={item} 
                onOrder={() => onOrder(item)} 
              />
            ))
          ) : (
            <div className="bg-white p-12 rounded-[32px] text-center border-2 border-dashed border-slate-200">
              <i className="fa-solid fa-store-slash text-4xl text-slate-200 mb-4"></i>
              <p className="text-slate-500 font-medium font-inter">
                Ce médicament n'est actuellement pas disponible dans les pharmacies partenaires proches de vous.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicamentDetailPage;