import { useState, useMemo } from 'react';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useSettingsStore } from '../store/settingsStore';
import { logDateConversion } from '../utils/dates/debug';
import type { Order } from '../types/orders';

export function useOrderFilters(orders: Order[]) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const { settings } = useSettingsStore();

  const filteredOrders = useMemo(() => {
    // Log selected date for debugging
    console.group('🔍 Filtering Orders');
    logDateConversion(selectedDate, settings.timezone);

    // Get start and end of the selected day in user's timezone
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    // Convert to UTC for comparison with API dates
    const utcStart = zonedTimeToUtc(dayStart, settings.timezone);
    const utcEnd = zonedTimeToUtc(dayEnd, settings.timezone);

    console.log('Filter Range (UTC):', {
      start: utcStart.toISOString(),
      end: utcEnd.toISOString()
    });
    console.groupEnd();

    return orders.filter(order => {
      try {
        const orderDate = parseISO(order.orderDate);
        return orderDate >= utcStart && orderDate <= utcEnd;
      } catch (error) {
        console.warn('Invalid order date:', order.orderDate);
        return false;
      }
    });
  }, [orders, selectedDate, settings.timezone]);

  return {
    selectedDate,
    setSelectedDate,
    filteredOrders
  };
}