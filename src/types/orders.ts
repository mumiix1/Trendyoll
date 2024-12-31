export type OrderStatus = 'created' | 'picking' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderAddress {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  district: string;
  postalCode: string;
  countryCode: string;
  phone: string;
}

export interface OrderItem {
  lineItemId: string;
  merchantId: number;
  barcode: string;
  title: string;
  quantity: number;
  price: number;
  currency: string;
  productDetails?: Product;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  orderDate: string;
  totalPrice: number;
  currency: string;
  cargoTrackingNumber?: string;
  cargoProviderName?: string;
  shipmentAddress: OrderAddress;
  invoiceAddress: OrderAddress;
  items: OrderItem[];
}

export interface OrdersResponse {
  content: Order[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}