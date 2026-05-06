// src/pages/order/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import orderService from '../../services/orderService';

const STEPS = {
  CHOOSE: 'choose',
  PHONE: 'phone',
  PAYING: 'paying',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const METHODS = {
  mtn_mobile_money: {
    label: 'MTN Mobile Money',
    sub: 'Numéros 67X · 65X · 68X',
    bg: 'bg-[#FFCC00]',
    text: 'text-black',
    border: 'border-yellow-400',
    hover: 'hover:bg-yellow-50',
    shortKey: 'MTN',
  },
  orange_money: {
    label: 'Orange Money',
    sub: 'Numéros 69X · 655',
    bg: 'bg-[#FF6600]',
    text: 'text-white',
    border: 'border-orange-500',
    hover: 'hover:bg-orange-50',
    shortKey: 'OM',
  },
};

const fmt = (n) => n?.toLocaleString('fr-FR') + ' FCFA';

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(STEPS.CHOOSE);
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [amount, setAmount] = useState(null);
  const [loadingAmount, setLoadingAmount] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Charger le montant de la commande
  useEffect(() => {
    orderService
      .getOrderById(orderId)
      .then((order) => setAmount(order.total_amount || order.amount || order.total))
      .catch(() => setAmount(null))
      .finally(() => setLoadingAmount(false));
  }, [orderId]);

  // Validation numéro
  const validatePhone = (num) => {
    const clean = num.replace(/\s/g, '');
    if (!clean) return 'Numéro requis';
    if (!/^6[0-9]{8}$/.test(clean)) return 'Format invalide — ex: 677 123 456';
    return '';
  };

  // Payer — appel direct sans polling
  const handlePay = async () => {
    const err = validatePhone(phone);
    if (err) { setPhoneError(err); return; }
    setPhoneError('');
    setStep(STEPS.PAYING);

    try {
      await paymentService.pay(orderId, method, phone.replace(/\s/g, ''));
      // Si la réponse ne lève pas d'erreur → succès
      setStep(STEPS.SUCCESS);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Paiement échoué. Vérifiez votre solde.';
      setErrorMessage(msg);
      setStep(STEPS.FAILED);
    }
  };

  const handleRetry = () => {
    setPhone('');
    setPhoneError('');
    setMethod(null);
    setErrorMessage('');
    setStep(STEPS.CHOOSE);
  };

  const m = method ? METHODS[method] : null;

  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          {(step === STEPS.CHOOSE || step === STEPS.PHONE) ? (
            <button
              onClick={() => step === STEPS.PHONE ? setStep(STEPS.CHOOSE) : navigate(-1)}
              className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center hover:bg-slate-50 text-[#64748B] text-sm"
            >
              <i className="fa-solid fa-arrow-left" />
            </button>
          ) : <div className="w-9" />}
          <p className="font-bold text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Paiement
          </p>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">

        {/* Montant */}
        {step !== STEPS.SUCCESS && step !== STEPS.FAILED && (
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Montant à payer
            </p>
            {loadingAmount ? (
              <div className="h-10 w-36 bg-slate-100 rounded-xl mx-auto animate-pulse" />
            ) : (
              <p className="text-4xl font-black text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {amount ? fmt(amount) : '—'}
              </p>
            )}
          </div>
        )}

        {/* ÉTAPE 1 — Choisir l'opérateur */}
        {step === STEPS.CHOOSE && (
          <div className="space-y-3">
            <p className="text-center text-sm font-semibold text-[#64748B] mb-4">
              Choisissez votre opérateur
            </p>
            {Object.entries(METHODS).map(([key, info]) => (
              <button
                key={key}
                onClick={() => { setMethod(key); setStep(STEPS.PHONE); }}
                className={`w-full flex items-center gap-4 bg-white border-2 ${info.border}
                  rounded-2xl p-4 ${info.hover} transition-all duration-200 active:scale-[0.98]
                  text-left hover:shadow-md`}
              >
                <div className={`w-14 h-14 ${info.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`${info.text} font-black text-sm`}>{info.shortKey}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#1E293B] text-base">{info.label}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{info.sub}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-300 text-sm" />
              </button>
            ))}
          </div>
        )}

        {/* ÉTAPE 2 — Saisie du numéro */}
        {step === STEPS.PHONE && m && (
          <div>
            {/* Badge méthode */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${m.border} bg-white mb-6`}>
              <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className={`${m.text} font-black text-xs`}>{m.shortKey}</span>
              </div>
              <span className="font-bold text-[#1E293B] text-sm">{m.label}</span>
            </div>

            {/* Input téléphone */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-[#1E293B] mb-2">
                Numéro de téléphone
              </label>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden transition-colors
                ${phoneError ? 'border-red-300' : 'border-[#E2E8F0] focus-within:border-[#1E3A8A]'}`}>
                <span className="px-4 h-14 flex items-center bg-slate-50 text-[#64748B] text-sm font-bold border-r border-[#E2E8F0]">
                  +237
                </span>
                <input
                  type="tel"
                  value={phone}
                  maxLength={12}
                  onChange={(e) => { setPhone(e.target.value); setPhoneError(''); }}
                  placeholder="6XX XXX XXX"
                  className="flex-1 h-14 px-4 text-lg font-bold text-[#1E293B] outline-none placeholder:text-slate-300 tracking-wider bg-white"
                />
              </div>
              {phoneError && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation" /> {phoneError}
                </p>
              )}
            </div>

            {/* Récap montant */}
            <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3 border border-[#E2E8F0] mb-6">
              <span className="text-sm text-[#64748B]">Montant à débiter</span>
              <span className="font-bold text-[#1E293B]">{amount ? fmt(amount) : '—'}</span>
            </div>

            {/* Bouton payer */}
            <button
              onClick={handlePay}
              className={`w-full ${m.bg} ${m.text} py-4 rounded-xl font-bold text-lg
                flex items-center justify-center gap-2 transition-all active:scale-[0.98]`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <i className="fa-solid fa-shield-halved" />
              Payer {amount ? fmt(amount) : ''}
            </button>
          </div>
        )}

        {/* ÉTAPE 3 — En cours de paiement */}
        {step === STEPS.PAYING && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="w-20 h-20 border-4 border-[#E2E8F0] rounded-full" />
              <div className="w-20 h-20 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin absolute inset-0" />
            </div>
            <h2 className="text-xl font-bold text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Traitement en cours...
            </h2>
            <p className="text-sm text-[#64748B]">Veuillez patienter</p>
          </div>
        )}

        {/* ÉTAPE 4A — Succès ✅ */}
        {step === STEPS.SUCCESS && (
          <div className="text-center pt-8">
            <div className="w-28 h-28 bg-green-50 rounded-full border-4 border-green-200 flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-circle-check text-[#4ADE80] text-5xl animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Paiement confirmé ! 🎉
            </h2>
            <p className="text-[#64748B] text-sm mb-1">
              Votre commande a été transmise à la pharmacie.
            </p>
            <p className="text-xs text-slate-400 mb-8">Commande #{orderId}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/orders/${orderId}`)}
                className="w-full bg-[#1E3A8A] text-white py-4 rounded-xl font-bold hover:bg-[#1e40af] transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <i className="fa-solid fa-bag-shopping" /> Suivre ma commande
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-white text-[#64748B] py-3.5 rounded-xl font-semibold border border-[#E2E8F0] hover:bg-slate-50 transition-colors text-sm"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 4B — Échec ❌ */}
        {step === STEPS.FAILED && (
          <div className="text-center pt-8">
            <div className="w-28 h-28 bg-red-50 rounded-full border-4 border-red-100 flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-circle-xmark text-red-400 text-5xl" />
            </div>
            <h2 className="text-2xl font-black text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Paiement échoué
            </h2>
            <p className="text-[#64748B] text-sm mb-2">
              {errorMessage || 'Solde insuffisant ou numéro incorrect.'}
            </p>
            <p className="text-xs text-slate-400 mb-8">Commande #{orderId}</p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-[#1E3A8A] text-white py-4 rounded-xl font-bold hover:bg-[#1e40af] transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <i className="fa-solid fa-rotate-right" /> Réessayer
              </button>
              <button
                onClick={async () => {
                  await orderService.cancelOrder(orderId).catch(() => null);
                  navigate('/');
                }}
                className="w-full bg-white text-red-500 py-3.5 rounded-xl font-semibold border border-red-100 hover:bg-red-50 transition-colors text-sm"
              >
                Annuler la commande
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}