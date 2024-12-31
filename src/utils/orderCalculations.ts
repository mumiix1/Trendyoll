import type { Order } from '../types/orders';

export function calculateOrderStats(orders: Order[]) {
  const activeOrders = orders.filter(order => order.status !== 'cancelled');
  
  const total = orders.length;
  const totalAmount = activeOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageAmount = activeOrders.length > 0 ? totalAmount / activeOrders.length : 0;

  return {
    total,
    totalAmount,
    averageAmount,
    activeOrdersCount: activeOrders.length,
    canceledOrdersCount: total - activeOrders.length
  };
}