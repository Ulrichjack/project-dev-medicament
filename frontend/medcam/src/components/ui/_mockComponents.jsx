// src/components/ui/_mockComponents.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  COMPOSANTS TEMPORAIRES — À REMPLACER par ceux de Sonia
// ─────────────────────────────────────────────────────────────────────────────
// Quand Sonia pousse Button.jsx, Input.jsx, Card.jsx :
//   1. git pull origin develop
//   2. Importe depuis ses fichiers au lieu de ce fichier
//   3. Supprime ce fichier
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

/** Button temporaire */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#2C5F8D] text-white hover:bg-[#1E4870] focus:ring-[#2C5F8D] active:scale-95',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 active:scale-95',
    ghost: 'bg-transparent text-[#2C5F8D] hover:bg-blue-50 focus:ring-[#2C5F8D]',
    success: 'bg-[#27AE60] text-white hover:bg-[#219a52] focus:ring-[#27AE60] active:scale-95',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/** Input temporaire */
export const Input = ({
  label,
  error,
  className = '',
  type = 'text',
  ...props
}) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-slate-700">{label}</label>
    )}
    <input
      type={type}
      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200
        ${error ? 'border-red-400 focus:ring-red-300' : 'border-slate-200 focus:ring-[#2C5F8D]/30'}
        bg-white focus:outline-none focus:ring-2 focus:border-transparent
        placeholder:text-slate-400 ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

/** Card temporaire */
export const Card = ({ children, className = '', ...props }) => (
  <div
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

/** Textarea temporaire */
export const Textarea = ({ label, error, className = '', rows = 3, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-slate-700">{label}</label>
    )}
    <textarea
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 resize-none
        ${error ? 'border-red-400 focus:ring-red-300' : 'border-slate-200 focus:ring-[#2C5F8D]/30'}
        bg-white focus:outline-none focus:ring-2 focus:border-transparent
        placeholder:text-slate-400 ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);
