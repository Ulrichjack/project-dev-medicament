import React from 'react';

export default function PharmacyCard({ pharmacyStock, onOrder }) {
  // On sécurise la lecture des données peu importe la structure renvoyée par le backend
  const pharmacyName = pharmacyStock?.pharmacy?.name || pharmacyStock?.name || 'Pharmacie partenaire';
  const price = pharmacyStock?.price || pharmacyStock?.pivot?.price || pharmacyStock?.unit_price || 0;
  const address = pharmacyStock?.pharmacy?.address || pharmacyStock?.address || 'Adresse non spécifiée';
  
  // S'il y a une distance calculée par le backend
  const distance = pharmacyStock?.distance ? `${parseFloat(pharmacyStock.distance).toFixed(1)} km` : '';

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#38BDF8] transition-colors group">
      <div>
        <h3 className="font-bold text-[#1E3A8A] text-lg flex items-center gap-2">
          <i className="fa-solid fa-store text-[#38BDF8] text-sm"></i>
          {pharmacyName}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          <i className="fa-solid fa-location-dot w-4"></i> {address} {distance && `(à ${distance})`}
        </p>
        <p className="text-[#4ADE80] font-black text-xl mt-2">
          {price} FCFA
        </p>
      </div>
      
      <button 
        onClick={onOrder}
        className="bg-[#EBF4FF] text-[#1E3A8A] font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1E3A8A] hover:text-white transition-colors flex-shrink-0"
      >
        <i className="fa-solid fa-cart-plus"></i>
        Ajouter
      </button>
    </div>
  );
}