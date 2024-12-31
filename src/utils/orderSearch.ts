import { parseISO, format } from 'date-fns';
import type { Order } from '../types/orders';

export function findOrderDetails(orders: Order[], orderNumbers: string[]) {
  const foundOrders = orders.filter(order => 
    orderNumbers.includes(order.orderNumber)
  );

  return foundOrders.map(order => {
    const orderDate = parseISO(order.orderDate);
    
    return {
      orderNumber: order.orderNumber,
      date: format(orderDate, 'yyyy-MM-dd HH:mm:ss'),
      totalPrice: `${order.totalPrice} ${order.currency}`,
      status: order.status
    };
  });
}