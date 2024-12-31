import React from 'react';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import type { Order } from '../../types/orders';
import { calculateOrderStats } from '../../utils/orderCalculations';

interface OrderStatsProps {
  orders: Order[];
}

export function OrderStats({ orders }: OrderStatsProps) {
  const stats = calculateOrderStats(orders);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Orders</p>
            <p className="text-2xl font-semibold">{stats.activeOrdersCount}</p>
            {stats.canceledOrdersCount > 0 && (
              <p className="text-xs text-gray-500">
                ({stats.canceledOrdersCount} canceled)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount (Active)</p>
            <p className="text-2xl font-semibold">
              {stats.totalAmount.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingDown className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="text-2xl font-semibold">
              {stats.averageAmount.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}