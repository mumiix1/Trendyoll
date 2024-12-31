import React from 'react';
import { FileDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useExportSettings } from '../../store/settingsStore';

const formatOptions = [
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'xlsx', label: 'Excel' },
] as const;

const dateFormats = [
  { value: 'YYYY-MM-DD', label: '2024-03-21' },
  { value: 'DD/MM/YYYY', label: '21/03/2024' },
  { value: 'MM/DD/YYYY', label: '03/21/2024' },
];

export const ExportSettings = () => {
  const { t } = useTranslation();
  const { exportSettings, updateExportSettings } = useExportSettings();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <FileDown className="w-5 h-5 text-gray-500" />
        <div className="flex-1 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('settings.export.format')}
            </label>
            <div className="mt-2 flex gap-3">
              {formatOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateExportSettings('format', value)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    exportSettings.format === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('settings.export.dateFormat')}
            </label>
            <select
              value={exportSettings.dateFormat}
              onChange={(e) => updateExportSettings('dateFormat', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {dateFormats.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium">{t('settings.export.includeImages')}</span>
            <input
              type="checkbox"
              checked={exportSettings.includeImages}
              onChange={(e) => updateExportSettings('includeImages', e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};