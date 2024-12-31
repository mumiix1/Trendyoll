import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { ImagePreview } from '../ImagePreview';
import { ProductSelectionButton } from '../ProductSelectionButton';
import { ProductActions } from './ProductActions';
import type { Product } from '../../types/marketplace';

const columnHelper = createColumnHelper<Product>();

export const columns = [
  columnHelper.display({
    id: 'select',
    header: '',
    cell: ({ row }) => <ProductSelectionButton product={row.original} />,
    size: 60,
  }),
  columnHelper.accessor('imageUrl', {
    header: 'PRODUCT',
    cell: info => (
      <div className="flex items-center gap-3 min-w-[300px]">
        <ImagePreview
          src={info.getValue()}
          alt={info.row.original.title}
          size={48}
        />
        <div className="truncate">
          <span className="font-medium text-gray-900">{info.row.original.title}</span>
        </div>
      </div>
    ),
    size: 400,
  }),
  columnHelper.accessor('category', {
    header: 'CATEGORY',
    cell: info => (
      <span className="truncate block">{info.getValue()}</span>
    ),
    size: 150,
  }),
  columnHelper.accessor('barcode', {
    header: 'SKU',
    cell: info => (
      <span className="font-mono">{info.getValue()}</span>
    ),
    size: 120,
  }),
  columnHelper.accessor('price', {
    header: ({ column }) => (
      <div className="flex items-center justify-end">
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PRICE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      </div>
    ),
    cell: info => (
      <div className="text-right font-medium">
        {info.getValue().toFixed(2)} {info.row.original.currency}
      </div>
    ),
    size: 120,
  }),
  columnHelper.accessor('stock', {
    header: ({ column }) => (
      <div className="flex items-center justify-end">
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STOCK
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      </div>
    ),
    cell: info => (
      <div className={`text-right font-medium ${
        info.getValue() <= 10 ? 'text-red-600' : ''
      }`}>
        {info.getValue()}
      </div>
    ),
    size: 100,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => <ProductActions product={row.original} />,
    size: 100,
  }),
];