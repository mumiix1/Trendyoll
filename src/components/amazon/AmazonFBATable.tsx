import React from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import type { AmazonFBAInventoryItem } from '../../types/amazon';

interface AmazonFBATableProps {
  inventory: AmazonFBAInventoryItem[];
}

export const AmazonFBATable: React.FC<AmazonFBATableProps> = ({ inventory }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            SKU
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Available
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reserved
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fulfillment Center
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Condition
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {inventory.map((item) => (
          <tr key={item.fnSku} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    FNSKU: {item.fnSku}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {item.sellerSku}
                <a
                  href={`https://sellercentral.amazon.com/inventory/ref=xx_invmgr_dnav_xx?tbm=fba&sku=${item.sellerSku}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <span className={`text-sm font-medium ${
                item.availableQuantity < item.reorderPoint
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}>
                {item.availableQuantity}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <span className="text-sm text-gray-900">
                {item.reservedQuantity}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-sm text-gray-500">
                {item.fulfillmentCenter}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.condition === 'New'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.condition}
                </span>
                {item.isExpirable && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};