import React from 'react';
import type { AmazonSalesData } from '../../../types/amazon';

interface AmazonSalesChartProps {
  data: AmazonSalesData[];
}

export const AmazonSalesChart: React.FC<AmazonSalesChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.amount));
  const chartHeight = 200;

  return (
    <div className="relative h-[200px]">
      <div className="absolute inset-0 flex items-end">
        {data.map((item, index) => {
          const height = (item.amount / maxValue) * chartHeight;
          return (
            <div
              key={item.date}
              className="flex-1 flex flex-col items-center group"
            >
              <div className="relative w-full px-1">
                <div
                  className="w-full bg-blue-500 rounded-t opacity-75 hover:opacity-100 transition-opacity"
                  style={{ height: `${height}px` }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${item.amount.toFixed(2)}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};