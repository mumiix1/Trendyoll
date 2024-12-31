import React, { useState, useEffect } from 'react';
import { Clock, Filter, RefreshCw } from 'lucide-react';
import { useTrendyolOrders } from '../hooks';
import { formatDate, getRawDate } from '../utils/dateFormat';
import { useSettingsStore } from '../store/settingsStore';

export const Logs = () => {
  const { orders } = useTrendyolOrders();
  const { settings } = useSettingsStore();
  const [logs, setLogs] = useState<Array<{
    orderNumber: string;
    rawDate: string;
    timestamp: number;
    localDate: string;
    localTimestamp: string;
    timezoneOffset: string;
    totalPrice: string;
    status: string;
  }>>([]);

  useEffect(() => {
    if (orders.length > 0) {
      const orderLogs = orders.map(order => {
        const date = new Date(order.orderDate);
        return {
          orderNumber: order.orderNumber,
          rawDate: getRawDate(order.orderDate),
          timestamp: date.getTime(),
          localDate: formatDate(order.orderDate),
          localTimestamp: formatDate(order.orderDate, 'T'),
          timezoneOffset: formatDate(order.orderDate, 'xxx'),
          totalPrice: `${order.totalPrice} ${order.currency}`,
          status: order.status
        };
      });
      setLogs(orderLogs);
    }
  }, [orders, settings.timezone]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">System Logs</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Current Timezone: {settings.timezone}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Logs
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="font-medium">Order Date Processing Logs</h2>
        </div>
        
        <div className="divide-y">
          {logs.map((log) => (
            <div key={log.orderNumber} className="p-4 hover:bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Order #{log.orderNumber}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  log.status === 'shipped' ? 'bg-green-100 text-green-800' :
                  log.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {log.status}
                </span>
              </div>
              <div className="ml-6 space-y-1 text-sm font-mono">
                <p className="text-gray-600">
                  Raw API Date: {log.rawDate}
                </p>
                <p className="text-gray-600">
                  UTC Timestamp: {log.timestamp}
                </p>
                <p className="text-gray-600">
                  Local Time ({settings.timezone}): {log.localDate}
                </p>
                <p className="text-gray-600">
                  Local Timestamp: {log.localTimestamp}
                </p>
                <p className="text-gray-600">
                  Timezone Offset: {log.timezoneOffset}
                </p>
                <p className="text-gray-600">
                  Total Price: {log.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>

        {logs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No order logs available
          </div>
        )}
      </div>
    </div>
  );
};