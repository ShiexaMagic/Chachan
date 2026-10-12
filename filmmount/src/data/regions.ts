import type { Region, RegionId } from '../types';

// All people, phone numbers, e-mails and hotels below are FICTIONAL placeholders.
// Phone numbers use the non-existent "000" prefix; e-mails use the reserved .example domain.

export const regions: Region[] = [
  {
    id: 'svaneti',
    name: { ka: 'სვანეთი', en: 'Svaneti' },
    tagline: { ka: 'კოშკები, მყინვარები, უშბა', en: 'Towers, glaciers, Mt Ushba' },
    center: [43.0, 42.85],
    rescue: { ka: 'სამაშველო სამსახური — მესტიის განყოფილება', en: 'Rescue Service — Mestia unit' },
    municipality: { ka: 'მესტიის მუნიციპალიტეტი', en: 'Mestia Municipality' },
    hotel: { ka: 'სასტუმრო „კოშკის ხედი“ (ნიმუში)', en: 'Hotel “Tower View” (sample)' },
    manager: {
      name: { ka: 'თამარ ქ.', en: 'Tamar K.' },
      languages: [
        { ka: 'ქართული', en: 'Georgian' },
        { ka: 'სვანური', en: 'Svan' },
        { ka: 'ინგლისური', en: 'English' },
      ],
      phone: '+995 000 00 01 01',
      email: 'svaneti.manager@filmmount.example',
      base: { ka: 'მესტია', en: 'Mestia' },
      since: 2025,
    },
  },
  {
    id: 'tusheti',
    name: { ka: 'თუშეთი', en: 'Tusheti' },
    tagline: { ka: 'აბანოს უღელტეხილი და ციხე-სოფლები', en: 'Abano Pass and fortress villages' },
    center: [42.37, 45.55],
    rescue: { ka: 'სამაშველო სამსახური — ომალოს სეზონური პუნქტი', en: 'Rescue Service — Omalo seasonal post' },
    municipality: { ka: 'ახმეტის მუნიციპალიტეტი', en: 'Akhmeta Municipality' },
    hotel: { ka: 'სასტუმრო „მთის სახლი“ (ნიმუში)', en: 'Guesthouse “Mountain House” (sample)' },
    manager: {
      name: { ka: 'გიორგი ბ.', en: 'Giorgi B.' },
      languages: [
        { ka: 'ქართული', en: 'Georgian' },
        { ka: 'რუსული', en: 'Russian' },
        { ka: 'ინგლისური', en: 'English' },
      ],
      phone: '+995 000 00 02 02',
      email: 'tusheti.manager@filmmount.example',
      base: { ka: 'ომალო (ზაფხ.) / ზემო ალვანი', en: 'Omalo (summer) / Zemo Alvani' },
      since: 2025,
    },
  },
  {
    id: 'racha',
    name: { ka: 'რაჭა', en: 'Racha' },
    tagline: { ka: 'ტყიანი ხეობები და ტბები', en: 'Forested valleys and lakes' },
    center: [42.55, 43.3],
    rescue: { ka: 'სამაშველო სამსახური — ონის განყოფილება', en: 'Rescue Service — Oni unit' },
    municipality: { ka: 'ონის მუნიციპალიტეტი', en: 'Oni Municipality' },
    hotel: { ka: 'სასტუმრო „მდინარის ნაპირი“ (ნიმუში)', en: 'Hotel “River Bend” (sample)' },
    manager: {
      name: { ka: 'ნინო ჯ.', en: 'Nino J.' },
      languages: [
        { ka: 'ქართული', en: 'Georgian' },
        { ka: 'ინგლისური', en: 'English' },
        { ka: 'გერმანული', en: 'German' },
      ],
      phone: '+995 000 00 03 03',
      email: 'racha.manager@filmmount.example',
      base: { ka: 'ონი', en: 'Oni' },
      since: 2026,
    },
  },
  {
    id: 'khevsureti',
    name: { ka: 'ხევსურეთი', en: 'Khevsureti' },
    tagline: { ka: 'ქვის სოფლები არღუნის ხეობაში', en: 'Stone villages of the Argun gorge' },
    center: [42.6, 45.08],
    rescue: { ka: 'სამაშველო სამსახური — დუშეთის განყოფილება', en: 'Rescue Service — Dusheti unit' },
    municipality: { ka: 'დუშეთის მუნიციპალიტეტი', en: 'Dusheti Municipality' },
    hotel: { ka: 'სასტუმრო „უღელტეხილის ხედი“ (ნიმუში)', en: 'Lodge “Pass View” (sample)' },
    manager: {
      name: { ka: 'ლევან ა.', en: 'Levan A.' },
      languages: [
        { ka: 'ქართული', en: 'Georgian' },
        { ka: 'ინგლისური', en: 'English' },
        { ka: 'ფრანგული', en: 'French' },
      ],
      phone: '+995 000 00 04 04',
      email: 'khevsureti.manager@filmmount.example',
      base: { ka: 'შატილი (ზაფხ.) / დუშეთი', en: 'Shatili (summer) / Dusheti' },
      since: 2026,
    },
  },
];

export const regionById = (id: RegionId): Region => regions.find((r) => r.id === id)!;
