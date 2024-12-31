import React from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsCard } from '../components/settings/SettingsCard';
import { TableSettings } from '../components/settings/TableSettings';
import { ExportSettings } from '../components/settings/ExportSettings';
import { LocalizationSettings } from '../components/settings/LocalizationSettings';
import { ApiIntegrationSettings } from '../components/settings/ApiIntegrationSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {t('settings.title')}
          </h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 auto-rows-fr">
          <SettingsCard
            title="settings.api.title"
            description="settings.api.description"
            icon="network"
            gradient="from-purple-500 to-pink-500"
          >
            <ApiIntegrationSettings />
          </SettingsCard>

          <SettingsCard
            title="settings.localization.title"
            description="settings.localization.description"
            icon="globe"
            gradient="from-cyan-500 to-blue-500"
          >
            <LocalizationSettings />
          </SettingsCard>

          <SettingsCard
            title="settings.table.title"
            description="settings.table.description"
            icon="table"
            gradient="from-green-500 to-emerald-500"
          >
            <TableSettings />
          </SettingsCard>

          <SettingsCard
            title="settings.notifications.title"
            description="settings.notifications.description"
            icon="bell"
            gradient="from-orange-500 to-red-500"
          >
            <NotificationSettings />
          </SettingsCard>

          <SettingsCard
            title="settings.export.title"
            description="settings.export.description"
            icon="download"
            gradient="from-yellow-500 to-orange-500"
          >
            <ExportSettings />
          </SettingsCard>
        </div>
      </div>
    </div>
  );
};