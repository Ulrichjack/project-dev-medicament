import React, { useEffect, useState } from 'react';
import orderService from '../../services/orderService';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getMyOrders()
      .then(data => setOrders(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-20 animate-pulse font-bold text-[#1E3A8A]">Chargement de vos commandes...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-[#1E3A8A] font-montserrat flex items-center gap-3">
          <i className="fa-solid fa-box-open text-[#38BDF8]"></i> Historique de Commandes
        </h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm">
            <i className="fa-solid fa-receipt text-5xl text-slate-200 mb-4"></i>
            <p className="text-slate-500 font-medium">Vous n'avez pas encore passé de commande.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                
                {/* En-tête de la commande */}
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-slate-100 pb-4 mb-4 gap-4">
                  <div>
                    <h2 className="font-black text-[#1E3A8A] text-lg">Commande #{order.id}</h2>
                    {/* On affiche directement le created_at car Laravel l'a déjà formaté ! */}
                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                      <i className="fa-regular fa-calendar"></i> {order.created_at}
                    </p>
                    <p className="text-xs font-bold text-[#38BDF8] flex items-center gap-1 mt-1 uppercase tracking-wider">
                      <i className="fa-solid fa-store"></i> {order.pharmacy_name}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <OrderStatusBadge status={order.status} />
                    {order.payment && (
                      <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-1 rounded-md uppercase border border-green-100">
                            {order.payment.status === 'paid' ? 'Payée via' : 'En attente via'} {order.payment.method === 'mtn_mobile_money' ? 'MTN MoMo' : order.payment.method === 'orange_money' ? 'Orange Money' : 'Carte/Cash'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Liste des articles */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Articles</h3>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-medium text-slate-700">
                        <span className="font-black text-[#1E3A8A] mr-3 bg-white px-2 py-0.5 rounded shadow-sm">
                          {item.quantity}x
                        </span> 
                        {item.medicament_name}
                      </span>
                      <span className="font-bold text-slate-700">{item.sub_total} FCFA</span>
                    </div>
                  ))}
                </div>

                {/* Récapitulatif Prix */}
                <div className="bg-[#F0F4FF] p-4 rounded-xl text-sm border border-blue-100">
                  <div className="flex justify-between text-slate-600 mb-2">
                    <span>Frais de livraison:</span>
                    <span className="font-medium">{order.delivery_fee} FCFA</span>
                  </div>
                  <div className="flex justify-between text-slate-600 mb-2">
                    <span>Adresse:</span>
                    <span className="font-medium text-right max-w-[200px] truncate">{order.delivery_address}</span>
                  </div>
                  <div className="flex justify-between items-center font-black text-[#1E3A8A] text-lg border-t border-blue-200 pt-2 mt-2">
                    <span>TOTAL PAYÉ:</span>
                    <span>{order.total_amount} FCFA</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}