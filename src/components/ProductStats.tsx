import React from 'react';
import { Package } from 'lucide-react';
import type { Product, ProductStatus } from '../types/marketplace';

interface ProductStatsProps {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string | null;
  selectedBrand: string | null;
  selectedStatuses: Partial<ProductStatus>;
}

export const ProductStats: React.FC<ProductStatsProps> = ({
  products,
  filteredProducts,
  selectedCategory,
  selectedBrand,
  selectedStatuses,
}) => {
  const activeStatuses = Object.entries(selectedStatuses)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-2 bg-[#FF6000]/10 rounded-full">
          <Package className="w-5 h-5 text-[#FF6000]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600">
            {selectedCategory || selectedBrand || activeStatuses.length > 0 ? (
              <span className="flex flex-wrap gap-1">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
                {selectedCategory && <> in <span className="font-semibold">{selectedCategory}</span></>}
                {selectedBrand && <> by <span className="font-semibold">{selectedBrand}</span></>}
                {activeStatuses.length > 0 && (
                  <>
                    {' '}with status{activeStatuses.length > 1 ? 'es' : ''}{' '}
                    <span className="font-semibold">
                      {activeStatuses.join(', ')}
                    </span>
                  </>
                )}
              </span>
            ) : (
              <>
                Total Products: <span className="font-semibold">{products.length}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};