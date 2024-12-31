import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Network,
  Globe,
  Table,
  Bell,
  Download,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  network: Network,
  globe: Globe,
  table: Table,
  bell: Bell,
  download: Download,
};

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon: keyof typeof iconMap;
  gradient: string;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
  icon,
  gradient,
}) => {
  const { t } = useTranslation();
  const Icon = iconMap[icon];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className={`p-4 bg-gradient-to-r ${gradient}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">{t(title)}</h2>
        </div>
        {description && (
          <p className="mt-2 text-sm text-white/80 ml-12">
            {t(description)}
          </p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};