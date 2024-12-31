import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTrendyolProducts } from '../../hooks/useTrendyolProducts';

export const LowStockNotification = () => {
  const { t } = useTranslation();
  const { products, loading, error } = useTrendyolProducts();
  
  const outOfStockProducts = products.filter(product => product.stock === 0);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error || !outOfStockProducts.length) {
    return null;
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <h3 className="text-red-800 font-medium">
          {t('notifications.lowStock.title')}
        </h3>
      </div>
      <div className="mt-2">
        <p className="text-sm text-red-700">
          {t('notifications.lowStock.description', {
            count: outOfStockProducts.length
          })}
        </p>
        <div className="mt-3 max-h-40 overflow-y-auto">
          <ul className="space-y-1">
            {outOfStockProducts.map(product => (
              <li key={product.id} className="text-sm text-red-600 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {product.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};