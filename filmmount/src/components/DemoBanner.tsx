import { useLang } from '../i18n/LangContext';
import { Icon } from './Icon';

export function DemoBanner() {
  const { t } = useLang();
  return (
    <div className="flex items-center justify-center gap-2 bg-amber px-4 py-1.5 text-center lg:h-[34px] text-[13px] font-medium text-navy">
      <Icon name="alert" className="h-4 w-4 shrink-0" />
      <span>{t('demo.banner')}</span>
    </div>
  );
}
