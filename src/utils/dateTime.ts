import { format, formatInTimeZone } from 'date-fns-tz';

export function formatInTimezone(
  date: Date,
  timezone: string,
  formatStr: string = 'yyyy-MM-dd HH:mm:ss z'
): string {
  try {
    return formatInTimeZone(date, timezone, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return format(date, formatStr);
  }
}