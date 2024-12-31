import React, { useState } from 'react';
import { Package, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { useAmazonInventory } from '../../hooks/amazon/useAmazonInventory';
import { SearchBar } from '../../components/SearchBar';
import { Pagination } from '../../components/Pagination';
import { AmazonInventoryTable } from '../../components/amazon/AmazonInventoryTable';

export const AmazonInventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const { inventory, loading, error, refresh } = useAmazonInventory();

  const filteredInventory = inventory.filter(item =>
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.asin.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Package className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Amazon Inventory</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by SKU or ASIN..."
          />
          <button
            onClick={() => void refresh()}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
            title="Refresh Inventory"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-4">
        <AmazonInventoryTable inventory={filteredInventory} />
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(filteredInventory.length / 20)}
        onPageChange={setPage}
      />
    </div>
  );
};