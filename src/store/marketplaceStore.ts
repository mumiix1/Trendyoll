import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Marketplace, MarketplaceCredentials } from '../types/marketplace';

interface MarketplaceState {
  marketplaces: Marketplace[];
  addMarketplace: (marketplace: Marketplace) => void;
  updateCredentials: (id: string, credentials: MarketplaceCredentials) => void;
}

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set) => ({
      marketplaces: [
        { 
          id: 'trendyol', 
          name: 'Trendyol', 
          icon: 'shopping-bag',
          credentials: {
            apiKey: '',
            apiSecret: '',
            sellerId: ''
          }
        }
      ],
      addMarketplace: (marketplace) =>
        set((state) => ({
          marketplaces: [...state.marketplaces, marketplace],
        })),
      updateCredentials: (id, credentials) =>
        set((state) => ({
          marketplaces: state.marketplaces.map((m) =>
            m.id === id ? { ...m, credentials } : m
          ),
        })),
    }),
    {
      name: 'marketplace-storage',
    }
  )
);