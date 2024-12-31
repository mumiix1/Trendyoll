import { parseISO, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import type { Order } from '../../types/orders';

export function logDateConversion(date: string | Date, timezone: string) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  console.group('🕒 Date Conversion');
  console.log('Input Date:', date);
  console.log('GMT+0:', formatInTimeZone(parsedDate, 'UTC', 'yyyy-MM-dd HH:mm:ss'));
  console.log('GMT+3:', formatInTimeZone(parsedDate, 'Europe/Istanbul', 'yyyy-MM-dd HH:mm:ss'));
  console.log(`Selected (${timezone}):`, formatInTimeZone(parsedDate, timezone, 'yyyy-MM-dd HH:mm:ss'));
  console.log('Raw UTC:', parsedDate.toISOString());
  console.log('UTC Timestamp:', parsedDate.getTime());
  console.groupEnd();
}

export function analyzeOrderDates(orders: Order[], timezone: string) {
  console.group('📅 Order Dates Analysis');
  console.log('Current Timezone:', timezone);
  console.log('Total Orders:', orders.length);
  
  orders.forEach(order => {
    const parsedDate = parseISO(order.orderDate);
    
    console.group(`Order #${order.orderNumber}`);
    console.log('Raw API Date:', order.orderDate);
    console.log('GMT+0:', formatInTimeZone(parsedDate, 'UTC', 'yyyy-MM-dd HH:mm:ss'));
    console.log('GMT+3:', formatInTimeZone(parsedDate, 'Europe/Istanbul', 'yyyy-MM-dd HH:mm:ss'));
    console.log(`Selected (${timezone}):`, formatInTimeZone(parsedDate, timezone, 'yyyy-MM-dd HH:mm:ss'));
    console.log('UTC Timestamp:', parsedDate.getTime());
    console.log('Order Status:', order.status);
    console.groupEnd();
  });
  
  console.groupEnd();
}