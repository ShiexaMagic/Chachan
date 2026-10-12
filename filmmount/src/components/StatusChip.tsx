import { useLang } from '../i18n/LangContext';
import type { ShootStatus } from '../types';

const styles: Record<ShootStatus, string> = {
  planned: 'bg-mist text-ink ring-navy/10',
  notified: 'bg-amber/20 text-amber-deep ring-amber/40',
  active: 'bg-moss/10 text-moss ring-moss/30',
  completed: 'bg-navy/5 text-muted ring-navy/10',
};

export function StatusChip({ status }: { status: ShootStatus }) {
  const { t } = useLang();
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'active' ? 'animate-pulse bg-moss' : status === 'notified' ? 'bg-amber-deep' : status === 'planned' ? 'bg-ink/50' : 'bg-muted/60'
        }`}
      />
      {t(`status.${status}`)}
    </span>
  );
}
