import { parseISO, format } from 'date-fns';
import type { Order } from '../types/orders';

export function debugOrderDates(orders: Order[], selectedDate: Date) {
  // Clear previous logs
  console.clear();
  console.group('🔍 Order Date Analysis');
  
  console.log('📅 Selected Date:', format(selectedDate, 'yyyy-MM-dd HH:mm:ss'));
  console.log('📊 Total Orders:', orders.length);
  
  // Sort orders by date for easier analysis
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
  );

  sortedOrders.forEach(order => {
    const orderDate = parseISO(order.orderDate);
    
    console.group(`\n📦 Order ${order.orderNumber}`);
    console.log('Raw Date:', order.orderDate);
    console.log('Parsed Date:', format(orderDate, 'yyyy-MM-dd HH:mm:ss'));
    console.log('Status:', order.status);
    console.log('Amount:', `${order.totalPrice} ${order.currency}`);
    console.groupEnd();
  });
  
  console.groupEnd();
}