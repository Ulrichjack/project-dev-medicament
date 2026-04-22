import React from 'react';

const STATUS_CONFIG = {
  pending: { label: 'En attente', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  confirmed: { label: 'Confirmée', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  preparing: { label: 'En préparation', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  ready: { label: 'Prête', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  shipped: { label: 'Expédiée', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  delivered: { label: 'Livrée', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  cancelled: { label: 'Annulée', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export default function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}