export const API_CONFIG = {
  baseUrls: {
    trendyol: '/api/trendyol', // Use proxy path
    amazon: '/api/amazon'
  },
  timeouts: {
    default: 30000,
    long: 60000
  },
  retries: {
    max: 3,
    delay: 1000
  }
};