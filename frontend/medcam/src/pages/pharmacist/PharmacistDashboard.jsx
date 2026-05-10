import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import medicamentService from '../../services/medicamentService';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/toastSlice';

export default function PharmacistDashboard() {
  const [orders, setOrders] = useState([]);
  const [medicaments, setMedicaments] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [myStock, setMyStock] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // NOUVEAU : 3 onglets possibles !
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'history', 'stock'
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStockId, setCurrentStockId] = useState(null);
  const [stockForm, setStockForm] = useState({ medicament_id: '', price: '', quantity: '' });

  const [showNewMedModal, setShowNewMedModal] = useState(false);
  const [newMedForm, setNewMedForm] = useState({ name: '', active_substance: '', category_id: '', prescription_required: false });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const resOrders = await api.get('/pharmacist/orders');
      setOrders(resOrders.data.data || resOrders.data || []); // Gère avec ou sans pagination

      const resMeds = await medicamentService.getAll(1);
      setMedicaments(resMeds.data || resMeds); 

      const resStock = await api.get('/pharmacist/stock');
      setMyStock(resStock.data.data || []);

      const resCats = await medicamentService.getCategories();
      setCategories(resCats);
    } catch (err) {
      dispatch(addToast({ type: 'error', message: "Erreur de chargement des données." }));
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/pharmacist/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      dispatch(addToast({ type: 'success', message: "Statut mis à jour !" }));
    } catch (e) {
      dispatch(addToast({ type: 'error', message: "Erreur lors de la mise à jour." }));
    }
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.patch(`/pharmacist/stock/${currentStockId}`, {
          price: stockForm.price,
          quantity: stockForm.quantity
        });
        dispatch(addToast({ type: 'success', message: "Stock modifié avec succès !" }));
      } else {
        await api.post('/pharmacist/stock', stockForm);
        dispatch(addToast({ type: 'success', message: "Médicament ajouté/mis à jour dans le stock !" }));
      }
      cancelEdit();
      loadDashboardData(); 
    } catch (e) {
      dispatch(addToast({ type: 'error', message: "Erreur lors de l'enregistrement." }));
    }
  };

  const handleEditClick = (item) => {
    setIsEditMode(true);
    setCurrentStockId(item.id);
    setStockForm({
      medicament_id: item.medicament_id || '',
      price: item.price,
      quantity: item.quantity
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setCurrentStockId(null);
    setStockForm({ medicament_id: '', price: '', quantity: '' });
  };

  const handleNewMedSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/pharmacist/medicaments', newMedForm);
      dispatch(addToast({ type: 'success', message: "Nouveau médicament créé !" }));
      setShowNewMedModal(false);
      setNewMedForm({ name: '', active_substance: '', category_id: '', prescription_required: false });
      const resMeds = await medicamentService.getAll(1);
      setMedicaments(resMeds.data || resMeds); 
      setStockForm({ ...stockForm, medicament_id: res.data.data.id });
    } catch (e) {
      dispatch(addToast({ type: 'error', message: "Erreur lors de la création du médicament." }));
    }
  };

  // --- LOGIQUE DE TRI DES COMMANDES ---
  const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready'].includes(o.status));
  const historyOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));
  const totalRevenus = historyOrders.filter(o => o.status === 'delivered').reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);

  if (loading) return <div className="text-center p-20 font-bold text-red-600 animate-pulse">Chargement de l'Espace Pro...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      
      {/* MODAL CRÉATION MÉDICAMENT (identique) */}
      {showNewMedModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Créer un nouveau médicament</h2>
            <form onSubmit={handleNewMedSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nom du médicament <span className="text-red-500">*</span></label>
                <input required type="text" value={newMedForm.name} onChange={e => setNewMedForm({...newMedForm, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Ex: Doliprane 1000mg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Substance active</label>
                <input type="text" value={newMedForm.active_substance} onChange={e => setNewMedForm({...newMedForm, active_substance: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Ex: Paracétamol" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Catégorie</label>
                <select value={newMedForm.category_id} onChange={e => setNewMedForm({...newMedForm, category_id: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white">
                  <option value="">-- Choisir une catégorie --</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="presc" checked={newMedForm.prescription_required} onChange={e => setNewMedForm({...newMedForm, prescription_required: e.target.checked})} className="w-4 h-4" />
                <label htmlFor="presc" className="text-sm font-bold text-slate-700">Sur ordonnance uniquement</label>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowNewMedModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-[#1E3A8A] text-white font-bold rounded-xl hover:bg-[#1e40af]">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-red-600 mb-2 uppercase tracking-tight">
          <i className="fa-solid fa-store mr-3"></i>Espace Pharmacien
        </h1>
        <p className="text-slate-500 mb-8 font-medium">Gérez vos commandes clients et votre stock en un seul endroit.</p>
        
        {/* STATISTIQUES (4 Cartes maintenant !) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-bold mb-1"><i className="fa-solid fa-box text-blue-500 mr-2"></i>Produits en rayon</p>
            <p className="text-2xl font-black text-[#1E293B]">{myStock.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-bold mb-1"><i className="fa-solid fa-clock text-amber-500 mr-2"></i>À traiter</p>
            <p className="text-2xl font-black text-[#1E293B]">{activeOrders.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-bold mb-1"><i className="fa-solid fa-check-double text-green-500 mr-2"></i>Livrées</p>
            <p className="text-2xl font-black text-[#1E293B]">{historyOrders.filter(o => o.status === 'delivered').length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <p className="text-green-700 text-sm font-bold mb-1"><i className="fa-solid fa-money-bill-wave mr-2"></i>Revenus générés</p>
            <p className="text-2xl font-black text-green-800">{totalRevenus.toLocaleString('fr-FR')} FCFA</p>
          </div>
        </div>

        {/* ONGLETS */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-4 overflow-x-auto">
          <button onClick={() => setActiveTab('orders')} className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
            <i className="fa-solid fa-fire mr-2"></i> En cours ({activeOrders.length})
          </button>
          <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
            <i className="fa-solid fa-clock-rotate-left mr-2"></i> Historique ({historyOrders.length})
          </button>
          <button onClick={() => setActiveTab('stock')} className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'stock' ? 'bg-[#1E3A8A] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
            <i className="fa-solid fa-boxes-stacked mr-2"></i> Mon Stock
          </button>
        </div>

        {/* ONGLET 1 : COMMANDES EN COURS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {activeOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <i className="fa-solid fa-mug-hot text-5xl mb-4"></i>
                <p className="font-bold text-lg">Aucune commande en cours.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                  <tr><th className="p-4">Cmd #</th><th className="p-4">Client</th><th className="p-4">Montant</th><th className="p-4">Statut Actuel</th><th className="p-4">Action Rapide</th></tr>
                </thead>
                <tbody>
                  {activeOrders.map(order => (
                    <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1E3A8A]">#{order.id}</td>
                      <td className="p-4">{order.client?.name || 'Client inconnu'}</td>
                      <td className="p-4 font-black">{parseFloat(order.total_amount).toLocaleString()} FCFA</td>
                      <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                      <td className="p-4 flex gap-2">
                        {order.status === 'confirmed' && <button onClick={() => updateStatus(order.id, 'preparing')} className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold hover:bg-amber-200 w-full">Préparer</button>}
                        {order.status === 'preparing' && <button onClick={() => updateStatus(order.id, 'ready')} className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-200 w-full">Prêt à retirer</button>}
                        {order.status === 'ready' && <button onClick={() => updateStatus(order.id, 'delivered')} className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-200 w-full">Livré ✔</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ONGLET 2 : HISTORIQUE (FINALISÉES) */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {historyOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <i className="fa-solid fa-folder-open text-5xl mb-4"></i>
                <p className="font-bold text-lg">Aucun historique disponible.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm opacity-80">
                <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                  <tr><th className="p-4">Cmd #</th><th className="p-4">Client</th><th className="p-4">Date</th><th className="p-4">Montant</th><th className="p-4">Statut Final</th></tr>
                </thead>
                <tbody>
                  {historyOrders.map(order => (
                    <tr key={order.id} className="border-b border-slate-100">
                      <td className="p-4 font-bold text-slate-500">#{order.id}</td>
                      <td className="p-4">{order.client?.name}</td>
                      <td className="p-4">{order.created_at || 'Date inconnue'}</td>
                      <td className="p-4 font-bold">{parseFloat(order.total_amount).toLocaleString()} FCFA</td>
                      <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ONGLET 3 : STOCK (identique à avant) */}
        {activeTab === 'stock' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            <div className={`rounded-2xl shadow-sm border p-8 w-full lg:w-1/3 sticky top-20 transition-all ${isEditMode ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${isEditMode ? 'text-amber-800' : 'text-[#1E293B]'}`}>
                  <i className={`fa-solid ${isEditMode ? 'fa-pen-to-square text-amber-500' : 'fa-plus-circle text-[#1E3A8A]'}`}></i> 
                  {isEditMode ? 'Modifier le stock' : 'Ajouter au stock'}
                </h2>
              </div>
              
              <form onSubmit={handleStockSubmit} className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Médicament</label>
                    {!isEditMode && (
                      <button type="button" onClick={() => setShowNewMedModal(true)} className="text-xs font-bold text-[#38BDF8] hover:underline">
                        + Pas dans la liste ?
                      </button>
                    )}
                  </div>
                  <select 
                    required disabled={isEditMode} 
                    value={stockForm.medicament_id}
                    onChange={(e) => setStockForm({...stockForm, medicament_id: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#1E3A8A] bg-white text-sm disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">-- Sélectionnez un médicament --</option>
                    {medicaments.map(med => (
                      <option key={med.id} value={med.id}>{med.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Prix (FCFA)</label>
                    <input 
                      type="number" required min="0"
                      value={stockForm.price}
                      onChange={(e) => setStockForm({...stockForm, price: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#1E3A8A] bg-white text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Quantité</label>
                    <input 
                      type="number" required min="0"
                      value={stockForm.quantity}
                      onChange={(e) => setStockForm({...stockForm, quantity: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#1E3A8A] bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button type="submit" className={`flex-1 text-white font-bold py-3 rounded-xl transition-colors shadow-md ${isEditMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#1E3A8A] hover:bg-[#1e40af]'}`}>
                    {isEditMode ? 'Enregistrer' : 'Mettre en rayon'}
                  </button>
                  {isEditMode && (
                    <button type="button" onClick={cancelEdit} className="px-4 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full lg:w-2/3 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#1E293B]">Votre Stock Actuel</h3>
                <span className="bg-blue-100 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full">{myStock.length} références</span>
              </div>
              
              {myStock.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  <i className="fa-solid fa-box-open text-4xl mb-3 text-slate-300"></i>
                  <p>Votre stock est vide.<br/>Ajoutez un médicament via le formulaire.</p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-500 uppercase border-b border-slate-200 bg-slate-50 text-xs">
                    <tr>
                      <th className="p-4">Médicament</th>
                      <th className="p-4">Prix de vente</th>
                      <th className="p-4">Quantité dispo</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myStock.map(item => (
                      <tr key={item.id} className={`border-b border-slate-100 transition-colors ${currentStockId === item.id ? 'bg-amber-50' : 'hover:bg-slate-50'}`}>
                        <td className="p-4 font-semibold text-[#1E293B]">
                          {item.medicament_name || item.medicament || "Nom inconnu"} 
                        </td>
                        <td className="p-4 font-bold text-green-600">{parseFloat(item.price).toLocaleString()} FCFA</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.quantity <= (item.min_stock_alert || 5) ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                            {item.quantity} unités
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button onClick={() => handleEditClick(item)} className="text-[#38BDF8] hover:text-[#1E3A8A] font-bold text-xs underline">
                            Modifier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}