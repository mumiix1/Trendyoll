import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';
import { TimeDisplay } from '../TimeDisplay';

// Common timezones with GMT labels
const timezones = [
  { value: 'UTC', label: 'GMT+0 (UTC)' },
  { value: 'Europe/London', label: 'GMT+0/+1 (London)' },
  { value: 'Europe/Vienna', label: 'GMT+1/+2 (Vienna)' },
  { value: 'Europe/Istanbul', label: 'GMT+3 (Istanbul)' },
  { value: 'America/New_York', label: 'GMT-5/-4 (New York)' },
  { value: 'Asia/Dubai', label: 'GMT+4 (Dubai)' },
  { value: 'Asia/Tokyo', label: 'GMT+9 (Tokyo)' },
  { value: 'Australia/Sydney', label: 'GMT+10/+11 (Sydney)' }
] as const;

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'de', name: 'Deutsch' },
] as const;

export const LocalizationSettings = () => {
  const { t, i18n } = useTranslation();
  const { settings, updateSettings, updateTimezone } = useSettingsStore();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    void i18n.changeLanguage(newLang);
    updateSettings('language', newLang);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTimezone(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Globe className="w-5 h-5 text-gray-500" />
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('settings.localization.language')}
            </label>
            <select
              value={settings.language}
              onChange={handleLanguageChange}
              className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {languages.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('settings.localization.timezone')}
            </label>
            <select
              value={settings.timezone}
              onChange={handleTimezoneChange}
              className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {timezones.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <TimeDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};