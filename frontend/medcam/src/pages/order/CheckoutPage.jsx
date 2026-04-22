import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, selectCartPharmacy, clearCart } from '../../store/cartSlice';
import orderService from '../../services/orderService';

const DELIVERY_FEE = 500;
const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { pharmacyId, pharmacyName } = useSelector(selectCartPharmacy);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [coords, setCoords] = useState(null);
  const [geoStatus, setGeoStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const grandTotal = total + DELIVERY_FEE;

  const handleGetGPS = () => {
    if (!navigator.geolocation) return setGeoStatus('error');
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setGeoStatus('success'); },
      () => setGeoStatus('error'),
      { timeout: 10000 }
    );
  };

  const handleSubmit = async () => {
    if (!address.trim()) { setError("L'adresse est obligatoire."); return; }
    setError(''); setLoading(true);
    try {
      const order = await orderService.createOrder({
        pharmacy_id: pharmacyId,
        items: items.map(i => ({ medicament_id: i.medicamentId, quantity: i.quantity, unit_price: i.price })),
        delivery_address: address.trim(),
        delivery_latitude: coords?.lat || null,
        delivery_longitude: coords?.lng || null,
        notes: notes.trim() || null,
      });
      dispatch(clearCart());
      navigate(`/payment/${order.id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Erreur lors de la commande.');
    } finally {
      setLoading(false);
    }
  };

  const geoIcon = { idle: 'fa-location-dot', loading: 'fa-circle-notch fa-spin', success: 'fa-circle-check', error: 'fa-triangle-exclamation' }[geoStatus];
  const geoText = { idle: 'Utiliser ma position GPS', loading: 'Localisation...', success: 'Position GPS détectée ✓', error: 'Accès refusé — saisissez manuellement' }[geoStatus];
  const geoClass = { idle: 'bg-[#F0F4FF] border-[#E2E8F0] text-[#1E3A8A] hover:bg-blue-50', loading: 'bg-[#F0F4FF] border-[#E2E8F0] text-[#1E3A8A]', success: 'bg-green-50 border-green-200 text-green-700', error: 'bg-orange-50 border-orange-200 text-orange-600' }[geoStatus];

  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center hover:bg-slate-50 text-[#64748B] text-sm">
            <i className="fa-solid fa-arrow-left" />
          </button>
          <p className="font-bold text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Livraison</p>
          <div className="w-9" />
        </div>
      </div>

      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
          {[['1', 'Panier', true], ['2', 'Livraison', true], ['3', 'Paiement', false]].map(([num, label, active], i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${active ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-400'}`}>{num}</div>
                <span className={`text-xs font-semibold ${active ? 'text-[#1E3A8A]' : 'text-slate-400'}`}>{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 max-w-8 h-0.5 ${i === 0 ? 'bg-[#1E3A8A]' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 pb-36 space-y-4">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-50">
            <i className="fa-solid fa-store text-[#1E3A8A] text-sm w-4" />
            <span className="text-sm text-[#64748B]">Pharmacie</span>
            <span className="ml-auto text-sm font-bold text-[#1E293B]">{pharmacyName}</span>
          </div>
          {items.map(item => (
            <div key={item.medicamentId} className="px-4 py-3 flex items-center gap-3 border-b border-slate-50 last:border-0">
              <div className="w-8 h-8 bg-[#F0F4FF] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-pills text-[#38BDF8] text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1E293B] truncate">{item.medicamentName}</p>
                <p className="text-xs text-[#64748B]">×{item.quantity}</p>
              </div>
              <span className="text-sm font-bold text-[#1E293B]">{fmt(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="px-4 py-3 bg-slate-50">
            <div className="flex justify-between text-sm text-[#64748B] mb-1.5">
              <span>Sous-total</span><span className="font-semibold text-[#1E293B]">{fmt(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#64748B] mb-1.5">
              <span>Livraison</span><span className="font-semibold text-[#1E293B]">{fmt(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1.5 border-t border-[#E2E8F0]">
              <span className="text-[#1E293B]">Total</span>
              <span className="text-[#1E3A8A]">{fmt(grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#1E293B] mb-2">Adresse complète <span className="text-red-500">*</span></label>
            <textarea rows={3} value={address} onChange={e => setAddress(e.target.value)}
              placeholder="Ex : Rue des Palmiers, Quartier Bonanjo..."
              className={`w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:border-[#1E3A8A] placeholder:text-slate-300 ${!address && error ? 'border-red-300' : 'border-[#E2E8F0]'}`} />
          </div>
          <button onClick={handleGetGPS} disabled={geoStatus === 'loading'}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all disabled:opacity-60 ${geoClass}`}>
            <i className={`fa-solid ${geoIcon} text-sm`} />{geoText}
          </button>
          <div>
            <label className="block text-sm font-bold text-[#1E293B] mb-2">Notes <span className="text-[#64748B] font-normal">(optionnel)</span></label>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Étage, bâtiment, horaires..."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm resize-none focus:outline-none focus:border-[#1E3A8A] placeholder:text-slate-300" />
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] p-4 z-20">
        <div className="max-w-2xl mx-auto">
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-[#1E3A8A] text-white py-4 rounded-xl font-bold text-base hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {loading
              ? <><i className="fa-solid fa-circle-notch fa-spin text-sm" /> Création...</>
              : <><i className="fa-solid fa-lock text-sm" /> Confirmer et payer · {fmt(grandTotal)}</>}
          </button>
        </div>
      </div>
    </div>
  );
}