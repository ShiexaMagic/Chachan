import { useMemo, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/AppLayout';
import { Icon, type IconName } from '../components/Icon';
import { LocationMap } from '../components/LocationMap';
import { PhotoPlaceholder } from '../components/PhotoPlaceholder';
import { SeasonCalendar } from '../components/SeasonCalendar';
import { locations, SEASON_MONTHS } from '../data/locations';
import { regionById, regions } from '../data/regions';
import { useLang } from '../i18n/LangContext';
import type { AccessMode, InfraKey, RegionId, Season } from '../types';

const SEASONS: Season[] = ['winter', 'spring', 'summer', 'autumn'];
const ACCESS: AccessMode[] = ['car', '4x4', 'foot', 'horse'];
const INFRA: { key: InfraKey; icon: IconName }[] = [
  { key: 'electricity', icon: 'bolt' },
  { key: 'signal', icon: 'signal' },
  { key: 'accommodation', icon: 'bed' },
];

const isRegion = (v: string | null): v is RegionId => !!v && regions.some((r) => r.id === v);

export function Locations() {
  const { t, L } = useLang();
  const [params, setParams] = useSearchParams();
  const initialRegion = params.get('region');
  const [region, setRegion] = useState<RegionId | ''>(isRegion(initialRegion) ? initialRegion : '');
  const [season, setSeason] = useState<Season | ''>('');
  const [access, setAccess] = useState<AccessMode[]>([]);
  const [infra, setInfra] = useState<InfraKey[]>([]);
  const [hover, setHover] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(
    () =>
      locations.filter((l) => {
        if (region && l.region !== region) return false;
        if (season && !SEASON_MONTHS[season].some((m) => l.season[m - 1] === 2)) return false;
        if (access.length && !access.some((a) => l.access.includes(a))) return false;
        if (infra.length && !infra.every((k) => l.infra[k])) return false;
        return true;
      }),
    [region, season, access, infra],
  );

  const changeRegion = (r: RegionId | '') => {
    setRegion(r);
    setParams(r ? { region: r } : {}, { replace: true });
  };
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const activeCount = (region ? 1 : 0) + (season ? 1 : 0) + access.length + infra.length;
  const clear = () => {
    changeRegion('');
    setSeason('');
    setAccess([]);
    setInfra([]);
  };

  return (
    <>
      <PageHeader eyebrow={t('app.menu.locations')} title={t('loc.title')} lead={t('loc.lead')} />

      {/* Filters */}
      <div className="card mb-6 p-4 sm:p-5">
        <div className="flex items-center justify-between lg:hidden">
          <button type="button" onClick={() => setShowFilters((s) => !s)} className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <Icon name="filter" className="h-4 w-4" />
            {t('loc.filter.show')}
            {activeCount > 0 && <span className="rounded-full bg-amber px-2 text-xs text-navy">{activeCount}</span>}
          </button>
          <span className="text-sm text-muted">
            {filtered.length} {t('loc.count')}
          </span>
        </div>
        <div className={`${showFilters ? 'mt-4 grid' : 'hidden'} gap-5 lg:mt-0 lg:grid lg:grid-cols-[1fr_1fr_1.4fr_1.6fr]`}>
          <label className="field">
            <span className="!text-xs !uppercase !tracking-wider !text-muted">{t('loc.filter.region')}</span>
            <select value={region} onChange={(e) => changeRegion(e.target.value as RegionId | '')}>
              <option value="">{t('loc.filter.any')}</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {L(r.name)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="!text-xs !uppercase !tracking-wider !text-muted">{t('loc.filter.season')}</span>
            <select value={season} onChange={(e) => setSeason(e.target.value as Season | '')}>
              <option value="">{t('loc.filter.any')}</option>
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {t(`season.${s}`)}
                </option>
              ))}
            </select>
          </label>
          <div>
            <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">{t('loc.filter.access')}</div>
            <div className="flex flex-wrap gap-1.5">
              {ACCESS.map((a) => (
                <Chip key={a} active={access.includes(a)} onClick={() => setAccess((x) => toggle(x, a))}>
                  {t(`access.${a}`)}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">{t('loc.filter.infra')}</div>
            <div className="flex flex-wrap gap-1.5">
              {INFRA.map(({ key, icon }) => (
                <Chip key={key} active={infra.includes(key)} onClick={() => setInfra((x) => toggle(x, key))}>
                  <Icon name={icon} className="h-3.5 w-3.5" />
                  {t(`infra.${key}`)}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div className={`${showFilters ? 'flex' : 'hidden'} mt-4 items-center justify-between border-t border-navy/5 pt-3 text-sm lg:flex`}>
          <span className="hidden text-muted lg:inline">
            <b className="font-semibold text-navy">{filtered.length}</b> {t('loc.count')}
          </span>
          {activeCount > 0 ? (
            <button type="button" onClick={clear} className="inline-flex items-center gap-1 font-semibold text-amber-deep hover:underline">
              <Icon name="x" className="h-3.5 w-3.5" />
              {t('loc.filter.reset')}
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>

      {/* Map + list */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="order-2 space-y-3 lg:order-1">
          {filtered.length === 0 && <div className="card p-10 text-center text-muted">{t('loc.none')}</div>}
          {filtered.map((l, i) => {
            const r = regionById(l.region);
            return (
              <Link
                key={l.id}
                to={`/app/locations/${l.id}`}
                onMouseEnter={() => setHover(l.id)}
                onMouseLeave={() => setHover(null)}
                className={`card group flex gap-4 p-3 transition sm:p-4 ${hover === l.id ? 'ring-2 ring-amber' : 'hover:ring-navy/15'}`}
              >
                <PhotoPlaceholder palette={l.palette} variant={i} label={false} className="h-24 w-24 shrink-0 rounded-xl sm:h-28 sm:w-32" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-deep">{L(r.name)}</div>
                      <h3 className="text-lg font-semibold leading-snug">{L(l.name)}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-mist px-2 py-0.5 text-xs font-medium text-ink">
                      {l.altitude.toLocaleString('en-US')} {t('common.m')}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{L(l.summary)}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {l.access.map((a) => (
                      <span key={a} className="rounded-md bg-paper px-1.5 py-0.5 text-[11px] font-medium text-ink ring-1 ring-navy/10">
                        {t(`access.${a}`)}
                      </span>
                    ))}
                    <span className="mx-1 h-3 w-px bg-navy/10" />
                    {INFRA.map(({ key, icon }) => (
                      <span key={key} title={t(`infra.${key}`)} className={l.infra[key] ? 'text-moss' : 'text-muted/30'}>
                        <Icon name={icon} className="h-4 w-4" />
                      </span>
                    ))}
                  </div>
                  <div className="mt-2.5 hidden sm:block">
                    <SeasonCalendar location={l} compact />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-[58px]">
            <LocationMap locations={filtered} activeId={hover} onHover={setHover} className="h-[320px] sm:h-[420px] lg:h-[calc(100vh-110px)]" />
            <p className="mt-2 text-xs text-muted">{t('loc.map.note')}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
        active ? 'bg-navy text-paper' : 'bg-paper text-ink ring-1 ring-navy/10 hover:ring-navy/25'
      }`}
    >
      {children}
    </button>
  );
}
