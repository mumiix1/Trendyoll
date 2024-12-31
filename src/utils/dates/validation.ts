import { isValid, parseISO } from 'date-fns';

export function validateDate(date: Date | string | number): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date provided');
  }
  
  return parsedDate;
}