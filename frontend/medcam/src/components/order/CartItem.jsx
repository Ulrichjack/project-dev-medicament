import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { medicamentId, medicamentName, photo_url, pharmacyName, price, quantity } = item;
  const subtotal = price * quantity;
  const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-shadow duration-200">
      <div className="w-16 h-16 rounded-xl bg-[#F0F4FF] flex items-center justify-center flex-shrink-0 overflow-hidden">
        {photo_url
          ? <img src={photo_url} alt={medicamentName} className="w-full h-full object-cover" />
          : <i className="fa-solid fa-pills text-2xl text-[#38BDF8]" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#1E293B] text-sm leading-snug truncate">{medicamentName}</p>
        {pharmacyName && (
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <i className="fa-solid fa-store text-[10px]" />{pharmacyName}
          </p>
        )}
        <p className="text-xs text-slate-400 mt-0.5">{fmt(price)} / unité</p>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => onQuantityChange(medicamentId, quantity - 1)} disabled={quantity <= 1}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-bold">
            −
          </button>
          <span className="w-8 text-center text-sm font-bold text-[#1E293B]">{quantity}</span>
          <button onClick={() => onQuantityChange(medicamentId, quantity + 1)}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all text-sm font-bold">
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="font-bold text-[#1E3A8A] text-sm">{fmt(subtotal)}</span>
        <button onClick={() => onRemove(medicamentId)}
          className="w-7 h-7 rounded-lg border border-red-100 bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 transition-all">
          <i className="fa-solid fa-trash text-xs" />
        </button>
      </div>
    </div>
  );
};
export default CartItem;