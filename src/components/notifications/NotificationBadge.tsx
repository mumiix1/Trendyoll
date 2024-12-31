import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTrendyolProducts } from '../../hooks/useTrendyolProducts';

export const NotificationBadge = () => {
  const { t } = useTranslation();
  const { products } = useTrendyolProducts();
  
  const outOfStockCount = products.filter(product => product.stock === 0).length;
  
  if (!outOfStockCount) return null;
  
  return (
    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
      {outOfStockCount}
    </div>
  );
};