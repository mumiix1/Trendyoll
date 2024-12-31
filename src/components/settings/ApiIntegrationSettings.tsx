import React from 'react';
import { Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMarketplaceStore } from '../../store/marketplaceStore';

export const ApiIntegrationSettings = () => {
  const { t } = useTranslation();
  const { marketplaces, updateCredentials } = useMarketplaceStore();

  const handleSubmit = (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateCredentials(id, {
      apiKey: formData.get('apiKey') as string,
      apiSecret: formData.get('apiSecret') as string,
      sellerId: formData.get('sellerId') as string,
    });
  };

  return (
    <div className="space-y-6">
      {marketplaces.map((marketplace) => (
        <div key={marketplace.id} className="space-y-4">
          <div className="flex items-center gap-3">
            <Network className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">
              {t('settings.api.marketplace', { name: marketplace.name })}
            </h3>
          </div>

          <form onSubmit={(e) => handleSubmit(marketplace.id, e)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.api.apiKey')}
              </label>
              <input
                type="text"
                name="apiKey"
                defaultValue={marketplace.credentials?.apiKey}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('settings.api.apiKeyPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.api.apiSecret')}
              </label>
              <input
                type="password"
                name="apiSecret"
                defaultValue={marketplace.credentials?.apiSecret}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('settings.api.apiSecretPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.api.sellerId')}
              </label>
              <input
                type="text"
                name="sellerId"
                defaultValue={marketplace.credentials?.sellerId}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('settings.api.sellerIdPlaceholder')}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('settings.api.saveCredentials')}
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};