import type { Order } from '../../../types/orders';

export const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD001',
    status: 'shipped',
    orderDate: new Date().toISOString(),
    totalPrice: 299.99,
    currency: 'TRY',
    cargoTrackingNumber: 'TRK123456',
    cargoProviderName: 'FastCargo',
    shipmentAddress: {
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Istanbul',
      district: 'Kadikoy',
      postalCode: '34700',
      countryCode: 'TR',
      phone: '+90 555 123 4567'
    },
    invoiceAddress: {
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Istanbul',
      district: 'Kadikoy',
      postalCode: '34700',
      countryCode: 'TR',
      phone: '+90 555 123 4567'
    },
    items: [
      {
        lineItemId: '1',
        merchantId: 1,
        barcode: 'WEP001',
        title: 'Wireless Earbuds Pro',
        quantity: 1,
        price: 299.99,
        currency: 'TRY'
      }
    ]
  }
];