interface Props {
  className?: string;
  /** body colour */
  color?: string;
  /** colour of the cut-outs (lens mark) — usually the background */
  bg?: string;
  snow?: string;
  title?: string;
}

/** Film camera whose top edge is two snow-capped peaks, lens on the right. */
export function LogoMark({ className = 'h-9 w-auto', color = '#E2A15F', bg = '#14212B', snow = '#F4F1EA', title }: Props) {
  return (
    <svg viewBox="0 0 112 76" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {/* body with mountain-ridge top edge */}
      <path d="M6 68V40L26 16l12 14L54 8l24 32v24a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill={color} />
      {/* snow caps */}
      <path d="M26 16l-6.2 7.4 3.4-1.2 2.8 2.6 3-2.4 3.4 1.6Z" fill={snow} />
      <path d="M54 8l-6.4 9.1 3.6-1.4 3 2.8 3.2-2.6 3.7 1.4Z" fill={snow} />
      {/* lens trapezoid */}
      <path d="M82 46l24-10v32l-24-10Z" fill={color} />
      {/* round lens mark */}
      <circle cx="34" cy="52" r="9" fill={bg} />
      <circle cx="34" cy="52" r="4" fill={color} />
    </svg>
  );
}

export function Logo({ dark = true, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className={`grid place-items-center rounded-xl ${dark ? 'bg-navy' : 'bg-navy'} p-1.5`}>
        <LogoMark className="h-7 w-auto" />
      </span>
      {!compact && (
        <span className={`font-serif text-xl font-semibold tracking-tight ${dark ? 'text-paper' : 'text-navy'}`}>
          FilmMount
        </span>
      )}
    </span>
  );
}
