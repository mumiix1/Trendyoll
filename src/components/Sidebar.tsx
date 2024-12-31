import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Store,
  ShoppingBag, 
  Package, 
  ShoppingCart, 
  ListChecks,
  Search,
  Box,
  BarChart,
  FileText,
  Settings,
  ChevronDown
} from 'lucide-react';
import clsx from 'clsx';

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  indent?: boolean;
}

const MenuItem = ({ to, icon, label, indent = false }: MenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
        indent ? 'ml-4' : '',
        isActive 
          ? 'bg-white/10 text-white' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const [showAmazonMenu, setShowAmazonMenu] = useState(true);
  const [showTrendyolMenu, setShowTrendyolMenu] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <aside className="w-72 bg-gray-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Store className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            E-Commerce Hub
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {/* Trendyol Section */}
        <div>
          <button
            onClick={() => setShowTrendyolMenu(!showTrendyolMenu)}
            className={clsx(
              'w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200',
              location.pathname.startsWith('/marketplace/trendyol')
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">{t('common.marketplace.trendyol')}</span>
            </div>
            <ChevronDown className={clsx(
              'w-4 h-4 transition-transform duration-200',
              showTrendyolMenu ? 'rotate-180' : ''
            )} />
          </button>

          {showTrendyolMenu && (
            <div className="mt-1 space-y-1">
              <MenuItem 
                to="/marketplace/trendyol"
                icon={<Package className="w-4 h-4" />}
                label={t('common.navigation.products')}
                indent
              />
              <MenuItem 
                to="/marketplace/trendyol/orders"
                icon={<ShoppingCart className="w-4 h-4" />}
                label={t('common.navigation.orders')}
                indent
              />
              <MenuItem 
                to="/marketplace/trendyol/selected"
                icon={<ListChecks className="w-4 h-4" />}
                label={t('common.navigation.selectedProducts')}
                indent
              />
            </div>
          )}
        </div>

        {/* Amazon Section */}
        <div>
          <button
            onClick={() => setShowAmazonMenu(!showAmazonMenu)}
            className={clsx(
              'w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200',
              location.pathname.startsWith('/amazon')
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">{t('common.marketplace.amazon')}</span>
            </div>
            <ChevronDown className={clsx(
              'w-4 h-4 transition-transform duration-200',
              showAmazonMenu ? 'rotate-180' : ''
            )} />
          </button>

          {showAmazonMenu && (
            <div className="mt-1 space-y-1">
              <MenuItem 
                to="/amazon/inventory"
                icon={<Package className="w-4 h-4" />}
                label={t('common.navigation.inventory')}
                indent
              />
              <MenuItem 
                to="/amazon/orders"
                icon={<ShoppingCart className="w-4 h-4" />}
                label={t('common.navigation.orders')}
                indent
              />
              <MenuItem 
                to="/amazon/catalog"
                icon={<Search className="w-4 h-4" />}
                label={t('common.navigation.catalog')}
                indent
              />
              <MenuItem 
                to="/amazon/fba"
                icon={<Box className="w-4 h-4" />}
                label={t('common.navigation.fbaShipments')}
                indent
              />
              <MenuItem 
                to="/amazon/analytics"
                icon={<BarChart className="w-4 h-4" />}
                label={t('common.navigation.analytics')}
                indent
              />
            </div>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-white/10">
          <MenuItem 
            to="/logs"
            icon={<FileText className="w-5 h-5" />}
            label={t('common.navigation.systemLogs')}
          />
          <MenuItem 
            to="/settings"
            icon={<Settings className="w-5 h-5" />}
            label={t('common.navigation.settings')}
          />
        </div>
      </nav>
    </aside>
  );
};