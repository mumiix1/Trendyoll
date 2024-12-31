import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { getTimezone } from './timezone';
import { validateDate } from './validation';

// Convert local date to UTC
export function toUTC(date: Date | string | number): Date {
  const validDate = validateDate(date);
  const timezone = getTimezone();
  return zonedTimeToUtc(validDate, timezone);
}

// Convert UTC date to local timezone
export function fromUTC(date: Date | string | number): Date {
  const validDate = validateDate(date);
  const timezone = getTimezone();
  return utcToZonedTime(validDate, timezone);
}