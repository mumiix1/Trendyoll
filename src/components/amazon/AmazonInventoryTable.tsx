import React from 'react';
import { Edit2, ExternalLink } from 'lucide-react';
import type { AmazonInventoryItem } from '../../types/amazon';

interface AmazonInventoryTableProps {
  inventory: AmazonInventoryItem[];
}

export const AmazonInventoryTable: React.FC<AmazonInventoryTableProps> = ({ inventory }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            SKU
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ASIN
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Condition
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fulfillment
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {inventory.map((item) => (
          <tr key={item.sku} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.sku}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {item.asin}
                <a
                  href={`https://amazon.com/dp/${item.asin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.condition}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
              {item.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.fulfillmentType === 'FBA'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {item.fulfillmentType}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              <button
                className="text-blue-500 hover:text-blue-600"
                title="Edit Inventory"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};