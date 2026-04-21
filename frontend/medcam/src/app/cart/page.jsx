"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  selectCartItems, selectCartTotal, selectCartPharmacy,
  updateQuantity, removeItem,
} from '../../store/cartSlice';
import CartItem from '../../components/order/CartItem';

const DELIVERY_FEE = 500;
const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { pharmacyName } = useSelector(selectCartPharmacy);

  const grandTotal = total + DELIVERY_FEE;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 340 }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #EBF4FF, #DBEEFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="fa-solid fa-cart-shopping" style={{ fontSize: 40, color: '#2C5F8D', opacity: 0.7 }} />
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#1a1a2e' }}>Panier vide</h2>
          <p style={{ margin: '0 0 28px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            Ajoutez des médicaments depuis la recherche pour commencer votre commande.
          </p>
          <button onClick={() => router.push('/')}
            style={{
              background: 'linear-gradient(135deg, #2C5F8D, #1E4870)',
              color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(44,95,141,0.3)',
            }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: 14 }} />
            Rechercher un médicament
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #f0f0f0',
        position: 'sticky', top: 0, zIndex: 10,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 20px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #e5e7eb',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#374151', fontSize: 14 }}>
            <i className="fa-solid fa-arrow-left" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: '#1a1a2e' }}>Mon panier</p>
            <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{items.length} article{items.length > 1 ? 's' : ''}</p>
          </div>
          <div style={{ width: 36 }} />
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 20px 140px' }}>

        {/* Bannière pharmacie */}
        <div style={{
          background: 'linear-gradient(135deg, #1E4870 0%, #2C5F8D 100%)',
          borderRadius: 16, padding: '14px 18px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <i className="fa-solid fa-store" style={{ color: '#fff', fontSize: 16 }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Commande depuis</p>
            <p style={{ margin: 0, fontSize: 15, color: '#fff', fontWeight: 700 }}>{pharmacyName || 'Pharmacie'}</p>
          </div>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {items.map(item => (
            <CartItem key={item.medicamentId} item={item}
              onQuantityChange={(id, qty) => dispatch(updateQuantity({ medicamentId: id, quantity: qty }))}
              onRemove={(id) => dispatch(removeItem(id))}
            />
          ))}
        </div>

        {/* Récapitulatif */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px' }}>
            <p style={{ margin: '0 0 14px', fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>Récapitulatif</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#6b7280' }}>Sous-total</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{fmt(total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#6b7280' }}>Livraison</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{fmt(DELIVERY_FEE)}</span>
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: '#f3f4f6' }} />
          <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e' }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#16a34a' }}>{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* CTA fixe bas */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', borderTop: '1px solid #f0f0f0',
        padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <button onClick={() => router.push('/checkout')}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #2C5F8D, #1E4870)',
              color: '#fff', border: 'none', borderRadius: 14, padding: '16px 24px',
              fontWeight: 800, fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 8px 24px rgba(44,95,141,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(44,95,141,0.3)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,95,141,0.35)'; }}
          >
            <i className="fa-solid fa-bag-shopping" style={{ fontSize: 15 }} />
            Commander · {fmt(grandTotal)}
          </button>
        </div>
      </div>
    </div>
  );
}
