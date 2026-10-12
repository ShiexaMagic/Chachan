import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/AppLayout';
import { Icon } from '../components/Icon';
import { StatusChip } from '../components/StatusChip';
import { locationById } from '../data/locations';
import { regionById } from '../data/regions';
import { useLang } from '../i18n/LangContext';
import { useShoots } from '../lib/shootStore';
import type { Shoot, ShootStatus } from '../types';

const FILTERS: (ShootStatus | 'all')[] = ['all', 'planned', 'notified', 'active', 'completed'];

export function Shoots() {
  const { t, L, formatDate } = useLang();
  const shoots = useShoots();
  const [filter, setFilter] = useState<ShootStatus | 'all'>('all');
  const visible = filter === 'all' ? shoots : shoots.filter((s) => s.status === filter);

  const title = (s: Shoot) => (s.titleI18n ? L(s.titleI18n) : s.title);
  const loc = (s: Shoot) => locationById(s.locationId);
  const regionsUsed = new Set(shoots.map((s) => loc(s)?.region)).size;

  const stats = [
    { label: t('shoots.stat.total'), value: shoots.length },
    { label: t('shoots.stat.active'), value: shoots.filter((s) => s.status === 'active').length },
    { label: t('shoots.stat.upcoming'), value: shoots.filter((s) => s.status === 'planned' || s.status === 'notified').length },
    { label: t('shoots.stat.regions'), value: regionsUsed },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t('app.profile.name')}
        title={t('shoots.title')}
        lead={t('shoots.lead')}
        actions={
          <Link to="/app/shoots/new" className="btn-amber">
            <Icon name="plus" className="h-4 w-4" />
            {t('shoots.new')}
          </Link>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card px-5 py-4">
            <div className="font-serif text-3xl font-semibold text-navy">{s.value}</div>
            <div className="mt-1 text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f ? 'bg-navy text-paper' : 'bg-white text-muted ring-1 ring-navy/10 hover:text-navy'
            }`}
          >
            {f === 'all' ? t('shoots.filter.all') : t(`status.${f}`)}
            <span className="ml-1.5 opacity-60">{f === 'all' ? shoots.length : shoots.filter((s) => s.status === f).length}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="card p-10 text-center text-muted">{t('shoots.empty')}</div>
      ) : (
        <>
          {/* desktop table */}
          <div className="card hidden overflow-hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist/70 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">{t('shoots.col.project')}</th>
                  <th className="px-5 py-3 font-semibold">{t('shoots.col.location')}</th>
                  <th className="px-5 py-3 font-semibold">{t('shoots.col.dates')}</th>
                  <th className="px-5 py-3 font-semibold">{t('shoots.col.crew')}</th>
                  <th className="px-5 py-3 font-semibold">{t('shoots.col.notified')}</th>
                  <th className="px-5 py-3 font-semibold">{t('shoots.col.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {visible.map((s) => {
                  const l = loc(s);
                  return (
                    <tr key={s.id} className={`transition hover:bg-paper/60 ${!s.sample ? 'fm-rise' : ''}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 font-semibold text-navy">
                          {title(s)}
                          {!s.sample && (
                            <span className="rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-deep">
                              {t('shoots.new.badge')}
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-xs text-muted">{s.id}</div>
                      </td>
                      <td className="px-5 py-4">
                        {l ? (
                          <Link to={`/app/locations/${l.id}`} className="hover:text-amber-deep">
                            <div className="font-medium">{L(l.name)}</div>
                            <div className="text-xs text-muted">{L(regionById(l.region).name)}</div>
                          </Link>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-ink">
                        {formatDate(s.startDate)} – {formatDate(s.endDate)}
                      </td>
                      <td className="px-5 py-4">
                        {s.crewSize} <span className="text-muted">{t('shoots.crew')}</span>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted">
                        {s.status === 'planned' ? t('shoots.notified.none') : (
                          <span className="inline-flex items-center gap-1 text-moss">
                            <Icon name="check" className="h-3.5 w-3.5" />
                            {t('shoots.notified.count')}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <StatusChip status={s.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="space-y-3 md:hidden">
            {visible.map((s) => {
              const l = loc(s);
              return (
                <div key={s.id} className="card p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-navy">{title(s)}</div>
                      <div className="font-mono text-xs text-muted">{s.id}</div>
                    </div>
                    <StatusChip status={s.status} />
                  </div>
                  <div className="space-y-1 text-sm text-ink">
                    {l && (
                      <div className="flex items-center gap-2">
                        <Icon name="pin" className="h-4 w-4 text-muted" />
                        {L(l.name)} · {L(regionById(l.region).name)}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Icon name="calendar" className="h-4 w-4 text-muted" />
                      {formatDate(s.startDate)} – {formatDate(s.endDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="users" className="h-4 w-4 text-muted" />
                      {s.crewSize} {t('shoots.crew')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
