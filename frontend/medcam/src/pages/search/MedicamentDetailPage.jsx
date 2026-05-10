import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // <-- IMPORT REDUX
import { addItem } from '../../store/cartSlice'; // <-- IMPORT ACTION PANIER
import medicamentService from '../../services/medicamentService';
import PharmacyCard from '../../components/medicament/PharmacyCard';
import { addToast } from '../../store/toastSlice';
import { selectCartPharmacy } from '../../store/cartSlice';
import { useSelector } from 'react-redux';

const MedicamentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // <-- INITIALISATION REDUX
  
  const [medicament, setMedicament] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const med = await medicamentService.getById(id);
        setMedicament(med);
        
        const lat = localStorage.getItem('user_lat');
        const lng = localStorage.getItem('user_lng');
        const pharms = await medicamentService.getPharmacies(id, lat, lng);
        setPharmacies(pharms);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const currentCart = useSelector(selectCartPharmacy);

  // LA VRAIE LOGIQUE DU PANIER (SÉCURISÉE AVEC TOAST)
  const onOrder = (stock) => {
    const pName = stock?.pharmacy?.name || stock?.name || 'Pharmacie';
    const pId = stock?.pharmacy?.id || stock?.id || 1;
    const pPrice = stock?.price || stock?.pivot?.price || stock?.unit_price || 0;

    // VÉRIFICATION : Est-ce qu'on change de pharmacie ?
    if (currentCart.pharmacyId && currentCart.pharmacyId !== pId && currentCart.items.length > 0) {
      dispatch(addToast({ 
        type: 'error', 
        message: "Action impossible. Videz d'abord votre panier pour changer de pharmacie !" 
      }));
      return; // On bloque l'ajout !
    }

    dispatch(addItem({
      medicamentId: medicament.id,
      medicamentName: medicament.name,
      photo_url: medicament.photo_url,
      pharmacyId: pId,        
      pharmacyName: pName,    
      price: pPrice,          
      quantity: 1
    }));
    
    dispatch(addToast({ type: 'success', message: `${medicament.name} ajouté au panier !` }));
  };


  if (loading) return <div className="p-20 text-center animate-pulse text-[#1E3A8A] font-bold">Chargement MEDCAM...</div>;
  if (!medicament) return <div className="p-20 text-center font-bold">Produit introuvable.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto p-6">
          <button 
            onClick={() => navigate(-1)} 
            className="text-[#1E3A8A] font-bold flex items-center gap-2 mb-6 hover:translate-x-[-4px] transition-transform"
          >
            <i className="fa-solid fa-arrow-left"></i> Retour
          </button>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/3 bg-[#F0F4FF] rounded-3xl aspect-square flex items-center justify-center p-8">
              <img src={medicament.photo_url || '/logo.svg'} className="max-h-full object-contain" alt={medicament.name} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-montserrat font-extrabold text-[#1E3A8A] capitalize">{medicament.name}</h1>
                {medicament.prescription_required && (
                  <span className="bg-red-50 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold border border-red-100 uppercase">ORDONNANCE</span>
                )}
              </div>
              <p className="text-slate-400 font-medium mb-4">{medicament.active_substance} • {medicament.manufacturer}</p>
              <div className="bg-[#4ADE80]/10 text-[#4ADE80] inline-block px-4 py-2 rounded-xl font-bold text-xl mb-6">
                À partir de {medicament.price_min} FCFA
              </div>
              <p className="text-slate-600 leading-relaxed font-inter">{medicament.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-montserrat font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
          <i className="fa-solid fa-map-location-dot text-[#38BDF8]"></i>
          Pharmacies à proximité
        </h2>
        
        <div className="space-y-4">
          {pharmacies.length > 0 ? (
            pharmacies.map((item, idx) => (
              <PharmacyCard key={idx} pharmacyStock={item} onOrder={() => onOrder(item)} />
            ))
          ) : (
            <div className="bg-white p-10 rounded-3xl text-center border-2 border-dashed border-slate-100">
              <p className="text-slate-400 italic">Aucune pharmacie trouvée pour ce médicament.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicamentDetailPage;