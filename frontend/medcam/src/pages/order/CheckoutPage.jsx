import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartTotal, clearCart } from '../../store/cartSlice';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector(selectCartTotal);
  const [address, setAddress] = useState('');
  
  const grandTotal = total + 500; // 500 = frais de livraison fixes

  const handleSubmit = () => {
    if (!address.trim()) return alert("Veuillez entrer une adresse !");
    // On simule la création de la commande (ID 123)
    dispatch(clearCart());
    navigate('/payment/123');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-32">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white border rounded-xl flex items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold">Livraison</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border mb-6">
        <label className="block font-bold mb-2">Adresse complète *</label>
        <textarea 
          className="w-full border rounded-lg p-3 outline-none focus:border-[#2C5F8D]" 
          rows="3" 
          placeholder="Ex: Rue des Palmiers, face au carrefour..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="mt-4 flex items-center gap-2 text-[#2C5F8D] font-bold bg-[#EBF4FF] p-3 rounded-lg w-full justify-center">
          <i className="fa-solid fa-location-dot"></i> Utiliser ma position GPS
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-2xl mx-auto">
          <button onClick={handleSubmit} className="w-full bg-[#2C5F8D] text-white py-4 rounded-xl font-bold text-lg">
            <i className="fa-solid fa-lock"></i> Confirmer et Payer · {grandTotal.toLocaleString()} FCFA
          </button>
        </div>
      </div>
    </div>
  );
}