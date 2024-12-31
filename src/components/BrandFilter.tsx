import React from 'react';
import { Tag } from 'lucide-react';
import { CategoryFilterButton } from './CategoryFilterButton';
import { useAvailableBrands } from '../hooks/useAvailableBrands';
import type { Product } from '../types/marketplace';

interface BrandFilterProps {
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
  products: Product[];
}

export const BrandFilter: React.FC<BrandFilterProps> = ({
  selectedBrand,
  onBrandChange,
  products
}) => {
  const { brands, loading, error } = useAvailableBrands(products);

  if (loading) {
    return (
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Tag className="w-4 h-4 animate-spin" />
        <span>Loading brands...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 text-red-500 text-sm">
        Failed to load brands: {error}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Brands</h2>
      <div className="flex flex-wrap gap-2">
        <CategoryFilterButton
          isSelected={!selectedBrand}
          onClick={() => onBrandChange(null)}
          label="All Brands"
        />
        {brands.map((brand) => (
          <CategoryFilterButton
            key={brand}
            isSelected={selectedBrand === brand}
            onClick={() => onBrandChange(brand)}
            label={brand}
          />
        ))}
      </div>
    </div>
  );
};