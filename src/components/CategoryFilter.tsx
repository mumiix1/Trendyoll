import React from 'react';
import { useCategories } from '../hooks/useCategories';
import { CategoryFilterButton } from './CategoryFilterButton';
import { Loader2 } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 text-red-500 text-sm">
        Failed to load categories: {error}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <CategoryFilterButton
          isSelected={!selectedCategory}
          onClick={() => onCategoryChange(null)}
          label="All Categories"
        />
        {Array.isArray(categories) && categories.map((category) => (
          <CategoryFilterButton
            key={category.id}
            isSelected={selectedCategory === category.name}
            onClick={() => onCategoryChange(category.name)}
            label={category.name}
          />
        ))}
      </div>
    </div>
  );
};