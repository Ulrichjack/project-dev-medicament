import api from './api';

const paymentService = {
  async initiatePayment(orderId, method, phoneNumber) {
    const res = await api.post(`/payments/${orderId}/initiate`, {
      method,
      phone_number: phoneNumber,
    });
    return res.data.data;
  },
  async getStatus(orderId) {
    const res = await api.get(`/payments/${orderId}/status`);
    return res.data.data.status;
  },
};
export default paymentService;