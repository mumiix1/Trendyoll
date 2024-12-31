import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { AmazonPerformanceMetrics } from '../../../types/amazon';

interface AmazonPerformanceTableProps {
  metrics: AmazonPerformanceMetrics;
}

export const AmazonPerformanceTable: React.FC<AmazonPerformanceTableProps> = ({ metrics }) => {
  return (
    <div className="divide-y">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="py-3 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{value.current}%</span>
            <span className={`flex items-center text-xs ${
              value.trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {value.trend > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(value.trend)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};