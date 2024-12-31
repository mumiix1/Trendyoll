export interface NotificationPreferences {
  lowStock: boolean;
  priceChanges: boolean;
  newOrders: boolean;
  statusUpdates: boolean;
}

export interface ApiSettings {
  rateLimit: number;
  timeout: number;
  retryAttempts: number;
}

export interface TablePreferences {
  defaultPageSize: number;
  densityMode: 'compact' | 'comfortable' | 'spacious';
  showGridLines: boolean;
}

export interface ExportSettings {
  format: 'csv' | 'json' | 'xlsx';
  includeImages: boolean;
  dateFormat: string;
}

export interface UserSettings {
  notifications: NotificationPreferences;
  api: ApiSettings;
  table: TablePreferences;
  export: ExportSettings;
  language: string;
  timezone: string;
}