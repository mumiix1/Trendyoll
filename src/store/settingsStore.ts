import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserSettings } from '../types/settings';

interface SettingsState {
  settings: UserSettings;
  updateSettings: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  updateTableSettings: <K extends keyof UserSettings['table']>(key: K, value: UserSettings['table'][K]) => void;
  updateExportSettings: <K extends keyof UserSettings['export']>(key: K, value: UserSettings['export'][K]) => void;
  updateTimezone: (timezone: string) => void;
}

const defaultSettings: UserSettings = {
  notifications: {
    lowStock: true,
    priceChanges: true,
    newOrders: true,
    statusUpdates: true,
  },
  api: {
    rateLimit: 100,
    timeout: 30000,
    retryAttempts: 3,
  },
  table: {
    defaultPageSize: 25,
    densityMode: 'comfortable',
    showGridLines: true,
  },
  export: {
    format: 'csv',
    includeImages: true,
    dateFormat: 'YYYY-MM-DD',
  },
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      updateSettings: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      updateTableSettings: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            table: {
              ...state.settings.table,
              [key]: value,
            },
          },
        })),
      updateExportSettings: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            export: {
              ...state.settings.export,
              [key]: value,
            },
          },
        })),
      updateTimezone: (timezone) => {
        set((state) => ({
          settings: {
            ...state.settings,
            timezone,
          },
        }));
        // Force re-render of components using dates
        window.dispatchEvent(new Event('timezonechange'));
      },
    }),
    {
      name: 'user-settings',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// Custom hooks for specific settings
export const useTableSettings = () => {
  const { settings, updateTableSettings } = useSettingsStore();
  return {
    tableSettings: settings.table,
    updateTableSettings,
  };
};

export const useExportSettings = () => {
  const { settings, updateExportSettings } = useSettingsStore();
  return {
    exportSettings: settings.export,
    updateExportSettings,
  };
};