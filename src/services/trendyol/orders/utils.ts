import { startOfDay, endOfDay, subHours } from 'date-fns';
import type { OrderDateRange } from './types';

const HOUR_ADJUSTMENT = 5;

export function getDateRange(date: Date): OrderDateRange {
  try {
    // First adjust the date by subtracting 5 hours
    const adjustedDate = subHours(date, HOUR_ADJUSTMENT);
    
    // Get start and end of the adjusted day
    const start = startOfDay(adjustedDate);
    const end = endOfDay(adjustedDate);
    
    // Convert to UTC timestamps in seconds
    return {
      startDate: Math.floor(start.getTime() / 1000),
      endDate: Math.floor(end.getTime() / 1000)
    };
  } catch (error) {
    console.error('Error calculating date range:', error);
    throw new Error('Failed to calculate date range');
  }
}