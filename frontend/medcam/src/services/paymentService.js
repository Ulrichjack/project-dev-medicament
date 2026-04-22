// src/services/paymentService.js
// Format réponse Laravel : { success: true, message: "...", data: { ... } }

import api from './api';

const paymentService = {

  // POST /payments/{orderId}/initiate
  // body: { method: 'mtn_mobile_money'|'orange_money', phone_number: '677XXXXXX' }
  // retourne { transaction_id, ... }
  async initiatePayment(orderId, method, phoneNumber) {
    const res = await api.post(`/payments/${orderId}/initiate`, {
      method,
      phone_number: phoneNumber,
    });
<<<<<<< Updated upstream
    return res.data.data;
  },
  async getStatus(orderId) {
    const res = await api.get(`/payments/${orderId}/status`);
    return res.data.data.status;
=======
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
