import React from 'react';

const PharmacyCard = ({ pharmacy, onOrder }) => {
  // On récupère les infos de la pharmacie et le premier produit trouvé (le médicament concerné)
  const { name, address, is_open, products } = pharmacy;
  const productInfo = products && products[0];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4 flex flex-col md:flex-row md:items-center justify-between hover:border-[#38BDF8] transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-montserrat font-bold text-[#1E3A8A] text-lg">{name}</h4>
          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${is_open ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {is_open ? '🟢 Ouvert' : '🔴 Fermé'}
          </span>
        </div>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {address}
        </p>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-6">
        <div className="text-right">
          <p className="text-[#4ADE80] font-bold text-xl">{productInfo?.price || '---'} FCFA</p>
          <p className={`text-xs font-medium ${productInfo?.is_available ? 'text-blue-400' : 'text-red-400'}`}>
            {productInfo?.is_available ? `En stock (${productInfo.quantity})` : 'En rupture'}
          </p>
        </div>
        
        <button 
          onClick={onOrder}
          disabled={!productInfo?.is_available}
          className={`px-6 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            !productInfo?.is_available 
            ? 'bg-gray-300 cursor-not-allowed shadow-none' 
            : 'bg-[#1E3A8A] hover:bg-[#38BDF8] active:scale-95'
          }`}
        >
          Commander ici
        </button>
      </div>
    </div>
  );
};

export default PharmacyCard;