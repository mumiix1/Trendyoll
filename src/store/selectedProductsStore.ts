import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/marketplace';

interface SelectedProductsState {
  selectedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  isSelected: (productId: string) => boolean;
  updateProducts: (products: Product[]) => void;
}

export const useSelectedProductsStore = create<SelectedProductsState>()(
  persist(
    (set, get) => ({
      selectedProducts: [],
      addProduct: (product) =>
        set((state) => ({
          selectedProducts: [...state.selectedProducts, product],
        })),
      removeProduct: (productId) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.filter((p) => p.id !== productId),
        })),
      clearProducts: () => set({ selectedProducts: [] }),
      isSelected: (productId) => 
        get().selectedProducts.some((p) => p.id === productId),
      updateProducts: (updatedProducts) =>
        set((state) => {
          // Create a map of updated products for faster lookup
          const updatedMap = new Map(
            updatedProducts.map(product => [product.barcode, product])
          );

          // Update existing products while preserving order
          const updated = state.selectedProducts.map(existing => {
            const updated = updatedMap.get(existing.barcode);
            return updated || existing;
          });

          return { selectedProducts: updated };
        }),
    }),
    {
      name: 'selected-products',
    }
  )
);