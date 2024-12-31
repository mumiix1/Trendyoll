import React from 'react';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';
import type { AmazonAnalyticsData } from '../../../types/amazon';

interface AmazonMetricsGridProps {
  metrics: AmazonAnalyticsData;
}

export const AmazonMetricsGrid: React.FC<AmazonMetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-semibold">
              ${metrics.totalSales.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              {metrics.salesGrowth > 0 ? '+' : ''}{metrics.salesGrowth}% vs. prev period
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Orders</p>
            <p className="text-2xl font-semibold">{metrics.totalOrders}</p>
            <p className="text-xs text-gray-500">
              {metrics.orderGrowth > 0 ? '+' : ''}{metrics.orderGrowth}% vs. prev period
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-semibold">{metrics.conversionRate}%</p>
            <p className="text-xs text-gray-500">
              {metrics.conversionGrowth > 0 ? '+' : ''}{metrics.conversionGrowth}% vs. prev period
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Users className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">New Customers</p>
            <p className="text-2xl font-semibold">{metrics.newCustomers}</p>
            <p className="text-xs text-gray-500">
              {metrics.customerGrowth > 0 ? '+' : ''}{metrics.customerGrowth}% vs. prev period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};