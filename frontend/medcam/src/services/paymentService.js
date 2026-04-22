// src/services/paymentService.js
<<<<<<< Updated upstream
=======
// Format réponse Laravel : { success: true, message: "...", data: { ... } }

>>>>>>> Stashed changes
import api from './api';

/**
 * Service de gestion des paiements Mobile Money
 * Consomme les endpoints Laravel : /api/payments
 */
const paymentService = {
<<<<<<< Updated upstream
  /**
   * Initie un paiement Mobile Money
   * POST /payments/{orderId}/initiate
   *
   * @param {number} orderId
   * @param {'mtn_mobile_money' | 'orange_money'} method
   * @param {string} phoneNumber  - ex: "677123456"
   * @returns {Promise<{ success: boolean, transaction_id: string, message: string }>}
   */
  async initiatePayment(orderId, method, phoneNumber) {
    return api.post(`/payments/${orderId}/initiate`, {
      method,
      phone_number: phoneNumber,
    });
  },

  /**
   * Récupère le statut d'un paiement
   * GET /payments/{orderId}/status
   *
   * @param {number} orderId
   * @returns {Promise<{ status: 'pending' | 'paid' | 'failed' }>}
   */
  async getPaymentStatus(orderId) {
    return api.get(`/payments/${orderId}/status`);
=======

  // POST /payments/{orderId}/initiate
  // body: { method: 'mtn_mobile_money'|'orange_money', phone_number: '677XXXXXX' }
  // retourne { transaction_id, ... }
  async initiatePayment(orderId, method, phoneNumber) {
    const res = await api.post(`/payments/${orderId}/initiate`, {
      method,
      phone_number: phoneNumber,
    });
    return res.data.data; // { transaction_id }
  },

  // GET /payments/{orderId}/status
  // retourne le statut : 'pending' | 'paid' | 'failed'
  async getStatus(orderId) {
    const res = await api.get(`/payments/${orderId}/status`);
    return res.data.data.status; // string direct
>>>>>>> Stashed changes
  },
};

export default paymentService;
