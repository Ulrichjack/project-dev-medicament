import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import orderService from '../../services/orderService';

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS  = 60000;

const STEPS = {
  CHOOSE:  'choose',
  PHONE:   'phone',
  WAITING: 'waiting',
  SUCCESS: 'success',
  FAILED:  'failed',
};

const METHODS = {
  mtn_mobile_money: {
    label:    'MTN Mobile Money',
    sub:      'Numéros 67X · 65X · 68X',
    bg:       'bg-[#FFCC00]',
    bgHex:    '#FFCC00',
    text:     'text-black',
    border:   'border-yellow-400',
    hoverBg:  'hover:bg-yellow-50',
    shortKey: 'MTN',
  },
  orange_money: {
    label:    'Orange Money',
    sub:      'Numéros 69X · 655',
    bg:       'bg-[#FF6600]',
    bgHex:    '#FF6600',
    text:     'text-white',
    border:   'border-orange-500',
    hoverBg:  'hover:bg-orange-50',
    shortKey: 'OM',
  },
};

const fmt = (n) => n?.toLocaleString('fr-FR') + ' FCFA';

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate    = useNavigate();

  const [step,          setStep]          = useState(STEPS.CHOOSE);
  const [method,        setMethod]        = useState(null);
  const [phone,         setPhone]         = useState('');
  const [phoneError,    setPhoneError]    = useState('');
  const [amount,        setAmount]        = useState(null);
  const [loadingAmount, setLoadingAmount] = useState(true);
  const [paying,        setPaying]        = useState(false);
  const [timeLeft,      setTimeLeft]      = useState(60);

  const pollRef     = useRef(null);
  const timeoutRef  = useRef(null);
  const countdownRef = useRef(null);

  // ─── Charger le montant de la commande ──────────────────────────────────────
  useEffect(() => {
    orderService.getOrderById(orderId)
      .then((order) => setAmount(order.total_amount || order.amount || order.total))
      .catch(() => setAmount(null))
      .finally(() => setLoadingAmount(false));

    return () => clearAll();
  }, [orderId]);

  const clearAll = () => {
    clearInterval(pollRef.current);
    clearTimeout(timeoutRef.current);
    clearInterval(countdownRef.current);
  };

  // ─── Validation numéro ───────────────────────────────────────────────────────
  const validatePhone = (num) => {
    const clean = num.replace(/\s/g, '');
    if (!clean)              return 'Numéro requis';
    if (!/^6[0-9]{8}$/.test(clean)) return 'Format invalide — ex: 677 123 456';
    return '';
  };

  // ─── Lancer le paiement ─────────────────────────────────────────────────���────
  const handlePay = async () => {
    const err = validatePhone(phone);
    if (err) { setPhoneError(err); return; }
    setPhoneError('');
    setPaying(true);
    setStep(STEPS.WAITING);
    setTimeLeft(60);

    try {
      await paymentService.initiatePayment(orderId, method, phone.replace(/\s/g, ''));
      startPolling();
    } catch {
      setStep(STEPS.FAILED);
    } finally {
      setPaying(false);
    }
  };

  // ─── Polling statut paiement ─────────────────────────────────────────────────
  const startPolling = () => {
    // Compte à rebours visuel
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Timeout global 60s
    timeoutRef.current = setTimeout(() => {
      clearAll();
      setStep(STEPS.FAILED);
    }, POLL_TIMEOUT_MS);

    // Polling toutes les 3 secondes
    pollRef.current = setInterval(async () => {
      try {
        const status = await paymentService.getStatus(orderId);
        if (status === 'paid') {
          clearAll();
          setStep(STEPS.SUCCESS);
        } else if (status === 'failed') {
          clearAll();
          setStep(STEPS.FAILED);
        }
        // Si 'pending' → on continue de poller
      } catch {
        // Silencieux — on retry
      }
    }, POLL_INTERVAL_MS);
  };

  const handleRetry = () => {
    clearAll();
    setPhone('');
    setPhoneError('');
    setMethod(null);
    setTimeLeft(60);
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
          <p className="font-bold text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Paiement</p>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">

        {/* Montant (toutes étapes sauf succès/échec) */}
        {step !== STEPS.SUCCESS && step !== STEPS.FAILED && (
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Montant à payer</p>
            {loadingAmount ? (
              <div className="h-10 w-36 bg-slate-100 rounded-xl mx-auto animate-pulse" />
            ) : (
              <p className="text-4xl font-black text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {amount ? fmt(amount) : '—'}
              </p>
            )}
          </div>
        )}

        {/* ── ÉTAPE 1 : CHOISIR ─────────────────────────────────────────────── */}
        {step === STEPS.CHOOSE && (
          <div className="space-y-3">
            <p className="text-center text-sm font-semibold text-[#64748B] mb-4">
              Choisissez votre opérateur
            </p>
            {Object.entries(METHODS).map(([key, info]) => (
              <button
                key={key}
                onClick={() => { setMethod(key); setStep(STEPS.PHONE); }}
                className={`w-full flex items-center gap-4 bg-white border-2 ${info.border} rounded-2xl
                  p-4 ${info.hoverBg} transition-all duration-200 active:scale-[0.98] text-left
                  hover:shadow-md`}
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

        {/* ── ÉTAPE 2 : NUMÉRO ──────────────────────────────────────────────── */}
        {step === STEPS.PHONE && m && (
          <div>
            {/* Badge méthode choisie */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${m.border}
              bg-white mb-6`}>
              <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className={`${m.text} font-black text-xs`}>{m.shortKey}</span>
              </div>
              <span className="font-bold text-[#1E293B] text-sm">{m.label}</span>
            </div>

            {/* Input téléphone */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-[#1E293B] mb-2">Numéro de téléphone</label>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden transition-colors
                ${phoneError ? 'border-red-300' : 'border-[#E2E8F0] focus-within:border-[#1E3A8A]'}`}>
                <span className="px-4 h-14 flex items-center bg-slate-50 text-[#64748B] text-sm font-bold
                  border-r border-[#E2E8F0]">
                  +237
                </span>
                <input
                  type="tel"
                  value={phone}
                  maxLength={12}
                  onChange={(e) => { setPhone(e.target.value); setPhoneError(''); }}
                  placeholder="6XX XXX XXX"
                  className="flex-1 h-14 px-4 text-lg font-bold text-[#1E293B] outline-none
                    placeholder:text-slate-300 tracking-wider bg-white"
                />
              </div>
              {phoneError && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation" /> {phoneError}
                </p>
              )}
              <p className="mt-2 text-xs text-[#64748B]">
                Vous recevrez une notification pour confirmer le paiement.
              </p>
            </div>

            {/* Récap montant */}
            <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3
              border border-[#E2E8F0] mb-6">
              <span className="text-sm text-[#64748B]">Montant à débiter</span>
              <span className="font-bold text-[#1E293B]">{amount ? fmt(amount) : '—'}</span>
            </div>

            {/* Bouton payer */}
            <button
              onClick={handlePay}
              disabled={paying}
              className={`w-full ${m.bg} ${m.text} py-4 rounded-xl font-bold text-lg
                flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {paying
                ? <><i className="fa-solid fa-circle-notch fa-spin" /> Envoi...</>
                : <><i className="fa-solid fa-shield-halved" /> Payer {amount ? fmt(amount) : ''}</>}
            </button>
          </div>
        )}

        {/* ── ÉTAPE 3 : ATTENTE ─────────────────────────────────────────────── */}
        {step === STEPS.WAITING && (
          <div className="text-center">
            {/* Spinner SVG */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="#1E3A8A" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - timeLeft / 60)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-[#1E3A8A]">{timeLeft}s</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#1E293B] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              En attente de confirmation...
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed mb-2">
              Vérifiez votre téléphone
            </p>
            <p className="text-sm font-bold text-[#1E293B] mb-6">+237 {phone}</p>
            <p className="text-xs text-[#64748B]">
              et entrez votre code secret PIN {m?.label} pour valider.
            </p>
          </div>
        )}

        {/* ── ÉTAPE 4A : SUCCÈS ─────────────────────────────────────────────── */}
        {step === STEPS.SUCCESS && (
          <div className="text-center pt-8">
            <div className="w-28 h-28 bg-green-50 rounded-full border-4 border-green-200
              flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-circle-check text-[#4ADE80] text-5xl animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Paiement confirmé ! 🎉
            </h2>
            <p className="text-[#64748B] text-sm mb-1">Votre commande a été transmise à la pharmacie.</p>
            <p className="text-xs text-slate-400 mb-8">Commande #{orderId}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/orders/${orderId}`)}
                className="w-full bg-[#1E3A8A] text-white py-4 rounded-xl font-bold
                  hover:bg-[#1e40af] transition-colors active:scale-[0.98]
                  flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <i className="fa-solid fa-bag-shopping" /> Suivre ma commande
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-white text-[#64748B] py-3.5 rounded-xl font-semibold
                  border border-[#E2E8F0] hover:bg-slate-50 transition-colors text-sm"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 4B : ÉCHEC ──────────────────────────────────────────────── */}
        {step === STEPS.FAILED && (
          <div className="text-center pt-8">
            <div className="w-28 h-28 bg-red-50 rounded-full border-4 border-red-100
              flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-circle-xmark text-red-400 text-5xl" />
            </div>
            <h2 className="text-2xl font-black text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Paiement échoué
            </h2>
            <p className="text-[#64748B] text-sm mb-8">Solde insuffisant ou numéro incorrect.</p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-[#1E3A8A] text-white py-4 rounded-xl font-bold
                  hover:bg-[#1e40af] transition-colors active:scale-[0.98]
                  flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <i className="fa-solid fa-rotate-right" /> Réessayer
              </button>
              <button
                onClick={async () => {
                  await orderService.cancelOrder(orderId).catch(() => null);
                  navigate('/');
                }}
                className="w-full bg-white text-red-500 py-3.5 rounded-xl font-semibold
                  border border-red-100 hover:bg-red-50 transition-colors text-sm"
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