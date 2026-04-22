import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('choose'); // choose, phone, waiting, success

  const handlePay = () => {
    setStep('waiting');
    // On simule 3 secondes d'attente MTN/Orange Money
    setTimeout(() => setStep('success'), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-8 mt-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 border rounded-xl"><i className="fa-solid fa-arrow-left"></i></button>
        <h1 className="text-xl font-bold">Paiement Commande #{orderId}</h1>
      </div>

      {step === 'choose' && (
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 font-bold mb-2">Choisissez votre opérateur :</p>
          <button onClick={() => { setMethod('mtn'); setStep('phone'); }} className="flex items-center gap-4 p-4 border-2 border-yellow-400 rounded-xl hover:bg-yellow-50">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-black">MTN</div>
            <div className="text-left"><p className="font-bold text-lg">MTN Mobile Money</p><p className="text-sm text-gray-500">67X · 65X · 68X</p></div>
          </button>
          <button onClick={() => { setMethod('orange'); setStep('phone'); }} className="flex items-center gap-4 p-4 border-2 border-orange-500 rounded-xl hover:bg-orange-50">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center font-black">OM</div>
            <div className="text-left"><p className="font-bold text-lg">Orange Money</p><p className="text-sm text-gray-500">69X · 655</p></div>
          </button>
        </div>
      )}

      {step === 'phone' && (
        <div className="bg-white p-6 rounded-xl border">
          <label className="block font-bold mb-2">Numéro de téléphone</label>
          <div className="flex border rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3 font-bold text-gray-600 border-r">+237</span>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="6XX XXX XXX" className="p-3 w-full outline-none font-bold" />
          </div>
          <button onClick={handlePay} className={`w-full mt-6 text-white py-4 rounded-xl font-bold ${method === 'mtn' ? 'bg-yellow-500 text-black' : 'bg-orange-500'}`}>
            Payer maintenant
          </button>
        </div>
      )}

      {step === 'waiting' && (
        <div className="text-center mt-20">
          <i className="fa-solid fa-circle-notch fa-spin text-5xl text-[#2C5F8D] mb-6"></i>
          <h2 className="text-2xl font-bold">Confirmez sur votre téléphone</h2>
          <p className="text-gray-500 mt-2">Un message a été envoyé au +237 {phone}. Veuillez entrer votre code secret PIN.</p>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center mt-20">
          <i className="fa-solid fa-circle-check text-6xl text-green-500 mb-6"></i>
          <h2 className="text-3xl font-black mb-2">Paiement réussi !</h2>
          <p className="text-gray-500 mb-8">La pharmacie prépare votre commande.</p>
          <button onClick={() => navigate('/')} className="bg-[#2C5F8D] text-white px-8 py-4 rounded-xl font-bold w-full">
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}