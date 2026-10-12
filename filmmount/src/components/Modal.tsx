import { useEffect, type ReactNode } from 'react';
import { useLang } from '../i18n/LangContext';
import { Icon } from './Icon';

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const { t } = useLang();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-navy/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fm-rise w-full max-w-lg rounded-t-[20px] bg-paper shadow-2xl sm:rounded-[20px]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
          <h2 className="font-serif text-lg font-semibold text-navy">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-muted hover:bg-mist hover:text-navy" aria-label={t('common.close')}>
            <Icon name="x" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
