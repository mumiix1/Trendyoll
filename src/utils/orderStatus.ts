import type { OrderStatus } from '../types/orders';

interface StatusStyle {
  background: string;
  text: string;
}

const STATUS_STYLES: Record<OrderStatus, StatusStyle> = {
  created: {
    background: 'bg-blue-100',
    text: 'text-blue-800'
  },
  picking: {
    background: 'bg-yellow-100',
    text: 'text-yellow-800'
  },
  shipped: {
    background: 'bg-green-100',
    text: 'text-green-800'
  },
  delivered: {
    background: 'bg-green-100',
    text: 'text-green-800'
  },
  cancelled: {
    background: 'bg-red-100',
    text: 'text-red-800'
  }
};

const DEFAULT_STYLE: StatusStyle = {
  background: 'bg-gray-100',
  text: 'text-gray-800'
};

export function getStatusStyle(status: string): string {
  const statusKey = status.toLowerCase() as OrderStatus;
  const style = STATUS_STYLES[statusKey] || DEFAULT_STYLE;
  return `${style.background} ${style.text}`;
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    created: 'Oluşturuldu',
    picking: 'Hazırlanıyor',
    shipped: 'Kargoya Verildi',
    delivered: 'Teslim Edildi',
    cancelled: 'İptal Edildi'
  };
  return labels[status] || status;
}