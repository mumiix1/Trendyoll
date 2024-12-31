import React, { useState } from 'react';
import { BarChart, RefreshCw, AlertCircle } from 'lucide-react';
import { useAmazonAnalytics } from '../../hooks/amazon/useAmazonAnalytics';
import { AmazonSalesChart } from '../../components/amazon/analytics/AmazonSalesChart';
import { AmazonMetricsGrid } from '../../components/amazon/analytics/AmazonMetricsGrid';
import { AmazonPerformanceTable } from '../../components/amazon/analytics/AmazonPerformanceTable';
import { DateRangeSelector } from '../../components/DateRangeSelector';

export const AmazonAnalytics: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { metrics, loading, error, refresh } = useAmazonAnalytics(selectedDate);

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
          <BarChart className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Amazon Analytics</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <DateRangeSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <button
            onClick={() => void refresh()}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
            title="Refresh Analytics"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AmazonMetricsGrid metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <AmazonSalesChart data={metrics.salesData} />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <AmazonPerformanceTable metrics={metrics.performance} />
        </div>
      </div>
    </div>
  );
};