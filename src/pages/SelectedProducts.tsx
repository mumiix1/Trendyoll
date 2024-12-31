import React, { useState } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Trash2, RefreshCw, Save } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { BarcodeSearchInput } from '../components/BarcodeSearchInput';
import { ProductsTable } from '../components/table/ProductsTable';
import { Pagination } from '../components/Pagination';
import { columns } from '../components/table/columns';
import { useSelectedProductsStore } from '../store/selectedProductsStore';
import { useProductSearch } from '../hooks/useProductSearch';
import { useSelectedProductsUpdates } from '../hooks/useSelectedProductsUpdates';
import { formatInTimezone } from '../utils/dateTime';
import { useSettingsStore } from '../store/settingsStore';

const PAGE_SIZE = 10;

export const SelectedProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const { selectedProducts, clearProducts } = useSelectedProductsStore();
  const { 
    updating, 
    lastUpdated, 
    refreshProducts, 
    updateStockAndPrices,
    error 
  } = useSelectedProductsUpdates();
  const { settings } = useSettingsStore();

  // Apply search filter
  const filteredProducts = useProductSearch(selectedProducts, searchQuery);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize: PAGE_SIZE,
        pageIndex,
      },
    },
    pageCount: Math.ceil(filteredProducts.length / PAGE_SIZE),
  });

  const handlePageChange = (page: number) => {
    setPageIndex(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Seçilen Ürünler</h1>
        <div className="flex items-center gap-4">
          <BarcodeSearchInput />
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="Seçili ürünlerde ara..."
          />
          <button
            onClick={clearProducts}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Tümünü Temizle
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Toplam <span className="font-semibold">{selectedProducts.length}</span> ürün seçildi
            {searchQuery && (
              <> • Aranan: <span className="font-semibold">{filteredProducts.length}</span> sonuç</>
            )}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => void updateStockAndPrices()}
              disabled={updating || selectedProducts.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              Stokları Güncelle
            </button>
            <button
              onClick={refreshProducts}
              disabled={updating}
              className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
              title="Stokları Yenile"
            >
              <RefreshCw className={`w-5 h-5 ${updating ? 'animate-spin' : ''}`} />
            </button>
            <div className="text-sm text-gray-500">
              {lastUpdated ? (
                <span>
                  Son güncelleme: {
                    formatInTimezone(
                      lastUpdated,
                      settings.timezone,
                      'HH:mm:ss'
                    )
                  }
                </span>
              ) : (
                <span>Güncelleniyor...</span>
              )}
            </div>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {selectedProducts.length > 0 ? (
          <>
            <ProductsTable table={table} />
            <Pagination
              currentPage={pageIndex}
              totalPages={table.getPageCount()}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">Henüz ürün seçilmedi</p>
          </div>
        )}
      </div>
    </div>
  );
};