import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Search, Box, BarChart } from 'lucide-react';

const menuItems = [
  { 
    path: '/amazon/inventory',
    icon: Package,
    label: 'Inventory Management'
  },
  { 
    path: '/amazon/orders',
    icon: ShoppingCart,
    label: 'Orders'
  },
  { 
    path: '/amazon/catalog',
    icon: Search,
    label: 'Catalog Search'
  },
  { 
    path: '/amazon/fba',
    icon: Box,
    label: 'FBA Shipments'
  },
  { 
    path: '/amazon/analytics',
    icon: BarChart,
    label: 'Analytics'
  }
];

export const AmazonDropdown: React.FC = () => {
  return (
    <div className="pl-12 space-y-1">
      {menuItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          className="flex items-center text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Icon className="w-4 h-4 mr-3" />
          {label}
        </Link>
      ))}
    </div>
  );
};