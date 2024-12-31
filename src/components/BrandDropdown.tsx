import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { useAvailableBrands } from '../hooks/useAvailableBrands';
import type { Product } from '../types/marketplace';

interface BrandDropdownProps {
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
  products: Product[];
}

export const BrandDropdown: React.FC<BrandDropdownProps> = ({
  selectedBrand,
  onBrandChange,
  products
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { brands, loading, error } = useAvailableBrands(products);

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (brand: string | null) => {
    onBrandChange(brand);
    setIsOpen(false);
    setSearch('');
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading brands...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load brands: {error}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-2 text-sm bg-white border rounded-lg shadow-sm hover:bg-gray-50"
      >
        <span className="truncate">
          {selectedBrand || 'All Brands'}
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search brands..."
          />
          <div className="py-1">
            <button
              onClick={() => handleSelect(null)}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                !selectedBrand ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              All Brands
            </button>
            {filteredBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleSelect(brand)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  selectedBrand === brand ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                {brand}
              </button>
            ))}
            {filteredBrands.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                No brands found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};