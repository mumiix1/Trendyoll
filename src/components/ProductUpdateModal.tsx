import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useProductUpdate } from '../hooks/useProductUpdate';
import type { Product } from '../types/marketplace';

interface ProductUpdateModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductUpdateModal: React.FC<ProductUpdateModalProps> = ({ 
  product, 
  onClose 
}) => {
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());
  const { updateProducts, updating } = useProductUpdate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProduct = {
      ...product,
      price: parseFloat(price),
      stock: parseInt(stock, 10)
    };

    const result = await updateProducts([updatedProduct]);
    
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Ürün Güncelle</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ürün
            </label>
            <p className="text-sm text-gray-600">{product.title}</p>
            <p className="text-xs text-gray-500 mt-1">Barkod: {product.barcode}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fiyat (TRY)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {updating ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};