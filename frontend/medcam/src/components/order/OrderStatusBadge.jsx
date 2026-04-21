// src/components/order/OrderStatusBadge.jsx
import React from 'react';

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
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;
