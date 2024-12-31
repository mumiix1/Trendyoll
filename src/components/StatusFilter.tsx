import React from 'react';
import { Tag, AlertCircle } from 'lucide-react';
import type { ProductStatus } from '../types/marketplace';

interface StatusFilterProps {
  selectedStatuses: Partial<ProductStatus>;
  onStatusChange: (key: keyof ProductStatus) => void;
  showLowStock: boolean;
  onLowStockChange: (show: boolean) => void;
}

const statusConfigs: Array<{
  key: keyof ProductStatus;
  label: string;
  color: string;
}> = [
  { key: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
  { key: 'onSale', label: 'On Sale', color: 'bg-blue-100 text-blue-800' },
  { key: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-800' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  { key: 'blacklisted', label: 'Blacklisted', color: 'bg-purple-100 text-purple-800' },
];

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatuses,
  onStatusChange,
  showLowStock,
  onLowStockChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Filter by Status</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {statusConfigs.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => onStatusChange(key)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedStatuses[key]
                ? 'bg-blue-500 text-white'
                : `${color} hover:opacity-80`
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => onLowStockChange(!showLowStock)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-2 ${
            showLowStock
              ? 'bg-blue-500 text-white'
              : 'bg-red-100 text-red-800 hover:opacity-80'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          Low Stock
        </button>
      </div>
    </div>
  );
};