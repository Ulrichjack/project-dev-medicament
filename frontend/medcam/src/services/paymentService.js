import api from './api';

const paymentService = {
  async pay(orderId, method, phoneNumber) {
    const res = await api.post(`/orders/${orderId}/pay`, {
      method,
      phone_number: phoneNumber,
    });
    return res.data.data || res.data;
  },
  async getPaymentStatus(orderId) {
    const res = await api.get(`/payments/${orderId}/status`);
    return res.data.data || res.data;
  },
};
export default paymentService;