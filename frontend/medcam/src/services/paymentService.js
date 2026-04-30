import api from './api';

const paymentService = {
  async initiatePayment(orderId, method, phoneNumber) {
    return api.post(`/payments/${orderId}/initiate`, { method, phone_number: phoneNumber });
  },
  async getPaymentStatus(orderId) {
    return api.get(`/payments/${orderId}/status`);
  },
};
export default paymentService;