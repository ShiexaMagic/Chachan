import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang, Localized } from '../types';
import { monthsShort, strings, type StringKey } from './strings';

interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: StringKey) => string;
  /** pick the current language from a { ka, en } pair */
  L: (v: Localized) => string;
  formatDate: (iso: string) => string;
}

const LangCtx = createContext<LangValue | null>(null);
const STORAGE_KEY = 'filmmount.lang';

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'en' ? 'en' : 'ka';
  } catch {
    return 'ka';
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === 'ka'
        ? 'FilmMount — კინოწარმოება მაღალმთიან საქართველოში (დემო)'
        : 'FilmMount — Film Production in High-Mountain Georgia (Demo)';
  }, [lang]);

  const value = useMemo<LangValue>(
    () => ({
      lang,
      setLang,
      t: (key) => strings[lang][key],
      L: (v) => v[lang],
      formatDate: (iso) => {
        const [y, m, d] = iso.split('-').map(Number);
        if (!y || !m || !d) return iso;
        return `${d} ${monthsShort[lang][m - 1]} ${y}`;
      },
    }),
    [lang, setLang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang(): LangValue {
  const v = useContext(LangCtx);
  if (!v) throw new Error('useLang must be used inside LangProvider');
  return v;
}
