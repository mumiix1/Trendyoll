import React, { useState } from 'react';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import { useAmazonCatalog } from '../../hooks/amazon/useAmazonCatalog';
import { SearchBar } from '../../components/SearchBar';
import { AmazonCatalogTable } from '../../components/amazon/AmazonCatalogTable';
import { AmazonCatalogDetails } from '../../components/amazon/AmazonCatalogDetails';

export const AmazonCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsin, setSelectedAsin] = useState<string | null>(null);
  const { items, loading, error, searchCatalog } = useAmazonCatalog();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      void searchCatalog(query);
    }
  };

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
          <Search className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Amazon Catalog Search</h1>
        </div>
        
        <div className="w-96">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by keyword, ASIN, or UPC..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <AmazonCatalogTable 
                items={items}
                onSelectItem={(asin) => setSelectedAsin(asin)}
                selectedAsin={selectedAsin}
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedAsin && (
            <AmazonCatalogDetails asin={selectedAsin} />
          )}
        </div>
      </div>
    </div>
  );
};