// src/services/orderService.js
// Format réponse Laravel : { success: true, message: "...", data: { ... } }
// On retourne toujours data.data pour avoir directement l'objet métier

import api from './api';

const orderService = {
  // POST /orders
  // body: { pharmacy_id, items:[{medicament_id, quantity, unit_price}],
  //         delivery_address, delivery_latitude, delivery_longitude, notes }
  // retourne la commande créée avec son id
  async createOrder(data) {
    const res = await api.post('/orders', data);
    return res.data.data; // { id, status, total_amount, ... }
  },

  // GET /orders
  // retourne la liste de mes commandes
  async getMyOrders() {
    const res = await api.get('/orders');
    return res.data.data; // []
  },

  // GET /orders/{id}
  // retourne les détails : items + paiement + livraison
  async getOrderById(id) {
    const res = await api.get(`/orders/${id}`);
    return res.data.data; // { id, status, total_amount, items, ... }
  },

  // PATCH /orders/{id}/cancel
  // retourne la commande annulée
  async cancelOrder(id) {
    const res = await api.patch(`/orders/${id}/cancel`);
    return res.data.data;
  },
};

export default orderService;