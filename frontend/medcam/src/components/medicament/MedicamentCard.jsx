import React from 'react';
import { useNavigate } from 'react-router-dom';

const PharmacyCard = ({ pharmacyStock, onOrder }) => {
  const { pharmacy, price, quantity, distance_km, is_open } = pharmacyStock;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 hover:border-[#38BDF8] transition-all group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-montserrat font-bold text-[#1E293B] text-sm uppercase">
          {pharmacy.name}
        </h4>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          is_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {is_open ? 'OUVERT' : 'FERMÉ'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-xs text-[#64748B] flex items-center truncate">
          <i className="fa-solid fa-location-dot text-[#38BDF8] mr-2 w-3"></i>
          {pharmacy.address}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#64748B] flex items-center">
            <i className="fa-solid fa-route text-[#38BDF8] mr-2 w-3"></i>
            {distance_km < 1 ? '< 1 km' : `${distance_km.toFixed(1)} km`}
          </p>
          <p className="text-[10px] text-slate-400">
            Stock: <span className="font-semibold">{quantity} unité(s)</span>
          </p>
        </div>
      </div>
         <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h3 className="font-bold text-lg">{medicament.name}</h3>
      <p className="text-gray-600">{medicament.dosage}</p>
      
      {/* Le bouton qui doit fonctionner */}
      <button 
        onClick={() => navigate(`/medicaments/${medicament.id}`)}
        className="mt-4 w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
      >
        Détails du produit
      </button>
    </div>
  
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <span className="text-lg font-bold text-[#1E3A8A]">
          {price.toLocaleString()} <span className="text-xs font-medium">FCFA</span>
        </span>
        <button 
          onClick={() => onOrder({
            pharmacyId: pharmacy.id, 
            pharmacyName: pharmacy.name, 
            price
          })}
          className="bg-[#1E3A8A] hover:bg-[#38BDF8] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          <i className="fa-solid fa-cart-plus mr-2"></i>
          Commander
        </button>
      </div>
    </div>
  );
};

export default PharmacyCard;
        