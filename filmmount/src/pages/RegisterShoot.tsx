import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/AppLayout';
import { Icon } from '../components/Icon';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { locationById, locations } from '../data/locations';
import { regionById, regions } from '../data/regions';
import { useLang } from '../i18n/LangContext';
import type { StringKey } from '../i18n/strings';
import { addShoot, newShootId } from '../lib/shootStore';
import type { Shoot } from '../types';

interface FormState {
  title: string;
  locationId: string;
  startDate: string;
  endDate: string;
  crewSize: string;
  route: string;
  equipment: string;
  emergencyName: string;
  emergencyPhone: string;
  accommodation: boolean;
}

const EMPTY: FormState = {
  title: '',
  locationId: '',
  startDate: '',
  endDate: '',
  crewSize: '8',
  route: '',
  equipment: '',
  emergencyName: '',
  emergencyPhone: '',
  accommodation: true,
};

type Errors = Partial<Record<keyof FormState, StringKey>>;

/** months (1–12) touched by a date range */
function monthsBetween(start: string, end: string): number[] {
  if (!start || !end || end < start) return [];
  const out = new Set<number>();
  const d = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  while (d <= e && out.size < 12) {
    out.add(d.getMonth() + 1);
    d.setDate(d.getDate() + 1);
  }
  return [...out];
}

export function RegisterShoot() {
  const { t, L } = useLang();
  const [params] = useSearchParams();
  const preset = params.get('location');
  const [form, setForm] = useState<FormState>({ ...EMPTY, locationId: preset && locationById(preset) ? preset : '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ id: string; accommodation: boolean } | null>(null);

  const location = form.locationId ? locationById(form.locationId) : undefined;
  const region = location ? regionById(location.region) : null;

  const months = useMemo(() => monthsBetween(form.startDate, form.endDate), [form.startDate, form.endDate]);
  const offSeason = location && months.some((m) => location.season[m - 1] === 0);
  const avalanche = location && months.some((m) => location.avalancheMonths.includes(m));

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    (['title', 'locationId', 'startDate', 'endDate', 'emergencyName', 'emergencyPhone'] as const).forEach((k) => {
      if (!form[k].trim()) e[k] = 'reg.err.required';
    });
    if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = 'reg.err.dates';
    if (!(Number(form.crewSize) >= 1)) e.crewSize = 'reg.err.crew';
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector('.field.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const shoot: Shoot = {
      id: newShootId(),
      title: form.title.trim(),
      producer: 'Demo Studio',
      locationId: form.locationId,
      startDate: form.startDate,
      endDate: form.endDate,
      crewSize: Number(form.crewSize),
      route: form.route.trim(),
      equipment: form.equipment.trim(),
      emergencyName: form.emergencyName.trim(),
      emergencyPhone: form.emergencyPhone.trim(),
      accommodation: form.accommodation,
      status: 'notified',
      createdAt: new Date().toISOString(),
    };
    addShoot(shoot);
    setSent({ id: shoot.id, accommodation: shoot.accommodation });
    if (window.innerWidth < 1024) {
      setTimeout(() => document.getElementById('notif-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  const resetAll = () => {
    setSent(null);
    setForm(EMPTY);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const locked = sent !== null;

  return (
    <>
      <PageHeader eyebrow={t('app.menu.shoots')} title={t('reg.title')} lead={t('reg.lead')} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form onSubmit={submit} noValidate className="space-y-6">
          <fieldset disabled={locked} className="space-y-6 disabled:opacity-70">
            <Section n={1} title={t('reg.section.project')}>
              <Field label={t('reg.f.title')} error={errors.title}>
                <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder={t('reg.f.title.ph')} />
              </Field>
              <Field label={t('reg.f.location')} error={errors.locationId}>
                <select value={form.locationId} onChange={(e) => set('locationId', e.target.value)}>
                  <option value="">{t('reg.f.location.ph')}</option>
                  {regions.map((r) => (
                    <optgroup key={r.id} label={L(r.name)}>
                      {locations
                        .filter((l) => l.region === r.id)
                        .map((l) => (
                          <option key={l.id} value={l.id}>
                            {L(l.name)} · {l.altitude} {t('common.m')}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </Field>
              {location && region && (
                <div className="fm-rise flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-mist px-4 py-3 text-sm">
                  <span>
                    <span className="text-muted">{t('reg.hint.region')}:</span> <b className="font-semibold text-navy">{L(region.name)}</b>
                  </span>
                  <span>
                    <span className="text-muted">{t('reg.hint.altitude')}:</span>{' '}
                    <b className="font-semibold text-navy">
                      {location.altitude.toLocaleString('en-US')} {t('common.m')}
                    </b>
                  </span>
                  <span className="text-muted">{L(location.fromTbilisi)}</span>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t('reg.f.start')} error={errors.startDate}>
                  <input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
                </Field>
                <Field label={t('reg.f.end')} error={errors.endDate}>
                  <input type="date" value={form.endDate} min={form.startDate || undefined} onChange={(e) => set('endDate', e.target.value)} />
                </Field>
              </div>
              {(offSeason || avalanche) && (
                <div className="fm-rise space-y-1 rounded-xl border border-amber/50 bg-amber/10 px-4 py-3 text-sm text-ink">
                  {offSeason && (
                    <p className="flex gap-2">
                      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-deep" />
                      {t('reg.hint.season.warn')}
                    </p>
                  )}
                  {avalanche && (
                    <p className="flex gap-2">
                      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-[#A8452F]" />
                      {t('reg.hint.avalanche')}
                    </p>
                  )}
                </div>
              )}
            </Section>

            <Section n={2} title={t('reg.section.crew')}>
              <Field label={t('reg.f.crew')} error={errors.crewSize} className="sm:max-w-[200px]">
                <input type="number" min={1} max={300} value={form.crewSize} onChange={(e) => set('crewSize', e.target.value)} />
              </Field>
              <Field label={t('reg.f.route')}>
                <textarea rows={2} value={form.route} onChange={(e) => set('route', e.target.value)} placeholder={t('reg.f.route.ph')} />
              </Field>
              <Field label={t('reg.f.equipment')}>
                <textarea rows={2} value={form.equipment} onChange={(e) => set('equipment', e.target.value)} placeholder={t('reg.f.equipment.ph')} />
              </Field>
            </Section>

            <Section n={3} title={t('reg.section.safety')}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t('reg.f.emName')} error={errors.emergencyName}>
                  <input value={form.emergencyName} onChange={(e) => set('emergencyName', e.target.value)} autoComplete="off" />
                </Field>
                <Field label={t('reg.f.emPhone')} error={errors.emergencyPhone}>
                  <input
                    type="tel"
                    value={form.emergencyPhone}
                    onChange={(e) => set('emergencyPhone', e.target.value)}
                    placeholder="+995 000 00 00 00"
                    autoComplete="off"
                  />
                </Field>
              </div>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink">{t('reg.f.accommodation')}</span>
                <div className="inline-flex rounded-full bg-mist p-1">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      onClick={() => set('accommodation', v)}
                      aria-pressed={form.accommodation === v}
                      className={`rounded-full px-5 py-1.5 text-sm font-semibold transition ${
                        form.accommodation === v ? 'bg-navy text-paper shadow' : 'text-muted hover:text-navy'
                      }`}
                    >
                      {t(v ? 'reg.yes' : 'reg.no')}
                    </button>
                  ))}
                </div>
              </div>
            </Section>
          </fieldset>

          {!locked && (
            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">{t('demo.banner')}</p>
              <button type="submit" className="btn-amber shrink-0 whitespace-nowrap !px-6 !py-3 !text-[15px]">
                <Icon name="bell" className="h-4 w-4" />
                {t('reg.submit')}
              </button>
            </div>
          )}
        </form>

        <div id="notif-panel" className="scroll-mt-28 lg:sticky lg:top-[58px]">
          <NotificationsPanel region={region} sent={sent} onReset={resetAll} />
        </div>
      </div>
    </>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-7">
      <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy font-sans text-xs font-bold text-amber">{n}</span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, error, children, className = '' }: { label: string; error?: StringKey; children: ReactNode; className?: string }) {
  const { t } = useLang();
  return (
    <label className={`field ${error ? 'invalid' : ''} ${className}`}>
      <span>{label}</span>
      {children}
      {error && <em className="err not-italic">{t(error)}</em>}
    </label>
  );
}
