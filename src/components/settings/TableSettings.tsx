import React from 'react';
import { Table } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTableSettings } from '../../store/settingsStore';

const densityOptions = [
  { value: 'compact', label: 'settings.table.densityModes.compact' },
  { value: 'comfortable', label: 'settings.table.densityModes.comfortable' },
  { value: 'spacious', label: 'settings.table.densityModes.spacious' },
] as const;

export const TableSettings = () => {
  const { t } = useTranslation();
  const { tableSettings, updateTableSettings } = useTableSettings();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Table className="w-5 h-5 text-gray-500" />
        <div className="flex-1 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('settings.table.pageSize')}
            </label>
            <select
              value={tableSettings.defaultPageSize}
              onChange={(e) => updateTableSettings('defaultPageSize', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {t('settings.table.itemsPerPage', { size })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('settings.table.density')}
            </label>
            <div className="mt-2 flex gap-3">
              {densityOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateTableSettings('densityMode', value)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    tableSettings.densityMode === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(label)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium">{t('settings.table.gridLines')}</span>
            <input
              type="checkbox"
              checked={tableSettings.showGridLines}
              onChange={(e) => updateTableSettings('showGridLines', e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};