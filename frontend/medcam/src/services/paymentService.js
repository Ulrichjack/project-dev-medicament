// src/services/paymentService.js
import api from './api';

/**
 * Service de gestion des paiements Mobile Money
 * Consomme les endpoints Laravel : /api/payments
 */
const paymentService = {
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
  },
};

export default paymentService;
