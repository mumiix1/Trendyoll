import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AmazonCredentials, AmazonRegion } from '../types/amazon';

interface AmazonState {
  credentials?: AmazonCredentials;
  region: AmazonRegion;
  isConfigured: boolean;
  updateCredentials: (credentials: AmazonCredentials) => void;
  updateRegion: (region: AmazonRegion) => void;
}

export const useAmazonStore = create<AmazonState>()(
  persist(
    (set) => ({
      region: 'na',
      isConfigured: false,
      updateCredentials: (credentials) =>
        set({ credentials, isConfigured: true }),
      updateRegion: (region) =>
        set({ region })
    }),
    {
      name: 'amazon-store'
    }
  )
);