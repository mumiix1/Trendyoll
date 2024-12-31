import React, { useState } from 'react';
import { ShoppingCart, RefreshCw, AlertCircle } from 'lucide-react';
import { useAmazonOrders } from '../../hooks/amazon/useAmazonOrders';
import { AmazonOrdersTable } from '../../components/amazon/AmazonOrdersTable';
import { AmazonOrderStats } from '../../components/amazon/AmazonOrderStats';
import { DateRangeSelector } from '../../components/DateRangeSelector';
import { Pagination } from '../../components/Pagination';

export const AmazonOrders: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const { orders, loading, error, refresh } = useAmazonOrders(selectedDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 gap-2">
        <AlertCircle className="w-6 h-6" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1920px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Amazon Orders</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <DateRangeSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <button
            onClick={() => void refresh()}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
            title="Refresh Orders"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AmazonOrderStats orders={orders} />

      <div className="bg-white rounded-lg shadow-sm mb-4">
        <AmazonOrdersTable orders={orders} />
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(orders.length / 20)}
        onPageChange={setPage}
      />
    </div>
  );
};