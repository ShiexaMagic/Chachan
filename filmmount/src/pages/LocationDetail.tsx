import { useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactManagerModal } from '../components/ContactManagerModal';
import { Icon, type IconName } from '../components/Icon';
import { LocationMap } from '../components/LocationMap';
import { PhotoPlaceholder } from '../components/PhotoPlaceholder';
import { SeasonCalendar } from '../components/SeasonCalendar';
import { locationById, locations } from '../data/locations';
import { regionById } from '../data/regions';
import { useLang } from '../i18n/LangContext';
import type { AccessMode, InfraKey } from '../types';

const ACCESS_ICON: Record<AccessMode, IconName> = { car: 'route', '4x4': 'route', foot: 'mountain', horse: 'mountain' };
const INFRA: { key: InfraKey; icon: IconName }[] = [
  { key: 'electricity', icon: 'bolt' },
  { key: 'signal', icon: 'signal' },
  { key: 'accommodation', icon: 'bed' },
];

export function LocationDetail() {
  const { id = '' } = useParams();
  const { t, L } = useLang();
  const [contact, setContact] = useState(false);
  const loc = locationById(id);

  if (!loc) {
    return (
      <div className="card p-10 text-center">
        <p className="mb-4 text-muted">{t('ld.notfound')}</p>
        <Link to="/app/locations" className="btn-primary">
          {t('ld.back')}
        </Link>
      </div>
    );
  }

  const region = regionById(loc.region);
  const m = region.manager;
  const siblings = locations.filter((l) => l.region === loc.region && l.id !== loc.id);

  return (
    <>
      <Link to="/app/locations" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy">
        <Icon name="back" className="h-4 w-4" />
        {t('ld.back')}
      </Link>

      {/* gallery */}
      <div className="mb-8 grid h-64 grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[20px] sm:h-80">
        <PhotoPlaceholder palette={loc.palette} variant={0} className="col-span-4 row-span-2 sm:col-span-2" />
        <PhotoPlaceholder palette={[loc.palette[0], '#E8EEF0']} variant={1} className="hidden sm:block" />
        <PhotoPlaceholder palette={[loc.palette[1], loc.palette[0]]} variant={2} className="hidden sm:block" />
        <PhotoPlaceholder palette={['#14212B', loc.palette[1]]} variant={1} className="hidden sm:col-span-2 sm:block" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <header>
            <div className="eyebrow mb-2">{L(region.name)}</div>
            <h1 className="text-3xl font-semibold sm:text-4xl">{L(loc.name)}</h1>
            <p className="mt-2 text-lg text-muted">{L(loc.summary)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Fact icon="mountain" label={t('ld.altitude')} value={`${loc.altitude.toLocaleString('en-US')} ${t('common.m')}`} />
              <Fact icon="pin" label={t('ld.region')} value={L(region.name)} />
              <Fact icon="route" label={t('ld.fromTbilisi')} value={L(loc.fromTbilisi)} />
            </div>
          </header>

          <Panel title={t('ld.about')}>
            <p className="text-[15px] leading-relaxed text-ink">{L(loc.description)}</p>
          </Panel>

          <Panel title={t('ld.season')}>
            <SeasonCalendar location={loc} />
          </Panel>

          <div className="grid gap-6 md:grid-cols-2">
            <Panel title={t('ld.access')}>
              <div className="mb-3 flex flex-wrap gap-2">
                {(['car', '4x4', 'foot', 'horse'] as AccessMode[]).map((a) => {
                  const ok = loc.access.includes(a);
                  return (
                    <span
                      key={a}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                        ok ? 'bg-navy text-paper' : 'bg-mist text-muted/60 line-through'
                      }`}
                    >
                      <Icon name={ACCESS_ICON[a]} className="h-3.5 w-3.5" />
                      {t(`access.${a}`)}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm leading-relaxed text-muted">{L(loc.accessNote)}</p>
            </Panel>
            <Panel title={t('ld.infra')}>
              <ul className="space-y-2.5">
                {INFRA.map(({ key, icon }) => (
                  <li key={key} className="flex items-center gap-3 text-sm">
                    <span className={`grid h-8 w-8 place-items-center rounded-full ${loc.infra[key] ? 'bg-moss/10 text-moss' : 'bg-mist text-muted/50'}`}>
                      <Icon name={icon} className="h-4 w-4" />
                    </span>
                    <span className="flex-1 font-medium text-ink">{t(`infra.${key}`)}</span>
                    <span className={`text-xs font-semibold ${loc.infra[key] ? 'text-moss' : 'text-muted'}`}>
                      {t(loc.infra[key] ? 'ld.infra.yes' : 'ld.infra.no')}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <Panel title={t('ld.risks')}>
            <div className="grid gap-3 sm:grid-cols-3">
              <Risk label={t('ld.risk.weather')} text={L(loc.risks.weather)} />
              <Risk label={t('ld.risk.altitude')} text={L(loc.risks.altitude)} />
              <Risk label={t('ld.risk.avalanche')} text={L(loc.risks.avalanche)} danger={loc.avalancheMonths.length > 0} />
            </div>
          </Panel>
        </div>

        {/* right column */}
        <aside className="space-y-5 lg:sticky lg:top-[58px] lg:self-start">
          <div className="overflow-hidden rounded-card bg-navy text-paper shadow-soft">
            <div className="p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber">{t('ld.manager')}</div>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-amber font-serif text-xl font-semibold text-navy">
                  {L(m.name).charAt(0)}
                </span>
                <div>
                  <div className="font-serif text-xl font-semibold">{L(m.name)}</div>
                  <div className="text-sm text-paper/60">{L(region.name)}</div>
                </div>
              </div>
              <dl className="mt-5 space-y-2.5 text-sm">
                <Row icon="globe" label={t('ld.manager.languages')} value={m.languages.map(L).join(', ')} />
                <Row icon="phone" label={t('ld.manager.phone')} value={m.phone} mono />
                <Row icon="mail" label="E-mail" value={m.email} mono />
                <Row icon="pin" label={t('ld.manager.base')} value={L(m.base)} />
                <Row icon="calendar" label={t('ld.manager.since')} value={String(m.since)} />
              </dl>
              <button type="button" onClick={() => setContact(true)} className="btn-amber mt-6 w-full">
                <Icon name="mail" className="h-4 w-4" />
                {t('ld.manager.contact')}
              </button>
              <p className="mt-3 text-center text-[11px] text-paper/40">{t('ld.manager.fictional')}</p>
            </div>
          </div>

          <Link to={`/app/shoots/new?location=${loc.id}`} className="btn-primary w-full">
            <Icon name="plus" className="h-4 w-4" />
            {t('ld.register')}
          </Link>

          <LocationMap locations={[loc]} activeId={loc.id} single className="h-56" />

          {siblings.length > 0 && (
            <div className="card p-5">
              <div className="mb-3 text-sm font-semibold text-navy">{t('ld.other')}</div>
              <ul className="space-y-1">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link to={`/app/locations/${s.id}`} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-mist">
                      <span>{L(s.name)}</span>
                      <span className="text-xs text-muted">
                        {s.altitude} {t('common.m')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {contact && <ContactManagerModal region={region} locationName={loc.name.en} onClose={() => setContact(false)} />}
    </>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2 ring-1 ring-navy/5">
      <Icon name={icon} className="h-4 w-4 text-amber-deep" />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted">{label}</div>
        <div className="text-sm font-semibold text-navy">{value}</div>
      </div>
    </div>
  );
}

function Risk({ label, text, danger }: { label: string; text: string; danger?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${danger ? 'bg-[#A8452F]/[0.07]' : 'bg-mist'}`}>
      <div className={`mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${danger ? 'text-[#A8452F]' : 'text-amber-deep'}`}>
        <Icon name="alert" className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-ink">{text}</p>
    </div>
  );
}

function Row({ icon, label, value, mono }: { icon: IconName; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
      <dt className="sr-only">{label}</dt>
      <dd className={`min-w-0 break-words text-paper/85 ${mono ? 'font-mono text-[13px]' : ''}`}>{value}</dd>
    </div>
  );
}
