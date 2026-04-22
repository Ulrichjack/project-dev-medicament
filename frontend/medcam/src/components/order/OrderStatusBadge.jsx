// src/components/order/OrderStatusBadge.jsx
import React from 'react';

const STATUS_MAP = {
<<<<<<< Updated upstream
  pending:   { label: 'En attente',      dot: 'bg-slate-400',  badge: 'bg-slate-100 text-slate-600' },
  confirmed: { label: 'Confirmée',       dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation',  dot: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700' },
  ready:     { label: 'Prête',           dot: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700' },
  shipped:   { label: 'Expédiée',        dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700' },
  delivered: { label: 'Livrée',          dot: 'bg-green-500',  badge: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulée',         dot: 'bg-red-400',    badge: 'bg-red-100 text-red-700' },
=======
  pending:   { label: 'En attente',      dot: 'bg-slate-400',   badge: 'bg-slate-100 text-slate-600' },
  confirmed: { label: 'Confirmée',       dot: 'bg-blue-500',    badge: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation',  dot: 'bg-amber-500',   badge: 'bg-amber-100 text-amber-700' },
  ready:     { label: 'Prête',           dot: 'bg-yellow-500',  badge: 'bg-yellow-100 text-yellow-700' },
  shipped:   { label: 'Expédiée',        dot: 'bg-violet-500',  badge: 'bg-violet-100 text-violet-700' },
  delivered: { label: 'Livrée',          dot: 'bg-green-500',   badge: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulée',         dot: 'bg-red-400',     badge: 'bg-red-100 text-red-700' },
>>>>>>> Stashed changes
};

const OrderStatusBadge = ({ status }) => {
  const config = STATUS_MAP[status] || STATUS_MAP.pending;
<<<<<<< Updated upstream
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot} ${status === 'preparing' || status === 'shipped' ? 'animate-pulse' : ''}`} />
=======

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
<<<<<<< Updated upstream
export default OrderStatusBadge;
=======

export default OrderStatusBadge;
>>>>>>> Stashed changes
