import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate, formatDateForSelector } from '../utils/dateFormat';

interface DateRangeSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-[#FF6000]" />
        <input
          type="date"
          value={formatDateForSelector(selectedDate)}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6000] text-gray-700"
        />
        <span className="text-sm text-gray-500">
          {formatDate(selectedDate)}
        </span>
      </div>
    </div>
  );
};