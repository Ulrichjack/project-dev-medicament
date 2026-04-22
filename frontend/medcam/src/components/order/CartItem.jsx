import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { medicamentId, medicamentName, photo_url, price, quantity } = item;
  const subtotal = price * quantity;
  const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-[#f0f0f0] p-4 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        {photo_url ? (
          <img src={photo_url} alt={medicamentName} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <i className="fa-solid fa-pills text-primary text-xl" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-gray-800 truncate">{medicamentName}</p>
        <p className="text-xs text-gray-500 mt-1">{fmt(price)} / unité</p>

        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 w-fit mt-2">
          <button onClick={() => onQuantityChange(medicamentId, quantity - 1)} disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-gray-600 disabled:text-gray-300">
            −
          </button>
          <span className="w-8 text-center text-sm font-bold">{quantity}</span>
          <button onClick={() => onQuantityChange(medicamentId, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600">
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="font-bold text-green-600">{fmt(subtotal)}</span>
        <button onClick={() => onRemove(medicamentId)}
          className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-100">
          <i className="fa-solid fa-trash text-xs" />
        </button>
      </div>
    </div>
  );
};
export default CartItem;