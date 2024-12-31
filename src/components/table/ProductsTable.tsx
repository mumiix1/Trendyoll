import React from 'react';
import { flexRender, type Table } from '@tanstack/react-table';
import type { Product } from '../../types/marketplace';

interface ProductsTableProps {
  table: Table<Product>;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ table }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#FF6000] text-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Products ({table.getRowModel().rows.length})</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="opacity-90">Show</span>
            <select 
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="bg-white text-[#FF6000] rounded px-3 py-1.5 font-medium"
            >
              {[20, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="opacity-90">items</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    style={{ 
                      width: header.column.columnDef.size,
                      minWidth: header.column.columnDef.size 
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}
                className="hover:bg-[#FF6000]/5 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-600"
                    style={{ 
                      width: cell.column.columnDef.size,
                      minWidth: cell.column.columnDef.size 
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};