import api from './api';

const orderService = {
  async createOrder(data) { return api.post('/orders', data); },
  async getMyOrders() { return api.get('/orders'); },
  async getOrderById(id) { return api.get(`/orders/${id}`); },
  async cancelOrder(id) { return api.patch(`/orders/${id}/cancel`); },
};
export default orderService;