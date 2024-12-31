import type { Order, OrderAddress, OrderItem } from '../../../types/orders';
import type { TrendyolOrder, TrendyolOrderAddress, TrendyolOrderLine } from './types';

function mapAddress(address: TrendyolOrderAddress): OrderAddress {
  return {
    fullName: address.fullName,
    address1: address.address1,
    address2: address.address2 || '',
    city: address.city,
    district: address.district,
    postalCode: address.postalCode,
    countryCode: address.countryCode,
    phone: address.phone || ''
  };
}

function mapOrderItem(item: TrendyolOrderLine): OrderItem {
  return {
    lineItemId: item.id.toString(),
    merchantId: item.merchantId,
    barcode: item.barcode,
    title: item.productName,
    quantity: item.quantity,
    price: item.price,
    currency: item.currencyCode
  };
}

export function mapTrendyolOrder(order: TrendyolOrder): Order {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.shipmentPackageStatus,
    orderDate: new Date(order.orderDate).toISOString(),
    totalPrice: order.totalPrice,
    currency: order.currencyCode,
    cargoTrackingNumber: order.cargoTrackingNumber,
    cargoProviderName: order.cargoProviderName,
    shipmentAddress: mapAddress(order.shipmentAddress),
    invoiceAddress: mapAddress(order.invoiceAddress),
    items: order.lines.map(mapOrderItem)
  };
}