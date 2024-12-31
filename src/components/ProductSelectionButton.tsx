import React from 'react';
import { Plus, Check } from 'lucide-react';
import { useSelectedProductsStore } from '../store/selectedProductsStore';
import type { Product } from '../types/marketplace';

interface ProductSelectionButtonProps {
  product: Product;
}

export const ProductSelectionButton: React.FC<ProductSelectionButtonProps> = ({ product }) => {
  const { addProduct, removeProduct, isSelected } = useSelectedProductsStore();
  const selected = isSelected(product.id);

  const handleClick = () => {
    if (selected) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1 rounded-md transition-colors ${
        selected 
          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={selected ? 'Seçimi Kaldır' : 'Ürünü Seç'}
    >
      {selected ? (
        <Check className="w-4 h-4" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
    </button>
  );
};