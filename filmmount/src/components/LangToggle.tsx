import { useLang } from '../i18n/LangContext';
import type { Lang } from '../types';

export function LangToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang, t } = useLang();
  const base =
    tone === 'dark'
      ? 'border-white/15 bg-white/5 text-paper/70'
      : 'border-navy/15 bg-white/70 text-muted';
  const active = tone === 'dark' ? 'bg-amber text-navy' : 'bg-navy text-paper';
  return (
    <div role="group" aria-label={t('lang.switch')} className={`inline-flex rounded-full border p-0.5 text-xs font-semibold ${base}`}>
      {(['ka', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 transition-colors ${lang === l ? active : 'hover:text-amber-deep'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
