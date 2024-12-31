import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import type { Theme } from '../../types/theme';

const themes: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
];

export const ThemeSettings = () => {
  const { settings, updateTheme } = useSettingsStore();

  return (
    <div className="flex gap-4">
      {themes.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => updateTheme(value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            settings.theme === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};