import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatInTimeZone } from 'date-fns-tz';
import { useSettingsStore } from '../store/settingsStore';

export const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { settings } = useSettingsStore();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleTimezoneChange = () => {
      setCurrentTime(new Date());
    };

    window.addEventListener('timezonechange', handleTimezoneChange);
    return () => {
      clearInterval(timer);
      window.removeEventListener('timezonechange', handleTimezoneChange);
    };
  }, []);

  const formatStr = 'EEEE, MMMM d, yyyy HH:mm:ss zzz';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-900">Time Display</span>
      </div>

      <div className="space-y-2 ml-6">
        {/* GMT+0 */}
        <div className="text-sm">
          <span className="text-gray-500">GMT+0: </span>
          <span className="font-mono">
            {formatInTimeZone(currentTime, 'UTC', formatStr)}
          </span>
        </div>

        {/* GMT+3 */}
        <div className="text-sm">
          <span className="text-gray-500">GMT+3: </span>
          <span className="font-mono">
            {formatInTimeZone(currentTime, 'Europe/Istanbul', formatStr)}
          </span>
        </div>

        {/* Selected Timezone */}
        <div className="text-sm">
          <span className="text-gray-500">Selected ({settings.timezone}): </span>
          <span className="font-mono">
            {formatInTimeZone(currentTime, settings.timezone, formatStr)}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 ml-6">
        {t('settings.localization.timezone')}: {settings.timezone}
      </p>
    </div>
  );
};