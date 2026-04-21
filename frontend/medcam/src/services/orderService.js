// src/services/orderService.js
import api from './api';

/**
 * Service de gestion des commandes
 * Consomme les endpoints Laravel : /api/orders
 */
const orderService = {
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
  },
};

export default orderService;
