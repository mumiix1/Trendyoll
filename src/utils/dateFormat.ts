import { format, isValid, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { tr } from 'date-fns/locale';
import { useSettingsStore } from '../store/settingsStore';

// Format constants
const DATE_FORMATS = {
  default: 'dd MMMM yyyy HH:mm:ss',
  selector: 'yyyy-MM-dd',
  short: 'dd MMM yyyy',
  time: 'HH:mm:ss',
  api: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  product: 'dd MMM yyyy HH:mm',
  order: 'dd MMMM yyyy HH:mm'
} as const;

// Get timezone from settings
function getTimezone(): string {
  return useSettingsStore.getState().settings.timezone;
}

// Format date with current timezone
export function formatDate(
  date: Date | string | number, 
  formatStr: string = DATE_FORMATS.default
): string {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
    
    if (!isValid(parsedDate)) {
      console.warn('Invalid date provided:', date);
      return 'Invalid Date';
    }

    return formatInTimeZone(parsedDate, getTimezone(), formatStr, { locale: tr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Format Error';
  }
}

// Format date for API requests
export function formatDateForAPI(date: Date): string {
  return formatInTimeZone(date, getTimezone(), DATE_FORMATS.api);
}

// Get raw ISO string (for debugging)
export function getRawDate(date: Date | string | number): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return parsedDate.toISOString();
}

// Specific formatting functions
export const formatOrderDate = (date: Date | string | number): string => 
  formatDate(date, DATE_FORMATS.order);

export const formatProductDate = (date: Date | string | number): string => 
  formatDate(date, DATE_FORMATS.product);

export const formatDateForSelector = (date: Date): string => 
  formatDate(date, DATE_FORMATS.selector);

export const formatShortDate = (date: Date | string | number): string => 
  formatDate(date, DATE_FORMATS.short);