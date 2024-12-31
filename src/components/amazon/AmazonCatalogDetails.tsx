import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Package, Tag, Truck } from 'lucide-react';
import { useAmazonCatalog } from '../../hooks/amazon/useAmazonCatalog';
import type { AmazonCatalogItem } from '../../types/amazon';

interface AmazonCatalogDetailsProps {
  asin: string;
}

export const AmazonCatalogDetails: React.FC<AmazonCatalogDetailsProps> = ({ asin }) => {
  const [details, setDetails] = useState<AmazonCatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getItemDetails } = useAmazonCatalog();

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        setError(null);
        const data = await getItemDetails(asin);
        setDetails(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load details';
        console.error('Failed to load catalog item details:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadDetails();
  }, [asin, getItemDetails]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center h-64 text-red-500 gap-2">
          <AlertCircle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Product Details</h2>
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
          {details.images?.[0] && (
            <img
              src={details.images[0].url}
              alt={details.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{details.title}</h3>
      </div>

      {/* Basic Info */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">ASIN</p>
            <p className="text-gray-900">{details.asin}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Brand</p>
            <p className="text-gray-900">{details.brand || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Product Type</p>
            <p className="text-gray-900">{details.productType}</p>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Attributes</h3>
        <div className="space-y-2">
          {Object.entries(details.attributes).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-500">{key}</span>
              <span className="text-gray-900">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};