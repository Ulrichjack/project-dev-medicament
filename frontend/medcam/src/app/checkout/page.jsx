"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectCartItems, selectCartTotal, selectCartPharmacy, clearCart } from '../../store/cartSlice';
import orderService from '../../services/orderService';

const DELIVERY_FEE = 500;
const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

const inputStyle = (hasError) => ({
  width: '100%', padding: '13px 16px', borderRadius: 12, fontSize: 14,
  border: `1.5px solid ${hasError ? '#fca5a5' : '#e5e7eb'}`,
  outline: 'none', fontFamily: 'inherit', color: '#1a1a2e',
  background: '#fff', boxSizing: 'border-box', resize: 'none',
  transition: 'border-color 0.2s',
});

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { pharmacyId, pharmacyName } = useSelector(selectCartPharmacy);

  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(null);
  const [geoStatus, setGeoStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addressError, setAddressError] = useState(false);

  const grandTotal = total + DELIVERY_FEE;

  const handleGeo = () => {
    if (!navigator.geolocation) return setGeoStatus('error');
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setGeoStatus('success'); },
      () => setGeoStatus('error')
    );
  };

  const handleSubmit = async () => {
    if (!address.trim()) { setAddressError(true); return; }
    setAddressError(false); setError(''); setLoading(true);
    try {
      const order = await orderService.createOrder({
        pharmacy_id: pharmacyId,
        items: items.map(i => ({ medicament_id: i.medicamentId, quantity: i.quantity, unit_price: i.price })),
        delivery_address: address.trim(),
        delivery_latitude: location?.lat || null,
        delivery_longitude: location?.lng || null,
        notes: notes.trim() || null,
      });
      dispatch(clearCart());
      router.push(`/payment/${order.id}`);
    } catch (err) {
      setError(err.message?.includes('stock') ? err.message : 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const geoColors = { success: '#16a34a', error: '#ef4444', loading: '#2C5F8D', idle: '#2C5F8D' };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', fontSize: 14 }}>
            <i className="fa-solid fa-arrow-left" />
          </button>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: '#1a1a2e' }}>Confirmation</p>
          <div style={{ width: 36 }} />
        </div>
      </div>

      {/* Stepper visuel */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {[['Panier', true], ['Livraison', true], ['Paiement', false]].map(([label, active], i) => (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: active ? '#2C5F8D' : '#f3f4f6', color: active ? '#fff' : '#9ca3af' }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 11, color: active ? '#2C5F8D' : '#9ca3af', fontWeight: active ? 700 : 400 }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 48, height: 2, background: i < 1 ? '#2C5F8D' : '#e5e7eb', margin: '0 4px 16px' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 20px 140px' }}>

        {/* Récapitulatif commande */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Récapitulatif</p>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f3f4f6' }}>
              <i className="fa-solid fa-store" style={{ color: '#2C5F8D', fontSize: 13, width: 16 }} />
              <span style={{ fontSize: 13, color: '#6b7280' }}>Pharmacie</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>{pharmacyName}</span>
            </div>
            {items.map(item => (
              <div key={item.medicamentId} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f9fafb' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EBF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-pills" style={{ color: '#2C5F8D', fontSize: 13 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1a1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.medicamentName}</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>×{item.quantity}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{fmt(item.price * item.quantity)}</span>
              </div>
            ))}
            <div style={{ padding: '12px 16px', background: '#f9fafb' }}>
              {[['Sous-total', total], ['Livraison', DELIVERY_FEE]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, color: '#6b7280' }}>
                  <span>{label}</span><span style={{ fontWeight: 600, color: '#374151' }}>{fmt(val)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 15, marginTop: 8, paddingTop: 8, borderTop: '1px solid #e5e7eb' }}>
                <span style={{ color: '#1a1a2e' }}>Total</span>
                <span style={{ color: '#16a34a' }}>{fmt(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Livraison */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Livraison</p>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0', padding: '16px' }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                Adresse complète <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea rows={3} value={address} onChange={e => { setAddress(e.target.value); setAddressError(false); }}
                placeholder="Ex : Rue des Palmiers, Bonanjo, face au carrefour..."
                style={inputStyle(addressError)}
                onFocus={e => e.target.style.borderColor = addressError ? '#fca5a5' : '#2C5F8D'}
                onBlur={e => e.target.style.borderColor = addressError ? '#fca5a5' : '#e5e7eb'}
              />
              {addressError && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#ef4444' }}>L'adresse est requise</p>}
            </div>

            {/* GPS */}
            <button onClick={handleGeo} disabled={geoStatus === 'loading'}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                borderRadius: 10, border: `1px solid ${geoStatus === 'success' ? '#bbf7d0' : '#e5e7eb'}`,
                background: geoStatus === 'success' ? '#f0fdf4' : '#f8fafc',
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
                color: geoColors[geoStatus], marginBottom: 14, width: '100%',
              }}>
              <i className={`fa-solid ${geoStatus === 'loading' ? 'fa-circle-notch fa-spin' : geoStatus === 'success' ? 'fa-circle-check' : geoStatus === 'error' ? 'fa-triangle-exclamation' : 'fa-location-dot'}`} style={{ fontSize: 14 }} />
              {geoStatus === 'loading' ? 'Localisation...' : geoStatus === 'success' ? 'Position détectée ✓' : geoStatus === 'error' ? 'Accès refusé — entrez manuellement' : 'Utiliser ma position GPS'}
            </button>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                Notes <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optionnel)</span>
              </label>
              <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Étage, bâtiment, horaires préférés..."
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = '#2C5F8D'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <i className="fa-solid fa-circle-exclamation" style={{ color: '#ef4444', marginTop: 1, flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 13, color: '#b91c1c', lineHeight: 1.5 }}>{error}</p>
          </div>
        )}
      </div>

      {/* CTA fixe */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #f0f0f0', padding: '16px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <button onClick={handleSubmit} disabled={loading}
            style={{
              width: '100%', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2C5F8D, #1E4870)',
              color: '#fff', border: 'none', borderRadius: 14, padding: '16px 24px',
              fontWeight: 800, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: loading ? 'none' : '0 8px 24px rgba(44,95,141,0.35)',
            }}>
            {loading
              ? <><i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: 14 }} /> Création...</>
              : <><i className="fa-solid fa-lock" style={{ fontSize: 13 }} /> Confirmer et payer · {fmt(grandTotal)}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
