import { useLang } from '../i18n/LangContext';
import { monthsShort } from '../i18n/strings';
import type { Location } from '../types';

export function SeasonCalendar({ location, compact = false }: { location: Location; compact?: boolean }) {
  const { lang, t } = useLang();
  if (compact) {
    return (
      <div className="flex gap-0.5" aria-label={t('ld.season')}>
        {location.season.map((lvl, i) => (
          <span
            key={i}
            title={`${monthsShort[lang][i]}: ${t(lvl === 2 ? 'ld.season.best' : lvl === 1 ? 'ld.season.possible' : 'ld.season.closed')}`}
            className={`h-1.5 flex-1 rounded-full ${lvl === 2 ? 'bg-amber' : lvl === 1 ? 'bg-amber/30' : 'bg-mist'}`}
          />
        ))}
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {location.season.map((lvl, i) => {
          const aval = location.avalancheMonths.includes(i + 1);
          return (
            <div
              key={i}
              className={`relative flex flex-col items-center justify-center rounded-lg py-3 text-xs font-semibold ${
                lvl === 2 ? 'bg-amber text-navy' : lvl === 1 ? 'bg-amber/25 text-amber-deep' : 'bg-mist text-muted/70'
              }`}
              title={`${monthsShort[lang][i]}: ${t(lvl === 2 ? 'ld.season.best' : lvl === 1 ? 'ld.season.possible' : 'ld.season.closed')}${
                aval ? ` · ${t('ld.season.avalanche')}` : ''
              }`}
            >
              {monthsShort[lang][i]}
              {aval && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#9B3B2E]" />}
            </div>
          );
        })}
      </div>
      {(
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
          <Legend swatch="bg-amber" label={t('ld.season.best')} />
          <Legend swatch="bg-amber/25" label={t('ld.season.possible')} />
          <Legend swatch="bg-mist ring-1 ring-navy/10" label={t('ld.season.closed')} />
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#9B3B2E]" />
            {t('ld.season.avalanche')}
          </span>
        </div>
      )}
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-4 rounded ${swatch}`} />
      {label}
    </span>
  );
}
