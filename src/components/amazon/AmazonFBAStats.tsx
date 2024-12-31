import React, { useMemo } from 'react';
import { Package, AlertTriangle, TrendingUp } from 'lucide-react';
import type { AmazonFBAInventoryItem } from '../../types/amazon';

interface AmazonFBAStatsProps {
  inventory: AmazonFBAInventoryItem[];
}

export const AmazonFBAStats: React.FC<AmazonFBAStatsProps> = ({ inventory }) => {
  const stats = useMemo(() => {
    const totalItems = inventory.length;
    const totalUnits = inventory.reduce((sum, item) => 
      sum + item.availableQuantity + item.reservedQuantity, 0
    );
    const lowStock = inventory.filter(item => 
      item.availableQuantity < item.reorderPoint
    ).length;
    const expiringSoon = inventory.filter(item => 
      item.isExpirable && item.daysUntilExpiration <= 90
    ).length;

    return {
      totalItems,
      totalUnits,
      lowStock,
      expiringSoon
    };
  }, [inventory]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total FBA Items</p>
            <p className="text-2xl font-semibold">{stats.totalItems}</p>
            <p className="text-sm text-gray-500">
              {stats.totalUnits} total units
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Inventory Alerts</p>
            <p className="text-2xl font-semibold">{stats.lowStock}</p>
            <p className="text-sm text-gray-500">
              items below reorder point
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Expiring Soon</p>
            <p className="text-2xl font-semibold">{stats.expiringSoon}</p>
            <p className="text-sm text-gray-500">
              items expiring in 90 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};