// src/components/order/OrderStatusBadge.jsx
import React from 'react';

<<<<<<< Updated upstream
/**
 * Badge visuel du statut d'une commande
 *
 * @param {{ status: 'pending'|'confirmed'|'preparing'|'ready'|'shipped'|'delivered'|'cancelled' }} props
 */
const STATUS_CONFIG = {
  pending: {
    label: 'En attente',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
    ring: 'ring-slate-200',
  },
  confirmed: {
    label: 'Confirmée',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    ring: 'ring-blue-200',
  },
  preparing: {
    label: 'En préparation',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
    ring: 'ring-orange-200',
    pulse: true,
  },
  ready: {
    label: 'Prête',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
    ring: 'ring-yellow-200',
  },
  shipped: {
    label: 'Expédiée',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    dot: 'bg-violet-500',
    ring: 'ring-violet-200',
    pulse: true,
  },
  delivered: {
    label: 'Livrée',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    ring: 'ring-emerald-200',
  },
  cancelled: {
    label: 'Annulée',
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-400',
    ring: 'ring-red-200',
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full text-xs font-semibold
        ring-1 ${config.bg} ${config.text} ${config.ring}
      `}
    >
      <span
        className={`
          w-1.5 h-1.5 rounded-full flex-shrink-0
          ${config.dot}
          ${config.pulse ? 'animate-pulse' : ''}
        `}
      />
=======
const STATUS_MAP = {
  pending:   { label: 'En attente',      dot: 'bg-slate-400',   badge: 'bg-slate-100 text-slate-600' },
  confirmed: { label: 'Confirmée',       dot: 'bg-blue-500',    badge: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation',  dot: 'bg-amber-500',   badge: 'bg-amber-100 text-amber-700' },
  ready:     { label: 'Prête',           dot: 'bg-yellow-500',  badge: 'bg-yellow-100 text-yellow-700' },
  shipped:   { label: 'Expédiée',        dot: 'bg-violet-500',  badge: 'bg-violet-100 text-violet-700' },
  delivered: { label: 'Livrée',          dot: 'bg-green-500',   badge: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulée',         dot: 'bg-red-400',     badge: 'bg-red-100 text-red-700' },
};

const OrderStatusBadge = ({ status }) => {
  const config = STATUS_MAP[status] || STATUS_MAP.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot} ${
        status === 'preparing' || status === 'shipped' ? 'animate-pulse' : ''
      }`} />
>>>>>>> Stashed changes
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;
