import React, { useState } from 'react';
import { Box, RefreshCw, AlertCircle, Filter } from 'lucide-react';
import { useAmazonFBA } from '../../hooks/amazon/useAmazonFBA';
import { AmazonFBATable } from '../../components/amazon/AmazonFBATable';
import { AmazonFBAStats } from '../../components/amazon/AmazonFBAStats';
import { AmazonFBAFilters } from '../../components/amazon/AmazonFBAFilters';
import { Pagination } from '../../components/Pagination';

export const AmazonFBA: React.FC = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    status: 'all',
    fulfillmentCenter: '',
    daysUntilExpiration: 0
  });

  const { inventory, loading, error, refresh } = useAmazonFBA(filters);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 gap-2">
        <AlertCircle className="w-6 h-6" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1920px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Box className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Amazon FBA Inventory</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => void refresh()}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
            title="Refresh FBA Inventory"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AmazonFBAStats inventory={inventory} />
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <AmazonFBAFilters
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-4">
        <AmazonFBATable inventory={inventory} />
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(inventory.length / 20)}
        onPageChange={setPage}
      />
    </div>
  );
};