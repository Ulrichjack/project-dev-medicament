import React from 'react';

const STATUS_CONFIG = {
  pending:   { label: 'En attente',      bg: 'bg-slate-100',  text: 'text-slate-600',  dot: 'bg-slate-400' },
  confirmed: { label: 'Confirmée',       bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500' },
  preparing: { label: 'En préparation',  bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500' },
  ready:     { label: 'Prête',           bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  shipped:   { label: 'Expédiée',        bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-500' },
  delivered: { label: 'Livrée',          bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
  cancelled: { label: 'Annulée',         bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-400' },
};

export default function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  
  // On garde l'animation d'Ange pour les statuts en cours
  const isPulsing = status === 'preparing' || status === 'shipped';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot} ${isPulsing ? 'animate-pulse' : ''}`} />
      {config.label}
    </span>
  );
}