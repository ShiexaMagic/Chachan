import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../components/AppLayout';
import { Icon } from '../components/Icon';
import { chapters, type Block } from '../data/guide';
import { useLang } from '../i18n/LangContext';

export function Guide() {
  const { chapterId } = useParams();
  const { t, L } = useLang();
  const current = chapters.find((c) => c.id === chapterId) ?? chapters[0];
  const idx = chapters.indexOf(current);
  const written = chapters.filter((c) => c.body);
  const wIdx = written.indexOf(current);
  const prev = wIdx > 0 ? written[wIdx - 1] : undefined;
  const next = wIdx >= 0 && wIdx < written.length - 1 ? written[wIdx + 1] : undefined;

  return (
    <>
      <PageHeader eyebrow={t('guide.title')} title={t('guide.subtitle')} lead={t('guide.meta')} />

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <nav className="lg:sticky lg:top-[58px] lg:self-start">
          <div className="card p-3">
            <div className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">{t('guide.toc')}</div>
            <ol className="space-y-0.5">
              {chapters.map((c, i) => {
                const active = c.id === current.id;
                const available = !!c.body;
                return (
                  <li key={c.id}>
                    <Link
                      to={`/app/guide/${c.id}`}
                      className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        active ? 'bg-navy text-paper' : available ? 'text-ink hover:bg-mist' : 'text-muted hover:bg-mist/60'
                      }`}
                    >
                      <span className={`mt-px font-serif text-xs font-semibold ${active ? 'text-amber' : 'text-muted'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-medium">{L(c.title)}</span>
                      {!available && (
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? 'bg-white/10 text-paper/70' : 'bg-mist text-muted'}`}>
                          {t('guide.soon')}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-3 px-2 text-xs leading-relaxed text-muted">{t('guide.author')}</p>
        </nav>

        <article className="card px-6 py-8 sm:px-10 sm:py-10">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="eyebrow">
              {t('guide.chapter')} {idx + 1}
            </span>
            {current.minutes && (
              <span className="inline-flex items-center gap-1">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {current.minutes} {t('guide.minutes')}
              </span>
            )}
            {current.body && <span className="rounded-full bg-amber/15 px-2 py-0.5 font-medium text-amber-deep">{t('guide.draft')}</span>}
          </div>
          <h2 className="text-3xl font-semibold leading-tight">{L(current.title)}</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">{L(current.lead)}</p>
          <hr className="my-8 border-navy/10" />

          {current.body ? (
            <div className="max-w-[68ch] space-y-5">
              {current.body.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-mist p-8 text-center">
              <Icon name="book" className="mx-auto mb-3 h-8 w-8 text-muted" />
              <div className="font-serif text-lg font-semibold text-navy">{t('guide.soon')}</div>
              <p className="mt-1 text-sm text-muted">{t('guide.soon.body')}</p>
            </div>
          )}

          {(prev || next) && (
            <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-navy/10 pt-6">
              {prev ? (
                <Link to={`/app/guide/${prev.id}`} className="btn-ghost">
                  <Icon name="back" className="h-4 w-4" />
                  {t('guide.prev')}
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/app/guide/${next.id}`} className="btn-primary">
                  {t('guide.next')}: {L(next.title)}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </article>
      </div>
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  const { L } = useLang();
  switch (block.kind) {
    case 'p':
      return <p className="text-[16px] leading-[1.8] text-ink">{L(block.text)}</p>;
    case 'h':
      return <h3 className="pt-4 text-xl font-semibold">{L(block.text)}</h3>;
    case 'list':
      return (
        <ul className="space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-deep" />
              {L(it)}
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <aside className="rounded-xl border-l-4 border-amber bg-amber/10 px-5 py-4 text-[15px] leading-relaxed text-ink">{L(block.text)}</aside>
      );
  }
}
