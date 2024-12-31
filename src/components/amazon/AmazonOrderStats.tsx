import React, { useMemo } from 'react';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import type { AmazonOrder } from '../../types/amazon';

interface AmazonOrderStatsProps {
  orders: AmazonOrder[];
}

export const AmazonOrderStats: React.FC<AmazonOrderStatsProps> = ({ orders }) => {
  const stats = useMemo(() => {
    const total = orders.length;
    const totalAmount = orders.reduce((sum, order) => sum + order.orderTotal.amount, 0);
    const averageAmount = total > 0 ? totalAmount / total : 0;
    const fbaOrders = orders.filter(order => order.fulfillmentChannel === 'AFN').length;
    const fbmOrders = total - fbaOrders;

    return {
      total,
      totalAmount,
      averageAmount,
      fbaOrders,
      fbmOrders
    };
  }, [orders]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
            <div className="mt-1 text-xs text-gray-500">
              <span className="text-blue-600">{stats.fbaOrders} FBA</span>
              <span className="mx-1">•</span>
              <span className="text-purple-600">{stats.fbmOrders} FBM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-semibold">
              ${stats.totalAmount.toFixed(2)}
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
              ${stats.averageAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};