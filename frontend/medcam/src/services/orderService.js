// src/services/orderService.js
<<<<<<< Updated upstream
=======
// Format réponse Laravel : { success: true, message: "...", data: { ... } }
// On retourne toujours data.data pour avoir directement l'objet métier

>>>>>>> Stashed changes
import api from './api';

/**
 * Service de gestion des commandes
 * Consomme les endpoints Laravel : /api/orders
 */
const orderService = {
<<<<<<< Updated upstream
  /**
   * Crée une nouvelle commande
   * POST /orders
   *
   * @param {Object} data
   * @param {number}   data.pharmacy_id
   * @param {Array}    data.items              - [{ medicament_id, quantity, unit_price }]
   * @param {string}   data.delivery_address
   * @param {number}   [data.delivery_latitude]
   * @param {number}   [data.delivery_longitude]
   * @param {string}   [data.notes]
   * @returns {Promise<Object>} commande créée avec son id
   */
  async createOrder(data) {
    return api.post('/orders', data);
  },

  /**
   * Récupère toutes les commandes de l'utilisateur connecté
   * GET /orders
   *
   * @returns {Promise<Array>}
   */
  async getMyOrders() {
    return api.get('/orders');
  },

  /**
   * Récupère une commande par son ID (avec items, paiement, livraison)
   * GET /orders/{id}
   *
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getOrderById(id) {
    return api.get(`/orders/${id}`);
  },

  /**
   * Annule une commande
   * PATCH /orders/{id}/cancel
   *
   * @param {number} id
   * @returns {Promise<Object>} commande annulée
   */
  async cancelOrder(id) {
    return api.patch(`/orders/${id}/cancel`);
=======

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
>>>>>>> Stashed changes
  },
};

export default orderService;
