"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import paymentService from '../../../services/paymentService';
import orderService from '../../../services/orderService';

const POLL_INTERVAL = 3000;
const POLL_TIMEOUT = 60000;
const fmt = (n) => n?.toLocaleString('fr-FR') + ' FCFA';

const STEPS = { CHOOSE: 'choose', PHONE: 'phone', WAITING: 'waiting', SUCCESS: 'success', FAILED: 'failed' };

const METHODS = {
  mtn_mobile_money: { label: 'MTN Mobile Money', sub: 'Numéros 67X · 65X · 68X', bg: '#FCD116', color: '#000', border: '#FCD116', icon: 'MTN' },
  orange_money:     { label: 'Orange Money',      sub: 'Numéros 69X · 655',       bg: '#FF6600', color: '#fff', border: '#FF6600', icon: 'OM' },
};

export default function PaymentPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CHOOSE);
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [amount, setAmount] = useState(null);
  const [loadingAmount, setLoadingAmount] = useState(true);
  const [paying, setPaying] = useState(false);
  const [progress, setProgress] = useState(100);

  const pollRef = useRef(null);
  const timeoutRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    orderService.getOrderById(orderId)
      .then(o => setAmount(o.total_amount || o.amount || o.total))
      .catch(() => null)
      .finally(() => setLoadingAmount(false));
    return () => { clearInterval(pollRef.current); clearTimeout(timeoutRef.current); clearInterval(progressRef.current); };
  }, [orderId]);

  const startPolling = () => {
    setProgress(100);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 100 - (elapsed / POLL_TIMEOUT) * 100));
    }, 200);
    timeoutRef.current = setTimeout(() => { clearInterval(pollRef.current); clearInterval(progressRef.current); setStep(STEPS.FAILED); }, POLL_TIMEOUT);
    pollRef.current = setInterval(async () => {
      try {
        const { status } = await paymentService.getPaymentStatus(orderId);
        if (status === 'paid') { clearAll(); setStep(STEPS.SUCCESS); }
        else if (status === 'failed') { clearAll(); setStep(STEPS.FAILED); }
      } catch {}
    }, POLL_INTERVAL);
  };

  const clearAll = () => { clearInterval(pollRef.current); clearTimeout(timeoutRef.current); clearInterval(progressRef.current); };

  const handlePay = async () => {
    const cleaned = phone.replace(/\s/g, '');
    if (!cleaned) return setPhoneError('Numéro requis');
    if (!/^[6][0-9]{8}$/.test(cleaned)) return setPhoneError('Format invalide (ex: 677 123 456)');
    setPhoneError(''); setPaying(true); setStep(STEPS.WAITING);
    try { await paymentService.initiatePayment(orderId, method, cleaned); startPolling(); }
    catch { setStep(STEPS.FAILED); }
    finally { setPaying(false); }
  };

  const handleRetry = () => { clearAll(); setPhone(''); setPhoneError(''); setMethod(null); setStep(STEPS.CHOOSE); };

  const m = method ? METHODS[method] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {(step === STEPS.CHOOSE || step === STEPS.PHONE) ? (
            <button onClick={() => step === STEPS.PHONE ? setStep(STEPS.CHOOSE) : router.back()}
              style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#374151' }}>
              <i className="fa-solid fa-arrow-left" />
            </button>
          ) : <div style={{ width: 36 }} />}
          <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: '#1a1a2e' }}>Paiement</p>
          <div style={{ width: 36 }} />
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 20px 40px' }}>

        {/* Montant */}
        {step !== STEPS.SUCCESS && step !== STEPS.FAILED && (
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Montant à payer</p>
            {loadingAmount
              ? <div style={{ height: 40, width: 140, borderRadius: 8, background: '#f3f4f6', margin: '0 auto', animation: 'pulse 1.5s ease-in-out infinite' }} />
              : <p style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.02em' }}>{amount ? fmt(amount) : '—'}</p>}
          </div>
        )}

        {/* ÉTAPE 1 — Choisir */}
        {step === STEPS.CHOOSE && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ margin: '0 0 4px', textAlign: 'center', fontSize: 14, color: '#6b7280', fontWeight: 600 }}>Choisissez votre opérateur</p>
            {Object.entries(METHODS).map(([key, info]) => (
              <button key={key} onClick={() => { setMethod(key); setStep(STEPS.PHONE); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                  background: '#fff', border: `2px solid ${info.border}20`, borderRadius: 16,
                  padding: '16px 18px', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${info.border}`; e.currentTarget.style.boxShadow = `0 8px 24px ${info.border}25`; }}
                onMouseLeave={e => { e.currentTarget.style.border = `2px solid ${info.border}20`; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: info.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: info.color, fontWeight: 900, fontSize: key === 'mtn_mobile_money' ? 11 : 12 }}>{info.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: '#1a1a2e' }}>{info.label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>{info.sub}</p>
                </div>
                <i className="fa-solid fa-chevron-right" style={{ color: '#d1d5db', fontSize: 13 }} />
              </button>
            ))}
          </div>
        )}

        {/* ÉTAPE 2 — Téléphone */}
        {step === STEPS.PHONE && m && (
          <div>
            {/* Badge méthode */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: `${m.bg}15`, border: `1px solid ${m.bg}40`, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: m.color, fontWeight: 900, fontSize: 10 }}>{m.icon}</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{m.label}</span>
            </div>

            {/* Input tel */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Numéro de téléphone</label>
              <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${phoneError ? '#fca5a5' : '#e5e7eb'}`, borderRadius: 12, background: '#fff', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <span style={{ padding: '0 14px', fontSize: 14, fontWeight: 700, color: '#6b7280', borderRight: '1px solid #e5e7eb', height: 50, display: 'flex', alignItems: 'center', background: '#f9fafb', whiteSpace: 'nowrap' }}>+237</span>
                <input type="tel" value={phone} maxLength={12}
                  onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                  placeholder="6XX XXX XXX"
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '0 14px', height: 50, fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'inherit', color: '#1a1a2e', background: 'transparent' }}
                />
              </div>
              {phoneError && <p style={{ margin: '6px 0 0', fontSize: 12, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}><i className="fa-solid fa-circle-exclamation" />{phoneError}</p>}
              <p style={{ margin: '8px 0 0', fontSize: 12, color: '#9ca3af' }}>Vous recevrez une notification pour confirmer.</p>
            </div>

            {/* Récap montant */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: 10, marginBottom: 24, border: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Montant à débiter</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#1a1a2e' }}>{amount ? fmt(amount) : '—'}</span>
            </div>

            <button onClick={handlePay} disabled={paying}
              style={{
                width: '100%', background: paying ? '#e5e7eb' : m.bg, color: paying ? '#9ca3af' : m.color,
                border: 'none', borderRadius: 14, padding: '16px', fontWeight: 800, fontSize: 16,
                cursor: paying ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: paying ? 'none' : `0 8px 24px ${m.bg}50`,
              }}>
              {paying ? <><i className="fa-solid fa-circle-notch fa-spin" /> Envoi...</> : <><i className="fa-solid fa-shield-halved" />Payer {amount ? fmt(amount) : ''}</>}
            </button>
          </div>
        )}

        {/* ÉTAPE 3 — Attente */}
        {step === STEPS.WAITING && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 28px' }}>
              <svg viewBox="0 0 100 100" style={{ width: 100, height: 100, transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="44" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="#2C5F8D" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                  strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.2s linear' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fa-solid fa-mobile-screen-button" style={{ color: '#2C5F8D', fontSize: 28 }} />
              </div>
            </div>
            <h2 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 800, color: '#1a1a2e' }}>Confirmez sur votre téléphone</h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              Notification envoyée au <strong style={{ color: '#1a1a2e' }}>+237 {phone}</strong>.<br />
              Suivez les instructions pour valider le paiement.
            </p>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 16px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <i className="fa-regular fa-clock" style={{ color: '#9ca3af', fontSize: 13 }} />
              <span style={{ fontSize: 12, color: '#9ca3af' }}>Expire dans {Math.ceil(progress * 0.6)}s</span>
            </div>
          </div>
        )}

        {/* ÉTAPE 4a — Succès */}
        {step === STEPS.SUCCESS && (
          <div style={{ textAlign: 'center', paddingTop: 20 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '3px solid #bbf7d0' }}>
              <i className="fa-solid fa-circle-check" style={{ color: '#16a34a', fontSize: 48 }} />
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900, color: '#1a1a2e' }}>Paiement confirmé !</h2>
            <p style={{ margin: '0 0 32px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              Votre commande a été transmise à la pharmacie.<br />Vous serez notifié dès qu'elle est prête.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => router.push(`/orders/${orderId}`)}
                style={{ width: '100%', background: 'linear-gradient(135deg, #2C5F8D, #1E4870)', color: '#fff', border: 'none', borderRadius: 14, padding: '16px', fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(44,95,141,0.3)' }}>
                <i className="fa-solid fa-bag-shopping" /> Voir ma commande
              </button>
              <button onClick={() => router.push('/')}
                style={{ width: '100%', background: '#f8fafc', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 14, padding: '14px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 4b — Échec */}
        {step === STEPS.FAILED && (
          <div style={{ textAlign: 'center', paddingTop: 20 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '3px solid #fecaca' }}>
              <i className="fa-solid fa-circle-xmark" style={{ color: '#ef4444', fontSize: 48 }} />
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900, color: '#1a1a2e' }}>Paiement échoué</h2>
            <p style={{ margin: '0 0 32px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              Le paiement n'a pas été confirmé.<br />Vérifiez votre solde et réessayez.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={handleRetry}
                style={{ width: '100%', background: 'linear-gradient(135deg, #2C5F8D, #1E4870)', color: '#fff', border: 'none', borderRadius: 14, padding: '16px', fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(44,95,141,0.3)' }}>
                <i className="fa-solid fa-rotate-right" /> Réessayer
              </button>
              <button onClick={() => router.push('/cart')}
                style={{ width: '100%', background: '#f8fafc', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 14, padding: '14px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                Retour au panier
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}
