import React from 'react';

const MedicamentCard = ({ medicament, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all cursor-pointer overflow-hidden group"
    >
      {/* Zone Image avec Badge Ordonnance */}
      <div className="bg-[#F0F4FF] h-40 flex items-center justify-center relative">
        <img 
          src={medicament.photo_url || '/logo.png'} 
          className="h-24 object-contain group-hover:scale-110 transition-transform duration-300" 
          alt={medicament.name} 
        />
        {medicament.prescription_required && (
          <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-200">
            Ordonnance
          </span>
        )}
      </div>

      {/* Informations */}
      <div className="p-5">
        <h3 className="font-montserrat font-bold text-[#1E293B] text-lg mb-1 truncate capitalize">
          {medicament.name}
        </h3>
        <p className="text-[#4ADE80] font-bold font-inter">
          À partir de {medicament.price_min} FCFA
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <i className="fa-solid fa-store"></i>
            <span>{medicament.pharmacies_count || 1} dispos</span>
          </div>
          <button className="text-[#38BDF8] text-sm font-semibold group-hover:underline">
            Détails →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicamentCard;