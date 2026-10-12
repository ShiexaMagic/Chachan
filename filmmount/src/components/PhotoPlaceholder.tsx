import { useLang } from '../i18n/LangContext';
import { Icon } from './Icon';

/** Stylised "photo" — a gradient sky with ridges, clearly labelled as a placeholder. */
export function PhotoPlaceholder({
  palette,
  className = '',
  label = true,
  variant = 0,
}: {
  palette: [string, string];
  className?: string;
  label?: boolean;
  variant?: number;
}) {
  const { t } = useLang();
  const [a, b] = palette;
  const ridges = [
    'M0 70 L18 48 L30 58 L46 34 L60 50 L74 40 L100 62 V100 H0Z',
    'M0 64 L14 54 L28 30 L40 46 L58 38 L72 56 L86 44 L100 58 V100 H0Z',
    'M0 72 L22 52 L36 60 L52 28 L66 46 L82 36 L100 54 V100 H0Z',
  ];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(170deg, ${b} 0%, ${a} 100%)` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d={ridges[variant % 3]} fill={a} opacity=".55" />
        <path d="M0 82 L20 70 L42 80 L64 66 L84 76 L100 70 V100 H0Z" fill="#14212B" opacity=".55" />
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-navy/60 px-2 py-0.5 text-[10px] font-medium text-paper/90 backdrop-blur">
          <Icon name="image" className="h-3 w-3" />
          {t('ld.photo')}
        </span>
      )}
    </div>
  );
}
