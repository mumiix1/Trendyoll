export const en = {
  settings: {
    title: 'Settings',
    api: {
      title: 'API Integration',
      description: 'Configure your marketplace API credentials',
      marketplace: '{{name}} Integration',
      apiKey: 'API Key',
      apiKeyPlaceholder: 'Enter your API key',
      apiSecret: 'API Secret',
      apiSecretPlaceholder: 'Enter your API secret',
      sellerId: 'Seller ID',
      sellerIdPlaceholder: 'Enter your seller ID',
      saveCredentials: 'Save Credentials'
    },
    table: {
      title: 'Table Preferences',
      description: 'Customize the appearance and behavior of your data tables',
      pageSize: 'Default Page Size',
      itemsPerPage: '{{size}} items per page',
      density: 'Table Density',
      densityModes: {
        compact: 'Compact',
        comfortable: 'Comfortable',
        spacious: 'Spacious'
      },
      gridLines: 'Show Grid Lines'
    },
    export: {
      title: 'Export Settings',
      description: 'Configure your data export preferences',
      format: 'Default Export Format',
      dateFormat: 'Date Format',
      includeImages: 'Include Product Images'
    },
    localization: {
      title: 'Localization',
      description: 'Set your language and timezone preferences',
      language: 'Language',
      timezone: 'Timezone'
    },
    notifications: {
      title: 'Notification Settings',
      lowStock: 'Low Stock Alerts',
      priceChanges: 'Price Change Alerts',
      newOrders: 'New Order Notifications',
      statusUpdates: 'Status Update Notifications'
    }
  },
  notifications: {
    title: 'Notifications',
    lowStock: {
      title: 'Low Stock Alert',
      description: 'You have {{count}} products that are out of stock.',
      action: 'View Details'
    },
    lastUpdated: 'Last updated: {{date}}',
    outOfStock: 'Out of Stock',
    empty: {
      title: 'No Notifications',
      description: 'You\'re all caught up! There are no notifications to display.'
    }
  }
};