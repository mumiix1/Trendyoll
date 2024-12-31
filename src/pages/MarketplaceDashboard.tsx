import React, { useState, useMemo } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CategoryDropdown } from '../components/CategoryDropdown';
import { BrandDropdown } from '../components/BrandDropdown';
import { StatusFilter } from '../components/StatusFilter';
import { ProductsTable } from '../components/table/ProductsTable';
import { ProductStats } from '../components/ProductStats';
import { Pagination } from '../components/Pagination';
import { columns } from '../components/table/columns';
import { useTrendyolProducts } from '../hooks/useTrendyolProducts';
import { useProductSearch } from '../hooks/useProductSearch';
import type { ProductStatus } from '../types/marketplace';

const PAGE_SIZE = 20;

export const MarketplaceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<Partial<ProductStatus>>({});
  const [showLowStock, setShowLowStock] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // Fetch all products
  const { products, loading } = useTrendyolProducts();

  // Apply search filter
  const searchedProducts = useProductSearch(products, searchQuery);

  // Apply category and brand filters
  const filteredProducts = useMemo(() => {
    let filtered = [...searchedProducts];
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (showLowStock) {
      filtered = filtered.filter(product => product.stock <= 10);
    }

    // Apply status filters
    Object.entries(selectedStatuses).forEach(([status, isSelected]) => {
      if (isSelected) {
        filtered = filtered.filter(product => product.status[status as keyof ProductStatus]);
      }
    });
    
    return filtered;
  }, [searchedProducts, selectedCategory, selectedBrand, selectedStatuses, showLowStock]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      }
    },
    pageCount: Math.ceil(filteredProducts.length / pageSize),
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6000]" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1920px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Trendyol Products</h1>
        <div className="w-full lg:w-auto max-w-xl">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search by product name or barcode..."
          />
        </div>
      </div>

      {/* Stats Section */}
      <ProductStats 
        products={products}
        filteredProducts={filteredProducts}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        selectedStatuses={selectedStatuses}
      />
      
      {/* Filters Section */}
      <div className="space-y-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-3">Category</h2>
            <CategoryDropdown 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory}
              products={products}
            />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Brand</h2>
            <BrandDropdown
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              products={products}
            />
          </div>
        </div>
        
        <StatusFilter
          selectedStatuses={selectedStatuses}
          onStatusChange={(status) => {
            setSelectedStatuses(prev => ({
              ...prev,
              [status]: !prev[status]
            }));
          }}
          showLowStock={showLowStock}
          onLowStockChange={setShowLowStock}
        />
      </div>

      {/* Table Section */}
      <div className="mt-6 space-y-4">
        <ProductsTable table={table} />
        <Pagination
          currentPage={pageIndex}
          totalPages={table.getPageCount()}
          onPageChange={setPageIndex}
        />
      </div>
    </div>
  );
};