import { format, isValid, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { tr } from 'date-fns/locale';
import { useSettingsStore } from '../../store/settingsStore';
import { DATE_FORMATS } from './constants';

// Get timezone from settings
function getTimezone(): string {
  return useSettingsStore.getState().settings.timezone;
}

// Format date with current timezone
export function formatDate(
  date: Date | string | number,
  formatStr: string = DATE_FORMATS.default,
  timezone?: string
): string {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
    
    if (!isValid(parsedDate)) {
      console.warn('Invalid date provided:', date);
      return 'Invalid Date';
    }

    const tz = timezone || getTimezone();
    return formatInTimeZone(parsedDate, tz, formatStr, { locale: tr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Format Error';
  }
}

// Get raw ISO string
export function getRawDate(date: Date | string | number): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return parsedDate.toISOString();
}

// Format date for API requests
export function formatDateForAPI(date: Date): string {
  return date.toISOString();
}

// Specific formatting functions
export const formatOrderDate = (date: Date | string | number, timezone?: string): string => 
  formatDate(date, DATE_FORMATS.order, timezone);

export const formatProductDate = (date: Date | string | number, timezone?: string): string => 
  formatDate(date, DATE_FORMATS.product, timezone);

export const formatDateForSelector = (date: Date): string => 
  format(date, DATE_FORMATS.selector);

export const formatShortDate = (date: Date | string | number, timezone?: string): string => 
  formatDate(date, DATE_FORMATS.short, timezone);