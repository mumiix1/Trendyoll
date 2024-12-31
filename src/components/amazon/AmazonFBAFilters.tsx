import React from 'react';
import { Calendar } from 'lucide-react';

interface FBAFilters {
  status: string;
  fulfillmentCenter: string;
  daysUntilExpiration: number;
}

interface AmazonFBAFiltersProps {
  filters: FBAFilters;
  onFilterChange: (filters: FBAFilters) => void;
}

export const AmazonFBAFilters: React.FC<AmazonFBAFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="unfulfillable">Unfulfillable</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fulfillment Center
        </label>
        <input
          type="text"
          value={filters.fulfillmentCenter}
          onChange={(e) => onFilterChange({ ...filters, fulfillmentCenter: e.target.value })}
          placeholder="Enter FC code"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Days Until Expiration
        </label>
        <div className="relative">
          <input
            type="number"
            value={filters.daysUntilExpiration}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              daysUntilExpiration: parseInt(e.target.value) || 0 
            })}
            min="0"
            placeholder="Enter days"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
          />
          <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};