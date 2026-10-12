export type Lang = 'ka' | 'en';
export type Localized = { ka: string; en: string };

export type RegionId = 'svaneti' | 'tusheti' | 'racha' | 'khevsureti';
export type AccessMode = 'car' | '4x4' | 'foot' | 'horse';
export type InfraKey = 'electricity' | 'signal' | 'accommodation';
export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

/** 0 = not recommended / closed, 1 = possible, 2 = best */
export type SeasonLevel = 0 | 1 | 2;

export interface Manager {
  name: Localized;
  languages: Localized[];
  phone: string;
  email: string;
  base: Localized;
  since: number;
}

export interface Region {
  id: RegionId;
  name: Localized;
  tagline: Localized;
  center: [number, number];
  rescue: Localized;
  municipality: Localized;
  hotel: Localized;
  manager: Manager;
}

export interface Location {
  id: string;
  region: RegionId;
  name: Localized;
  coords: [number, number];
  altitude: number;
  fromTbilisi: Localized;
  summary: Localized;
  description: Localized;
  /** 12 entries, January first */
  season: SeasonLevel[];
  access: AccessMode[];
  accessNote: Localized;
  infra: Record<InfraKey, boolean>;
  risks: { weather: Localized; altitude: Localized; avalanche: Localized };
  /** months (1–12) with elevated avalanche risk */
  avalancheMonths: number[];
  /** two-colour gradient used for the photo placeholder */
  palette: [string, string];
}

export type ShootStatus = 'planned' | 'notified' | 'active' | 'completed';

export interface Shoot {
  id: string;
  title: string;
  /** sample shoots carry a translated title */
  titleI18n?: Localized;
  producer: string;
  locationId: string;
  startDate: string;
  endDate: string;
  crewSize: number;
  route: string;
  equipment: string;
  emergencyName: string;
  emergencyPhone: string;
  accommodation: boolean;
  status: ShootStatus;
  createdAt: string;
  sample?: boolean;
}
