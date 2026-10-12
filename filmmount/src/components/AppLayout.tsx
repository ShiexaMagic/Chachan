import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import type { StringKey } from '../i18n/strings';
import { resetShoots, useShoots } from '../lib/shootStore';
import { DemoBanner } from './DemoBanner';
import { Icon, type IconName } from './Icon';
import { LangToggle } from './LangToggle';
import { Logo } from './Logo';

const NAV: { to: string; label: StringKey; icon: IconName }[] = [
  { to: '/app/shoots', label: 'app.menu.shoots', icon: 'camera' },
  { to: '/app/locations', label: 'app.menu.locations', icon: 'pin' },
  { to: '/app/guide', label: 'app.menu.guide', icon: 'book' },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLang();
  const shoots = useShoots();
  const userCount = shoots.filter((s) => !s.sample).length;
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex h-full flex-col bg-navy text-paper">
      <div className="px-6 pb-6 pt-7">
        <Link to="/" onClick={onNavigate} className="block">
          <Logo />
        </Link>
        <p className="mt-3 text-xs leading-relaxed text-paper/50">{t('brand.project')}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition ${
                isActive ? 'bg-white/10 text-paper' : 'text-paper/65 hover:bg-white/5 hover:text-paper'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`h-5 w-1 rounded-full ${isActive ? 'bg-amber' : 'bg-transparent'}`} />
                <Icon name={n.icon} className={`h-5 w-5 ${isActive ? 'text-amber' : ''}`} />
                {t(n.label)}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-amber font-serif text-sm font-bold text-navy">DS</span>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-paper/50">{t('app.profile.role')}</div>
            <div className="truncate text-sm font-semibold">{t('app.profile.name')}</div>
          </div>
          <span className="ml-auto rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber">{t('demo.tag')}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <LangToggle tone="dark" />
          <Link to="/" onClick={onNavigate} className="inline-flex items-center gap-1.5 text-xs text-paper/60 hover:text-paper">
            <Icon name="logout" className="h-4 w-4" />
            {t('app.exit')}
          </Link>
        </div>
        {userCount > 0 &&
          (confirming ? (
            <div className="flex flex-wrap items-center gap-2 text-xs text-paper/70">
              <span>{t('app.reset.confirm')}</span>
              <button
                type="button"
                onClick={() => {
                  resetShoots();
                  setConfirming(false);
                }}
                className="rounded-full bg-amber px-2.5 py-0.5 font-semibold text-navy"
              >
                {t('reg.yes')}
              </button>
              <button type="button" onClick={() => setConfirming(false)} className="rounded-full px-2.5 py-0.5 ring-1 ring-white/20">
                {t('reg.no')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex items-center gap-1.5 text-xs text-paper/40 hover:text-amber"
            >
              <Icon name="reset" className="h-3.5 w-3.5" />
              {t('app.reset')}
            </button>
          ))}
      </div>
    </div>
  );
}

export function AppLayout() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-[900]">
        <DemoBanner />
        {/* mobile top bar */}
        <div className="flex items-center justify-between bg-navy px-4 py-3 lg:hidden">
          <Link to="/">
            <Logo />
          </Link>
          <button type="button" onClick={() => setOpen(true)} className="rounded-lg p-2 text-paper hover:bg-white/10" aria-label={t('app.menu.open')}>
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* desktop sidebar */}
      <aside className="fixed bottom-0 left-0 top-[34px] z-[800] hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fm-rise absolute bottom-0 left-0 top-0 w-72 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-lg p-2 text-paper/70 hover:bg-white/10"
              aria-label={t('common.close')}
            >
              <Icon name="x" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead, actions }: { eyebrow?: string; title: string; lead?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="text-3xl font-semibold leading-tight sm:text-[2.1rem]">{title}</h1>
        {lead && <p className="mt-2 text-[15px] leading-relaxed text-muted">{lead}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
