import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Bell } from 'lucide-react';
import { useTrendyolProducts } from '../hooks/useTrendyolProducts';
import { formatInTimezone } from '../utils/dateTime';
import { useSettingsStore } from '../store/settingsStore';

export const Notifications = () => {
  const { t } = useTranslation();
  const { products, loading } = useTrendyolProducts();
  const { settings } = useSettingsStore();
  
  const outOfStockProducts = products.filter(product => product.stock === 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-red-100 rounded-lg">
            <Bell className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('notifications.title')}
          </h1>
        </div>

        {outOfStockProducts.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
            <div className="p-4 bg-red-50 border-b border-red-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h2 className="font-semibold text-red-900">
                  {t('notifications.lowStock.title')}
                </h2>
              </div>
              <p className="mt-1 text-sm text-red-700">
                {t('notifications.lowStock.description', {
                  count: outOfStockProducts.length,
                })}
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {outOfStockProducts.map((product) => (
                <div key={product.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {t('notifications.lastUpdated', {
                          date: formatInTimezone(
                            new Date(),
                            settings.timezone,
                            'PPP'
                          ),
                        })}
                      </p>
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      {t('notifications.outOfStock')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('notifications.empty.title')}
            </h3>
            <p className="text-gray-500">
              {t('notifications.empty.description')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};