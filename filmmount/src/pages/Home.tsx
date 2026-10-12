import { Link } from 'react-router-dom';
import { DemoBanner } from '../components/DemoBanner';
import { Icon, type IconName } from '../components/Icon';
import { LangToggle } from '../components/LangToggle';
import { Logo, LogoMark } from '../components/Logo';
import { PhotoPlaceholder } from '../components/PhotoPlaceholder';
import { Ridge } from '../components/Ridge';
import { locations } from '../data/locations';
import { regions } from '../data/regions';
import { useLang } from '../i18n/LangContext';
import type { StringKey } from '../i18n/strings';

const PRODUCTS: { n: string; icon: IconName; title: StringKey; body: StringKey; to: string }[] = [
  { n: '01', icon: 'bell', title: 'home.p1.title', body: 'home.p1.body', to: '/app/shoots/new' },
  { n: '02', icon: 'pin', title: 'home.p2.title', body: 'home.p2.body', to: '/app/locations' },
  { n: '03', icon: 'book', title: 'home.p3.title', body: 'home.p3.body', to: '/app/guide' },
];

export function Home() {
  const { t, L } = useLang();
  const svaneti = regions[0];

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50">
        <DemoBanner />
      </div>

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(#E8EEF0 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo />
          <nav className="flex items-center gap-2 sm:gap-6">
            <a href="#products" className="hidden text-sm text-paper/70 hover:text-paper md:inline">
              {t('home.nav.products')}
            </a>
            <a href="#regions" className="hidden text-sm text-paper/70 hover:text-paper md:inline">
              {t('home.nav.regions')}
            </a>
            <LangToggle tone="dark" />
            <Link to="/app/shoots" className="btn-amber hidden !py-2 sm:inline-flex">
              {t('home.nav.enter')}
            </Link>
          </nav>
        </header>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-40 pt-10 sm:px-8 sm:pb-52 sm:pt-16 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-paper/70">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {t('home.eyebrow')}
            </div>
            <h1 className="font-serif text-[2.1rem] font-semibold leading-[1.2] text-paper sm:text-5xl lg:text-[3.4rem]">
              {t('home.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">{t('home.mission')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/app/shoots/new" className="btn-amber !px-6 !py-3 !text-[15px]">
                <Icon name="plus" className="h-4 w-4" />
                {t('home.cta.register')}
              </Link>
              <Link
                to="/app/locations"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-paper ring-1 ring-white/25 transition hover:bg-white/10"
              >
                {t('home.cta.explore')}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* illustrative notification card */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-[20px] border border-white/10 bg-navy-700/80 p-5 shadow-2xl backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-amber">{t('notif.title.sent')}</div>
                  <div className="font-serif text-lg">{L(locations[0].name)} · {L(svaneti.name)}</div>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-navy">
                  <Icon name="bell" className="h-5 w-5" />
                </span>
              </div>
              {(
                [
                  ['shield', 'notif.role.rescue', svaneti.rescue, 'notif.state.received'],
                  ['building', 'notif.role.municipality', svaneti.municipality, 'notif.state.received'],
                  ['bed', 'notif.role.hotel', svaneti.hotel, 'notif.state.awaiting'],
                ] as const
              ).map(([icon, role, name, state], i) => (
                <div
                  key={role}
                  className="fm-rise mb-2.5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
                  style={{ animationDelay: `${300 + i * 250}ms` }}
                >
                  <span className={`grid h-9 w-9 place-items-center rounded-full ${i < 2 ? 'bg-moss text-white' : 'bg-white/10 text-amber'}`}>
                    <Icon name={i < 2 ? 'check' : icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber">{t(role)}</div>
                    <div className="truncate text-sm">{L(name)}</div>
                  </div>
                  <span className={`text-xs font-semibold ${i < 2 ? 'text-[#7FD0A8]' : 'text-amber'}`}>{t(state)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Ridge className="absolute bottom-0 left-0 h-32 w-full sm:h-44" />
      </section>

      {/* ───── Products ───── */}
      <section id="products" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t('home.products.title')}</h2>
          <p className="mt-3 text-muted">{t('home.products.lead')}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link key={p.n} to={p.to} className="card group flex flex-col p-7 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-amber">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <span className="font-serif text-3xl font-semibold text-mist">{p.n}</span>
              </div>
              <h3 className="text-xl font-semibold">{t(p.title)}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{t(p.body)}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-deep">
                {t('home.p.open')}
                <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <h2 className="mb-8 text-2xl font-semibold">{t('home.how.title')}</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {(['home.how.1', 'home.how.2', 'home.how.3'] as const).map((k, i) => (
              <li key={k} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber font-serif font-semibold text-navy">{i + 1}</span>
                <p className="pt-1.5 text-[15px] leading-relaxed text-ink">{t(k)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── Regions ───── */}
      <section id="regions" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t('home.regions.title')}</h2>
            <p className="mt-3 text-muted">{t('home.regions.lead')}</p>
          </div>
          <Link to="/app/locations" className="btn-ghost">
            {t('home.cta.explore')}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {regions.map((r, i) => {
            const locs = locations.filter((l) => l.region === r.id);
            return (
              <Link key={r.id} to={`/app/locations?region=${r.id}`} className="group overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-navy/5">
                <PhotoPlaceholder palette={locs[0].palette} variant={i} label={false} className="h-32 transition duration-500 group-hover:scale-[1.03] sm:h-40" />
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-semibold sm:text-xl">{L(r.name)}</h3>
                  <p className="mt-1 text-sm text-muted">{L(r.tagline)}</p>
                  <p className="mt-3 text-xs font-semibold text-amber-deep">
                    {locs.length} {t('home.regions.locations')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="relative overflow-hidden rounded-[20px] bg-navy px-7 py-12 text-paper sm:px-12">
          <Ridge className="absolute bottom-0 left-0 h-24 w-full opacity-60" paper="#1C2D3A" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-paper sm:text-3xl">{t('home.final.title')}</h2>
              <p className="mt-2 text-paper/70">{t('home.final.body')}</p>
            </div>
            <Link to="/app/shoots/new" className="btn-amber !px-6 !py-3">
              {t('home.cta.register')}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-8">
          <span className="inline-flex items-center gap-3">
            <span className="rounded-lg bg-navy p-1">
              <LogoMark className="h-5 w-auto" />
            </span>
            {t('brand.project')}
          </span>
          <span>{t('home.footer')}</span>
        </div>
      </footer>
    </div>
  );
}
