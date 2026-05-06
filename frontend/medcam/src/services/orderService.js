import api from './api';

const orderService = {
  async createOrder(data) {
    const res = await api.post('/orders', data);
    return res.data.data || res.data;
  },
  async getMyOrders() {
    const res = await api.get('/orders');
    return res.data.data?.data || res.data.data || [];
  },
  async getOrderById(id) {
    const res = await api.get(`/orders/${id}`);
    return res.data.data || res.data;
  },
  async cancelOrder(id) {
    const res = await api.patch(`/orders/${id}/cancel`);
    return res.data.data || res.data;
  },
};
export default orderService;