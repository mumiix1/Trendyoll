import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useProductBarcodeSearch } from '../hooks/useProductBarcodeSearch';
import { useSelectedProductsStore } from '../store/selectedProductsStore';

export const BarcodeSearchInput = () => {
  const [barcode, setBarcode] = useState('');
  const { searchByBarcode, loading, error } = useProductBarcodeSearch();
  const { addProduct } = useSelectedProductsStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!barcode.trim()) return;

    const products = await searchByBarcode(barcode.trim());
    if (products.length > 0) {
      addProduct(products[0]);
      setBarcode('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Barkod ile ürün ara..."
        className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute left-3 top-2.5">
        {loading ? (
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        ) : (
          <Search className="w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && (
        <p className="absolute left-0 top-full mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
};