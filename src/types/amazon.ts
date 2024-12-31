// Add these types to the existing amazon.ts file

export interface AmazonSalesData {
  date: string;
  amount: number;
}

export interface AmazonPerformanceMetric {
  current: number;
  trend: number;
}

export interface AmazonPerformanceMetrics {
  orderDefectRate: AmazonPerformanceMetric;
  lateShipmentRate: AmazonPerformanceMetric;
  customerSatisfaction: AmazonPerformanceMetric;
  returnRate: AmazonPerformanceMetric;
  stockOutRate: AmazonPerformanceMetric;
}

export interface AmazonAnalyticsData {
  totalSales: number;
  salesGrowth: number;
  totalOrders: number;
  orderGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  newCustomers: number;
  customerGrowth: number;
  salesData: AmazonSalesData[];
  performance: AmazonPerformanceMetrics;
}