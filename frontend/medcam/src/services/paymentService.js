import api from './api';

const paymentService = {
  async pay(orderId, method, phoneNumber) {
    const res = await api.post(`/orders/${orderId}/pay`, {
      method,
      phone_number: phoneNumber,
    });
    return res.data.data;
  },
};
export default paymentService;