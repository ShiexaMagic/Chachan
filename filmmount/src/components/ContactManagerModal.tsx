import { useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LangContext';
import type { Region } from '../types';
import { Icon } from './Icon';
import { Modal } from './Modal';

export function ContactManagerModal({ region, locationName, onClose }: { region: Region; locationName: string; onClose: () => void }) {
  const { t, L } = useLang();
  const [sent, setSent] = useState(false);
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const key = 'filmmount.messages.v1';
      const prev = JSON.parse(localStorage.getItem(key) || '[]') as unknown[];
      prev.push({ region: region.id, location: locationName, dates, message, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* ignore */
    }
    setSent(true);
  };

  return (
    <Modal title={t('cm.title')} onClose={onClose}>
      {sent ? (
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-moss/10 text-moss">
            <Icon name="check" className="h-7 w-7" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-navy">{t('cm.sent.title')}</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{t('cm.sent.body')}</p>
          <button type="button" onClick={onClose} className="btn-primary mt-6">
            {t('cm.close')}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-3 rounded-xl bg-mist p-3 text-sm sm:grid-cols-2">
            <div>
              <div className="text-xs text-muted">{t('cm.to')}</div>
              <div className="font-semibold text-navy">
                {L(region.manager.name)} · {L(region.name)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted">{t('cm.from')}</div>
              <div className="font-semibold text-navy">
                {t('app.profile.name')} · {t('app.profile.role')}
              </div>
            </div>
          </div>
          <label className="field">
            <span>{t('cm.dates')}</span>
            <input value={dates} onChange={(e) => setDates(e.target.value)} placeholder={t('cm.dates.ph')} />
          </label>
          <label className="field">
            <span>{t('cm.message')}</span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('cm.message.ph')}
            />
          </label>
          <p className="text-xs text-muted">{t('notif.demo')}</p>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              {t('cm.cancel')}
            </button>
            <button type="submit" className="btn-primary">
              <Icon name="mail" className="h-4 w-4" />
              {t('cm.send')}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
