import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import type { StringKey } from '../i18n/strings';
import type { Region } from '../types';
import { Icon, type IconName } from './Icon';

type RState = 'queued' | 'sending' | 'awaiting' | 'received' | 'confirmed';
type RecipientKey = 'rescue' | 'municipality' | 'hotel';

const RECIPIENTS: { key: RecipientKey; icon: IconName; role: StringKey }[] = [
  { key: 'rescue', icon: 'shield', role: 'notif.role.rescue' },
  { key: 'municipality', icon: 'building', role: 'notif.role.municipality' },
  { key: 'hotel', icon: 'bed', role: 'notif.role.hotel' },
];

function timeline(accommodation: boolean): [number, RecipientKey, RState][] {
  return [
    [250, 'rescue', 'sending'],
    [750, 'municipality', 'sending'],
    [1250, 'hotel', 'sending'],
    [1500, 'rescue', 'received'],
    [2200, 'municipality', 'received'],
    ...(accommodation
      ? ([
          [2700, 'hotel', 'awaiting'],
          [5800, 'hotel', 'confirmed'],
        ] as [number, RecipientKey, RState][])
      : ([[2700, 'hotel', 'received']] as [number, RecipientKey, RState][])),
  ];
}

interface Props {
  region: Region | null;
  /** when set, the sending animation runs for this registration */
  sent: { id: string; accommodation: boolean } | null;
  onReset: () => void;
}

export function NotificationsPanel({ region, sent, onReset }: Props) {
  const { t, L } = useLang();
  const [states, setStates] = useState<Record<RecipientKey, RState>>({ rescue: 'queued', municipality: 'queued', hotel: 'queued' });
  const [times, setTimes] = useState<Partial<Record<RecipientKey, string>>>({});

  useEffect(() => {
    setStates({ rescue: 'queued', municipality: 'queued', hotel: 'queued' });
    setTimes({});
    if (!sent) return;
    const timers = timeline(sent.accommodation).map(([ms, key, state]) =>
      window.setTimeout(() => {
        setStates((s) => ({ ...s, [key]: state }));
        if (state === 'received' || state === 'confirmed') {
          const now = new Date();
          setTimes((tm) => ({ ...tm, [key]: now.toTimeString().slice(0, 8) }));
        }
      }, ms),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [sent]);

  const allDone = sent && Object.values(states).every((s) => s === 'received' || s === 'confirmed');
  const names: Record<RecipientKey, string> = region
    ? { rescue: L(region.rescue), municipality: L(region.municipality), hotel: L(region.hotel) }
    : { rescue: '', municipality: '', hotel: '' };

  return (
    <aside className="overflow-hidden rounded-card bg-navy text-paper shadow-soft" aria-live="polite">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className={`grid h-9 w-9 place-items-center rounded-full ${sent ? 'bg-amber text-navy' : 'bg-white/10 text-amber'}`}>
          <Icon name="bell" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-serif text-lg font-semibold leading-tight text-paper">{t(sent ? 'notif.title.sent' : 'notif.title.preview')}</h2>
          {sent && (
            <div className="text-xs text-paper/60">
              {t('notif.ref')} <span className="font-mono">{sent.id}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {!region && <p className="text-sm text-paper/60">{t('notif.preview.empty')}</p>}
        {region && !sent && <p className="text-sm text-paper/60">{t('notif.preview.lead')}</p>}

        {region &&
          RECIPIENTS.map((r) => {
            const st = states[r.key];
            const visible = !sent || st !== 'queued';
            if (!visible) return <div key={r.key} className="h-[74px] rounded-xl border border-dashed border-white/10" />;
            const done = st === 'received' || st === 'confirmed';
            return (
              <div
                key={r.key}
                className={`${sent ? 'fm-rise' : ''} flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-500 ${
                  done ? 'border-moss/50 bg-moss/15' : st === 'awaiting' ? 'border-amber/40 bg-amber/10' : 'border-white/10 bg-white/5'
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                    done ? 'bg-moss text-white' : 'bg-white/10 text-amber'
                  }`}
                >
                  <Icon name={done ? 'check' : r.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber">{t(r.role)}</div>
                  <div className="text-sm font-medium leading-snug">{names[r.key]}</div>
                </div>
                {sent && <StateLabel state={st} time={times[r.key]} />}
              </div>
            );
          })}

        {sent && (
          <div className="pt-2">
            <p className="flex items-start gap-2 text-xs text-paper/50">
              <Icon name="alert" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {t('notif.demo')}
            </p>
            {allDone && (
              <div className="fm-rise mt-4 rounded-xl bg-white/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#7FD0A8]">
                  <Icon name="check" className="h-4 w-4" />
                  {t('notif.done')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/app/shoots" className="btn-amber">
                    {t('notif.view')}
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                  <button type="button" onClick={onReset} className="rounded-full px-4 py-2 text-sm font-semibold text-paper/80 ring-1 ring-white/20 hover:bg-white/10">
                    {t('notif.another')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

function StateLabel({ state, time }: { state: RState; time?: string }) {
  const { t } = useLang();
  if (state === 'sending')
    return (
      <span className="inline-flex shrink-0 items-center gap-2 text-xs text-paper/70">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-amber border-t-transparent" />
        {t('notif.state.sending')}
      </span>
    );
  if (state === 'awaiting')
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-amber">
        <Icon name="clock" className="h-3.5 w-3.5 animate-pulse" />
        {t('notif.state.awaiting')}
      </span>
    );
  return (
    <span className="shrink-0 text-right text-xs">
      <span className="block font-semibold text-[#7FD0A8]">{t(state === 'confirmed' ? 'notif.state.confirmed' : 'notif.state.received')}</span>
      {time && <span className="font-mono text-[10px] text-paper/50">{time}</span>}
    </span>
  );
}
