import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { useAvailableCategories } from '../hooks/useAvailableCategories';
import type { Product } from '../types/marketplace';

interface CategoryDropdownProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  products: Product[];
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
  products
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { categories, loading, error } = useAvailableCategories(products);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
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

  const handleSelect = (category: string | null) => {
    onCategoryChange(category);
    setIsOpen(false);
    setSearch('');
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load categories: {error}
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
          {selectedCategory || 'All Categories'}
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
          />
          <div className="py-1">
            <button
              onClick={() => handleSelect(null)}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                !selectedCategory ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              All Categories
            </button>
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelect(category.name)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  selectedCategory === category.name ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
            {filteredCategories.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};