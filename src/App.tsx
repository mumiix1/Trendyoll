import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Settings } from './pages/Settings';
import { MarketplaceDashboard } from './pages/MarketplaceDashboard';
import Orders from './pages/Orders';
import { SelectedProducts } from './pages/SelectedProducts';
import { Logs } from './pages/Logs';
import { AmazonInventory } from './pages/amazon/AmazonInventory';
import { AmazonOrders } from './pages/amazon/AmazonOrders';
import { AmazonCatalog } from './pages/amazon/AmazonCatalog';
import { AmazonFBA } from './pages/amazon/AmazonFBA';
import { AmazonAnalytics } from './pages/amazon/AmazonAnalytics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            {/* Change default route to Selected Products */}
            <Route path="/" element={<Navigate to="/marketplace/trendyol/selected" replace />} />
            
            {/* Trendyol Routes */}
            <Route path="/marketplace/trendyol" element={<MarketplaceDashboard />} />
            <Route path="/marketplace/trendyol/orders" element={<Orders />} />
            <Route path="/marketplace/trendyol/selected" element={<SelectedProducts />} />
            
            {/* Amazon Routes */}
            <Route path="/amazon/inventory" element={<AmazonInventory />} />
            <Route path="/amazon/orders" element={<AmazonOrders />} />
            <Route path="/amazon/catalog" element={<AmazonCatalog />} />
            <Route path="/amazon/fba" element={<AmazonFBA />} />
            <Route path="/amazon/analytics" element={<AmazonAnalytics />} />
            
            {/* System Routes */}
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;