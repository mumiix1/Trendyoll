import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { AmazonCatalogItem } from '../../types/amazon';

interface AmazonCatalogTableProps {
  items: AmazonCatalogItem[];
  onSelectItem: (asin: string) => void;
  selectedAsin: string | null;
}

export const AmazonCatalogTable: React.FC<AmazonCatalogTableProps> = ({
  items,
  onSelectItem,
  selectedAsin
}) => {
  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Enter a search term to find products
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ASIN
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Brand
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr 
            key={item.asin}
            onClick={() => onSelectItem(item.asin)}
            className={`cursor-pointer hover:bg-gray-50 ${
              selectedAsin === item.asin ? 'bg-blue-50' : ''
            }`}
          >
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                {item.images?.[0] && (
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-12 h-12 object-contain rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {item.asin}
                <a
                  href={`https://amazon.com/dp/${item.asin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.brand || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">
                {item.productType}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};