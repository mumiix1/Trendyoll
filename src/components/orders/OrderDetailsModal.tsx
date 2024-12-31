import React from 'react';
import { X } from 'lucide-react';
import { getStatusStyle } from '../../utils/orderStatus';
import { formatProductDate } from '../../utils/dateFormat';
import type { Order } from '../../types/orders';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Sipariş Detayları - #{order.orderNumber}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Sipariş Bilgileri</h3>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Tarih:</span>{' '}
                    {formatProductDate(order.orderDate)}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Durum:</span>{' '}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Toplam Tutar:</span>{' '}
                    <span className="font-medium">{order.totalPrice.toFixed(2)} {order.currency}</span>
                  </p>
                </div>
              </div>

              {/* Rest of the modal content remains the same */}
              {/* ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};