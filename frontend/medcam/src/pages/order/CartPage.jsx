import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotal,
  selectCartPharmacy,
  updateQuantity,
  removeItem,
} from '../../store/cartSlice';
import CartItem from '../../components/order/CartItem';

const DELIVERY_FEE = 1000;
const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { pharmacyName } = useSelector(selectCartPharmacy);
  const grandTotal = total + DELIVERY_FEE;

  // ─── PANIER VIDE ────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <i className="fa-solid fa-cart-shopping text-5xl text-slate-200" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Votre panier est vide
          </h2>
          <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
            Ajoutez des médicaments depuis la recherche pour commencer votre commande.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#1E3A8A] text-white px-8 py-3.5 rounded-xl font-bold text-sm
              hover:bg-[#1e40af] transition-colors duration-200 active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <i className="fa-solid fa-magnifying-glass mr-2" />
            Rechercher un médicament
          </button>
        </div>
      </div>
    );
  }

  // ─── PANIER NON VIDE ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center hover:bg-slate-50 transition-colors text-[#64748B] text-sm"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <div className="text-center">
            <p className="font-bold text-[#1E293B] text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Mon panier
            </p>
            <p className="text-xs text-[#64748B]">{items.length} article{items.length > 1 ? 's' : ''}</p>
          </div>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 pb-36">
        {/* Bannière pharmacie */}
        <div className="bg-[#1E3A8A] rounded-2xl p-4 mb-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-store text-white text-sm" />
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Commande depuis</p>
            <p className="text-white font-bold text-base">{pharmacyName || 'Pharmacie'}</p>
          </div>
        </div>

        {/* Liste des items */}
        <div className="flex flex-col gap-3 mb-5">
          {items.map((item) => (
            <CartItem
              key={item.medicamentId}
              item={item}
              onQuantityChange={(id, qty) => dispatch(updateQuantity({ medicamentId: id, quantity: qty }))}
              onRemove={(id) => dispatch(removeItem(id))}
            />
          ))}
        </div>

        {/* Récapitulatif */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="p-5">
            <p className="font-bold text-[#1E293B] text-sm mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Récapitulatif
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Sous-total</span>
                <span className="font-semibold text-[#1E293B]">{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Frais de livraison</span>
                <span className="font-semibold text-[#1E293B]">{fmt(DELIVERY_FEE)}</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#E2E8F0]" />
          <div className="p-5 flex justify-between items-center">
            <span className="font-bold text-[#1E293B] text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Total
            </span>
            <span className="font-bold text-[#1E3A8A] text-xl tabular-nums">
              {fmt(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Bouton fixe bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] p-4 z-20">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#1E3A8A] text-white py-4 rounded-xl font-bold text-base hover:bg-[#1e40af] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-900/25 flex items-center justify-center gap-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <i className="fa-solid fa-bag-shopping text-sm" />
            Passer la commande · {fmt(grandTotal)}
          </button>
        </div>
      </div>
    </div>
  );
}