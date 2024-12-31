import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

export const NotificationSettings = () => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="space-y-4">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <label
          key={key}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
        >
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {t(`settings.notifications.${key}`)}
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => 
                updateSettings('notifications', {
                  ...settings.notifications,
                  [key]: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </div>
        </label>
      ))}
    </div>
  );
};