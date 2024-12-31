import type { OrderAddress, OrderItem } from '../../../types/orders';

export interface TrendyolOrderLine {
  quantity: number;
  salesCampaignId?: number;
  productSize?: string;
  merchantSku?: string;
  productName: string;
  productCode: number;
  merchantId: number;
  amount: number;
  discount: number;
  currencyCode: string;
  id: number;
  sku: string;
  vatBaseAmount: number;
  barcode: string;
  orderLineItemStatusName: string;
  price: number;
}

export interface TrendyolOrderAddress {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  cityCode?: number;
  district: string;
  districtId?: number;
  postalCode: string;
  countryCode: string;
  neighborhoodId?: number;
  neighborhood?: string;
  phone: string | null;
  fullName: string;
  fullAddress: string;
}

export interface TrendyolOrder {
  shipmentAddress: TrendyolOrderAddress;
  orderNumber: string;
  grossAmount: number;
  totalDiscount: number;
  totalTyDiscount: number;
  invoiceAddress: TrendyolOrderAddress;
  customerFirstName: string;
  customerEmail: string;
  customerId: number;
  customerLastName: string;
  id: number;
  cargoTrackingNumber: string;
  cargoTrackingLink: string;
  cargoSenderNumber: string;
  cargoProviderName: string;
  lines: TrendyolOrderLine[];
  orderDate: number;
  tcIdentityNumber: string;
  currencyCode: string;
  packageHistories: Array<{
    createdDate: number;
    status: string;
  }>;
  shipmentPackageStatus: string;
  status: string;
  deliveryType: string;
  timeSlotId: number;
  scheduledDeliveryStoreId: string;
  estimatedDeliveryStartDate?: number;
  estimatedDeliveryEndDate?: number;
  totalPrice: number;
  deliveryAddressType: string;
}

export interface TrendyolOrdersResponse {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  content: TrendyolOrder[];
}

export interface OrderDateRange {
  startDate: number;
  endDate: number;
}