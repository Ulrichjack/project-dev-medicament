import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // <-- Changé de next/navigation à react-router-dom
import { selectCartItems, selectCartTotal, selectCartPharmacy, updateQuantity, removeItem } from '../../store/cartSlice';
import CartItem from '../../components/order/CartItem';

const DELIVERY_FEE = 500;
const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function CartPage() {
  const navigate = useNavigate(); // <-- Changé de useRouter
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { pharmacyName } = useSelector(selectCartPharmacy);
  const grandTotal = total + DELIVERY_FEE;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-cart-shopping text-4xl text-primary opacity-70"></i>
          </div>
          <h2 className="text-2xl font-bold mb-2">Panier vide</h2>
          <p className="text-gray-500 mb-6">Ajoutez des médicaments depuis la recherche.</p>
          <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
            Rechercher un médicament
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-32">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white border rounded-xl flex items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold">Mon panier</h1>
      </div>

      <div className="bg-primary text-white p-4 rounded-xl mb-6">
        <p className="text-xs opacity-80 uppercase tracking-wider">Commande depuis</p>
        <p className="font-bold text-lg">{pharmacyName || 'Pharmacie'}</p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {items.map(item => (
          <CartItem key={item.medicamentId} item={item} 
            onQuantityChange={(id, qty) => dispatch(updateQuantity({ medicamentId: id, quantity: qty }))}
            onRemove={(id) => dispatch(removeItem(id))} />
        ))}
      </div>

      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-bold mb-4">Récapitulatif</h3>
        <div className="flex justify-between text-gray-600 mb-2"><span>Sous-total</span><span className="font-bold text-gray-800">{fmt(total)}</span></div>
        <div className="flex justify-between text-gray-600 mb-4"><span>Livraison</span><span className="font-bold text-gray-800">{fmt(DELIVERY_FEE)}</span></div>
        <div className="border-t pt-4 flex justify-between font-bold text-lg"><span>Total</span><span className="text-green-600">{fmt(grandTotal)}</span></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/checkout')} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg">
            Commander · {fmt(grandTotal)}
          </button>
        </div>
      </div>
    </div>
  );
}