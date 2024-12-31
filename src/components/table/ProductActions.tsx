import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { ProductUpdateModal } from '../ProductUpdateModal';
import type { Product } from '../../types/marketplace';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowUpdateModal(true)}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
        title="Düzenle"
      >
        <Edit2 className="w-4 h-4" />
      </button>

      {showUpdateModal && (
        <ProductUpdateModal
          product={product}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
};