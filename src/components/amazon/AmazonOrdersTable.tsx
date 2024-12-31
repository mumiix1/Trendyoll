import React from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import type { AmazonOrder } from '../../types/amazon';
import { formatProductDate } from '../../utils/dateFormat';

interface AmazonOrdersTableProps {
  orders: AmazonOrder[];
}

export const AmazonOrdersTable: React.FC<AmazonOrdersTableProps> = ({ orders }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Channel
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.amazonOrderId} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <div className="flex items-center gap-2">
                {order.amazonOrderId}
                <a
                  href={`https://sellercentral.amazon.com/orders-v3/order/${order.amazonOrderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatProductDate(order.purchaseDate)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                order.orderStatus === 'Shipped' 
                  ? 'bg-green-100 text-green-800'
                  : order.orderStatus === 'Pending' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {order.orderStatus}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                order.fulfillmentChannel === 'AFN'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {order.fulfillmentChannel}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
              {order.orderTotal.amount.toFixed(2)} {order.orderTotal.currencyCode}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              <button
                className="text-blue-500 hover:text-blue-600"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};