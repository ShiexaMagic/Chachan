import type { SVGProps } from 'react';

const paths = {
  camera: 'M3 8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 10l5-3v10l-5-3',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7',
  bell: 'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z',
  building: 'M4 21V5l8-2v18M12 7l8 2v12M8 9h.01M8 13h.01M8 17h.01M16 13h.01M16 17h.01M2 21h20',
  bed: 'M3 18V7M3 13h18v5M21 18v-3a3 3 0 0 0-3-3h-7v1M7 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 6l-6 6 6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M6 6l12 12M18 6L6 18',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  mountain: 'M3 20l6-10 4 6 3-4 5 8z',
  users: 'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  plus: 'M12 5v14M5 12h14',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  signal: 'M4 20v-3M9 20v-7M14 20V9M19 20V4',
  alert: 'M12 3l10 18H2zM12 10v5M12 18h.01',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 15V9a4 4 0 0 1 4-4h2M18 9v6a4 4 0 0 1-4 4h-2',
  reset: 'M4 4v6h6M20 20v-6h-6M5.5 15A8 8 0 0 0 19 17M18.5 9A8 8 0 0 0 5 7',
  logout: 'M15 4h4v16h-4M10 16l-4-4 4-4M6 12h10',
  filter: 'M3 5h18l-7 8v6l-4-2v-4z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9a1.5 1.5 0 1 0 0-.01',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = 'h-5 w-5', ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
