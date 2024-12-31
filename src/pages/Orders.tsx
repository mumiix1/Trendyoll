import React, { useState, useEffect } from 'react';
import { Package, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTrendyolOrders, useOrderFilters } from '../hooks';
import { DateFilter } from '../components/orders/DateFilter';
import { OrdersTable } from '../components/orders/OrdersTable';
import { OrderDetailsModal } from '../components/orders/OrderDetailsModal';
import { OrderStats } from '../components/orders/OrderStats';
import { findOrderDetails } from '../utils/orderSearch';
import type { Order } from '../types/orders';

const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { orders, loading, error, refresh } = useTrendyolOrders();
  const { selectedDate, setSelectedDate, filteredOrders } = useOrderFilters(orders);

  // Search for specific orders on component mount
  useEffect(() => {
    if (orders.length > 0) {
      const searchResults = findOrderDetails(orders, ['9897907694', '9897858206']);
      console.log('Found orders:', searchResults);
    }
  }, [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6000]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Siparişler</h1>
        <div className="flex items-center gap-4">
          <DateFilter
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <button
            onClick={() => void refresh()}
            className="flex items-center gap-2 px-4 py-2 text-[#FF6000] hover:bg-[#FF6000]/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Yenile
          </button>
        </div>
      </div>

      <OrderStats orders={filteredOrders} />

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Seçilen tarihte sipariş bulunmuyor.
          </p>
        </div>
      ) : (
        <OrdersTable 
          orders={filteredOrders} 
          onViewDetails={setSelectedOrder} 
        />
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;