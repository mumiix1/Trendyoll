import { useSettingsStore } from '../../store/settingsStore';

// Get timezone from settings
export function getTimezone(): string {
  return useSettingsStore.getState().settings.timezone;
}

// Get timezone offset in minutes
export function getTimezoneOffset(): number {
  const date = new Date();
  return -date.getTimezoneOffset();
}

// Check if timezone is valid
export function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (e) {
    return false;
  }
}