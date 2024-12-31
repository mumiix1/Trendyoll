import React from 'react';

interface CategoryFilterButtonProps {
  isSelected: boolean;
  onClick: () => void;
  label: string;
}

export const CategoryFilterButton: React.FC<CategoryFilterButtonProps> = ({
  isSelected,
  onClick,
  label
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};