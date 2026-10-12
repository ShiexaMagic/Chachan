import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { regionById } from '../data/regions';
import type { Location } from '../types';

function pinIcon(active: boolean) {
  return L.divIcon({
    className: '',
    html: `<span class="fm-pin${active ? ' fm-pin--active' : ''}"><span></span></span>`,
    iconSize: [28, 36],
    iconAnchor: [14, 34],
    popupAnchor: [0, -30],
  });
}

function FitBounds({ points, single }: { points: [number, number][]; single?: boolean }) {
  const map = useMap();
  const key = points.map((p) => p.join(',')).join('|');
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], single ? 11 : 10, { animate: true });
    } else {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 10, animate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);
  return null;
}

interface Props {
  locations: Location[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  className?: string;
  single?: boolean;
}

export function LocationMap({ locations, activeId, onHover, className = '', single }: Props) {
  const { L: pick, t } = useLang();
  const points = useMemo(() => locations.map((l) => l.coords), [locations]);
  const icons = useMemo(() => ({ on: pinIcon(true), off: pinIcon(false) }), []);

  return (
    <div className={`relative overflow-hidden rounded-card bg-mist shadow-soft ring-1 ring-navy/5 ${className}`}>
      <MapContainer
        center={[42.65, 44.0]}
        zoom={7}
        scrollWheelZoom={!single}
        className="h-full w-full"
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} single={single} />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={activeId === loc.id ? icons.on : icons.off}
            zIndexOffset={activeId === loc.id ? 1000 : 0}
            eventHandlers={{
              mouseover: () => onHover?.(loc.id),
              mouseout: () => onHover?.(null),
            }}
          >
            {!single && (
              <Popup>
                <div className="min-w-[160px] font-sans">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-deep">
                    {pick(regionById(loc.region).name)}
                  </div>
                  <div className="font-serif text-base font-semibold text-navy">{pick(loc.name)}</div>
                  <div className="mb-2 text-xs text-muted">
                    {loc.altitude.toLocaleString('en-US')} {t('common.m')}
                  </div>
                  <Link to={`/app/locations/${loc.id}`} className="text-sm font-semibold text-amber-deep hover:underline">
                    {t('loc.open')} →
                  </Link>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
