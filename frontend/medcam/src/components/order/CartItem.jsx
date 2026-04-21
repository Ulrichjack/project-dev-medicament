"use client";
import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { medicamentId, medicamentName, photo_url, price, quantity } = item;
  const subtotal = price * quantity;
  const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: '#fff', borderRadius: 16,
      border: '1px solid #f0f0f0',
      padding: '14px 16px',
      transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(44,95,141,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Avatar médicament */}
      <div style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg, #EBF4FF 0%, #DBEEFF 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {photo_url
          ? <img src={photo_url} alt={medicamentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <i className="fa-solid fa-pills" style={{ color: '#2C5F8D', fontSize: 22 }} />}
      </div>

      {/* Nom + prix unitaire */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a2e', lineHeight: 1.3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {medicamentName}
        </p>
        <p style={{ margin: '3px 0 8px', fontSize: 12, color: '#9ca3af' }}>{fmt(price)} / unité</p>

        {/* Stepper quantité */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'fit-content',
          background: '#f8fafc', borderRadius: 10, border: '1px solid #e5e7eb' }}>
          <button onClick={() => onQuantityChange(medicamentId, quantity - 1)} disabled={quantity <= 1}
            style={{ width: 30, height: 30, border: 'none', background: 'transparent',
              cursor: quantity <= 1 ? 'not-allowed' : 'pointer', color: quantity <= 1 ? '#d1d5db' : '#374151',
              fontSize: 14, borderRadius: '10px 0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            −
          </button>
          <span style={{ width: 32, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>
            {quantity}
          </span>
          <button onClick={() => onQuantityChange(medicamentId, quantity + 1)}
            style={{ width: 30, height: 30, border: 'none', background: 'transparent',
              cursor: 'pointer', color: '#374151', fontSize: 14,
              borderRadius: '0 10px 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            +
          </button>
        </div>
      </div>

      {/* Sous-total + supprimer */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: '#16a34a' }}>{fmt(subtotal)}</span>
        <button onClick={() => onRemove(medicamentId)}
          style={{ width: 28, height: 28, border: '1px solid #fee2e2', borderRadius: 8,
            background: '#fff5f5', cursor: 'pointer', color: '#ef4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
