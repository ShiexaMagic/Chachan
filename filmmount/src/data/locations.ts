import type { Location } from '../types';

// Sample data for the demo. Coordinates and altitudes are approximate;
// seasons and infrastructure are indicative and must be verified before real use.

export const locations: Location[] = [
  // ───────────── Svaneti ─────────────
  {
    id: 'ushguli',
    region: 'svaneti',
    name: { ka: 'უშგული', en: 'Ushguli' },
    coords: [42.9167, 43.011],
    altitude: 2100,
    fromTbilisi: { ka: '≈ 10–11 სთ მანქანით', en: '≈ 10–11 h by car' },
    summary: {
      ka: 'სათემო სოფელი სვანური კოშკებით შხარის ძირში.',
      en: 'Community of villages with Svan towers below Mt Shkhara.',
    },
    description: {
      ka: 'უშგული ევროპის ერთ-ერთი ყველაზე მაღალი მუდმივად დასახლებული სოფელია. შუასაუკუნეების კოშკები და შხარის მყინვარი კადრში ერთად ექცევა. ზაფხულში აქ ბევრი ტურისტია — გადაღებისთვის საჭიროა თემთან და მუნიციპალიტეტთან წინასწარი შეთანხმება.',
      en: 'Ushguli is among the highest permanently inhabited villages in Europe. Medieval towers and the Shkhara glacier sit in one frame. Summer brings many visitors — agree on shoots in advance with the community and the municipality.',
    },
    season: [1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 1, 1],
    access: ['car', '4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'მესტიიდან ≈ 45 კმ, 1,5–2 სთ. ზამთარში გზა ხშირად იკეტება თოვლის გამო — საჭიროა 4x4 და ჯაჭვები.',
      en: '≈ 45 km from Mestia, 1.5–2 h. In winter the road is often closed by snow — 4x4 and chains required.',
    },
    infra: { electricity: true, signal: true, accommodation: true },
    risks: {
      weather: { ka: 'სწრაფად ცვალებადი, ზაფხულის ნაშუადღევის ჭექა-ქუხილი.', en: 'Changeable; afternoon thunderstorms in summer.' },
      altitude: { ka: '2100 მ — მსუბუქი სიმაღლის ეფექტები შესაძლებელია.', en: '2,100 m — mild altitude effects possible.' },
      avalanche: { ka: 'დეკემბერი–მარტი; გზის მონაკვეთები ზვავსაშიშია.', en: 'December–March; parts of the road are avalanche-prone.' },
    },
    avalancheMonths: [12, 1, 2, 3],
    palette: ['#5C7A8C', '#C9B79A'],
  },
  {
    id: 'mestia',
    region: 'svaneti',
    name: { ka: 'მესტია და მიდამოები', en: 'Mestia area' },
    coords: [43.0453, 42.7293],
    altitude: 1500,
    fromTbilisi: { ka: '≈ 9 სთ მანქანით / ≈ 1 სთ ფრენით', en: '≈ 9 h by car / ≈ 1 h by air' },
    summary: {
      ka: 'რეგიონის ცენტრი — საბაზო ბანაკი გადამღები ჯგუფისთვის.',
      en: 'Regional centre — the natural base camp for a crew.',
    },
    description: {
      ka: 'მესტია სვანეთის ადმინისტრაციული ცენტრია: აეროპორტი, საავადმყოფო, სასტუმროები და ტექნიკის გაქირავება. აქედან ადვილად მიიღწევა ჰაცვალის და თეთნულდის სათხილამურო ზონები, ჩალაადის მყინვარი და კორულდის ტბები.',
      en: 'Mestia is the administrative centre of Svaneti: airport, hospital, hotels and equipment rental. Ski areas at Hatsvali and Tetnuldi, the Chalaadi glacier and the Koruldi lakes are all within reach.',
    },
    season: [2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2],
    access: ['car', '4x4', 'foot'],
    accessNote: {
      ka: 'ასფალტის გზა ზუგდიდიდან (≈ 3 სთ). რეგულარული ფრენები თბილისიდან ამინდზეა დამოკიდებული.',
      en: 'Paved road from Zugdidi (≈ 3 h). Scheduled flights from Tbilisi depend on the weather.',
    },
    infra: { electricity: true, signal: true, accommodation: true },
    risks: {
      weather: { ka: 'ზამთარში ძლიერი თოვა, ფრენების გაუქმება.', en: 'Heavy snowfall in winter; flight cancellations.' },
      altitude: { ka: '1500 მ — დაბალი რისკი.', en: '1,500 m — low risk.' },
      avalanche: { ka: 'იანვარი–მარტი, განსაკუთრებით ზუგდიდი–მესტიის გზაზე.', en: 'January–March, especially on the Zugdidi–Mestia road.' },
    },
    avalancheMonths: [1, 2, 3],
    palette: ['#3E5868', '#B9C4C7'],
  },
  {
    id: 'koruldi',
    region: 'svaneti',
    name: { ka: 'კორულდის ტბები', en: 'Koruldi Lakes' },
    coords: [43.0811, 42.7578],
    altitude: 2740,
    fromTbilisi: { ka: 'მესტიიდან 4–5 სთ ფეხით ან 1 სთ 4x4-ით', en: '4–5 h on foot or 1 h by 4x4 from Mestia' },
    summary: {
      ka: 'ალპური ტბები უშბის ხედით.',
      en: 'Alpine lakes with a direct view of Mt Ushba.',
    },
    description: {
      ka: 'მაღალმთიანი პლატო ტბებით, საიდანაც უშბის ორთავიანი მწვერვალი ჩანს. იდეალურია რეჟიმის (golden hour) კადრებისთვის, მაგრამ ტექნიკის ატანა რთულია და ელექტროენერგია არ არის.',
      en: "A high plateau with lakes facing Ushba's twin summit. Ideal for golden-hour shots, but hauling gear is hard and there is no power.",
    },
    season: [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0],
    access: ['4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'გრუნტის გზა ჯვრის ბორცვამდე, შემდეგ ბილიკი. ტვირთისთვის რეკომენდებულია ცხენები.',
      en: 'Dirt road to the Cross viewpoint, then a trail. Pack horses recommended for gear.',
    },
    infra: { electricity: false, signal: false, accommodation: false },
    risks: {
      weather: { ka: 'ღრუბლები სწრაფად ფარავს ხედს; ძლიერი ქარი.', en: 'Clouds can close in quickly; strong wind.' },
      altitude: { ka: '2740 მ — საჭიროა აკლიმატიზაცია.', en: '2,740 m — acclimatisation needed.' },
      avalanche: { ka: 'დეკემბერი–აპრილი; ზამთარში არ არის რეკომენდებული.', en: 'December–April; not recommended in winter.' },
    },
    avalancheMonths: [12, 1, 2, 3, 4],
    palette: ['#2E4A5A', '#8FB3BE'],
  },

  // ───────────── Tusheti ─────────────
  {
    id: 'omalo',
    region: 'tusheti',
    name: { ka: 'ომალო', en: 'Omalo' },
    coords: [42.373, 45.632],
    altitude: 1880,
    fromTbilisi: { ka: '≈ 6–7 სთ, აბანოს უღელტეხილით (4x4)', en: '≈ 6–7 h via Abano Pass (4x4)' },
    summary: {
      ka: 'თუშეთის მთავარი სოფელი კესელოს ციხით.',
      en: 'Main village of Tusheti, with the Keselo towers.',
    },
    description: {
      ka: 'ომალო თუშეთის „დედაქალაქია“ ზაფხულის თვეებში: საოჯახო სასტუმროები, მცირე მაღაზიები და სეზონური სამაშველო პუნქტი. ზემო ომალოდან კესელოს კოშკები ხეობას გადაჰყურებს.',
      en: 'Omalo is Tusheti’s summer “capital”: family guesthouses, small shops and a seasonal rescue post. The Keselo towers in Upper Omalo overlook the valley.',
    },
    season: [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0],
    access: ['4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'ერთადერთი გზა აბანოს უღელტეხილზე გადის და ჩვეულებრივ ივნისიდან ოქტომბრამდეა ღია. მხოლოდ 4x4 გამოცდილი მძღოლით.',
      en: 'The only road crosses Abano Pass and is usually open June–October. 4x4 with an experienced local driver only.',
    },
    infra: { electricity: true, signal: true, accommodation: true },
    risks: {
      weather: { ka: 'წვიმის შემდეგ გზა ხშირად იკეტება მეწყერით.', en: 'Landslides often close the road after rain.' },
      altitude: { ka: '1880 მ — დაბალი/საშუალო რისკი.', en: '1,880 m — low to moderate risk.' },
      avalanche: { ka: 'ზამთარში რეგიონი პრაქტიკულად მოწყვეტილია.', en: 'In winter the region is effectively cut off.' },
    },
    avalancheMonths: [11, 12, 1, 2, 3, 4],
    palette: ['#5A6B4F', '#C8B88E'],
  },
  {
    id: 'dartlo',
    region: 'tusheti',
    name: { ka: 'დართლო', en: 'Dartlo' },
    coords: [42.4097, 45.5672],
    altitude: 1950,
    fromTbilisi: { ka: 'ომალოდან ≈ 1 სთ 4x4-ით', en: '≈ 1 h from Omalo by 4x4' },
    summary: {
      ka: 'ფიქლის სახლები და კოშკები ფირიქითის ხეობაში.',
      en: 'Slate houses and towers in the Pirikiti valley.',
    },
    description: {
      ka: 'დართლო ფიქლის ქვით ნაგები სოფელია, რომელიც ხშირად გვხვდება ისტორიულ და დოკუმენტურ ფილმებში. კადრში თანამედროვე ელემენტები მინიმალურია.',
      en: 'Dartlo is a village built of dark slate, often seen in historical and documentary films. Modern elements in frame are minimal.',
    },
    season: [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0],
    access: ['4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'ომალოდან გრუნტის გზა ალაზნის გასწვრივ; მდინარის ფონი ზოგჯერ ღრმაა.',
      en: 'Dirt track from Omalo along the Alazani; river fords can be deep.',
    },
    infra: { electricity: true, signal: false, accommodation: true },
    risks: {
      weather: { ka: 'მდინარის დონე მატულობს ნაშუადღევს.', en: 'River levels rise in the afternoon.' },
      altitude: { ka: '1950 მ — დაბალი/საშუალო რისკი.', en: '1,950 m — low to moderate risk.' },
      avalanche: { ka: 'ნოემბერი–აპრილი, მისასვლელები დაკეტილია.', en: 'November–April; access closed.' },
    },
    avalancheMonths: [11, 12, 1, 2, 3, 4],
    palette: ['#4B5560', '#B7A88A'],
  },
  {
    id: 'abano-pass',
    region: 'tusheti',
    name: { ka: 'აბანოს უღელტეხილი', en: 'Abano Pass' },
    coords: [42.273, 45.388],
    altitude: 2850,
    fromTbilisi: { ka: '≈ 4 სთ, ფშაველიდან 4x4-ით', en: '≈ 4 h, by 4x4 from Pshaveli' },
    summary: {
      ka: 'ერთ-ერთი ყველაზე დრამატული მთის გზა კავკასიაში.',
      en: 'One of the most dramatic mountain roads in the Caucasus.',
    },
    description: {
      ka: 'სერპანტინები, ღრუბლების ზემოთ გამავალი გზა და ღრმა ხეობები — ძლიერი კადრები road movie-სა და დოკუმენტური კინოსთვის. გზაზე გაჩერება და დრონის აფრენა მხოლოდ უსაფრთხო მოედნებზე.',
      en: 'Switchbacks above the clouds and deep gorges — powerful material for road movies and documentaries. Stop and fly drones only at safe pull-outs.',
    },
    season: [0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
    access: ['4x4', 'foot'],
    accessNote: {
      ka: 'ვიწრო გრუნტის გზა ბარიერების გარეშე; საჭიროა ადგილობრივი მძღოლი. ღიაა დაახლ. ივნისიდან სექტემბრის ბოლომდე.',
      en: 'Narrow unpaved road without barriers; local driver required. Open roughly June to late September.',
    },
    infra: { electricity: false, signal: false, accommodation: false },
    risks: {
      weather: { ka: 'ნისლი და სველი, მოლიპული საფარი.', en: 'Fog and wet, slippery surface.' },
      altitude: { ka: '2850 მ — სწრაფი ასვლა, თავის ტკივილი შესაძლებელია.', en: '2,850 m — rapid ascent; headaches possible.' },
      avalanche: { ka: 'ნოემბერი–მაისი; გზა დაკეტილია.', en: 'November–May; road closed.' },
    },
    avalancheMonths: [11, 12, 1, 2, 3, 4, 5],
    palette: ['#3A4A57', '#9AA7AE'],
  },

  // ───────────── Racha ─────────────
  {
    id: 'oni',
    region: 'racha',
    name: { ka: 'ონი და მიდამოები', en: 'Oni area' },
    coords: [42.579, 43.442],
    altitude: 800,
    fromTbilisi: { ka: '≈ 3,5–4 სთ მანქანით', en: '≈ 3.5–4 h by car' },
    summary: {
      ka: 'პატარა ქალაქი რიონის ხეობაში — მარტივი ლოჯისტიკა.',
      en: 'Small town in the Rioni valley — easy logistics.',
    },
    description: {
      ka: 'ონი რაჭის ცენტრია: ისტორიული სინაგოგა, ძველი ქუჩები და რიონის ხეობის ხედები. ასფალტის გზა, სასტუმროები და სერვისები — კარგი ბაზაა რეგიონის სხვა ლოკაციებისთვის.',
      en: 'Oni is the centre of Racha: a historic synagogue, old streets and views of the Rioni valley. Paved road, hotels and services make it a good base for the rest of the region.',
    },
    season: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    access: ['car', '4x4', 'foot'],
    accessNote: {
      ka: 'ასფალტის გზა ქუთაისიდან ან თბილისიდან ამბროლაურის გავლით. მთელი წლის განმავლობაში ხელმისაწვდომია.',
      en: 'Paved road from Kutaisi or Tbilisi via Ambrolauri. Accessible year-round.',
    },
    infra: { electricity: true, signal: true, accommodation: true },
    risks: {
      weather: { ka: 'გაზაფხულზე წყალდიდობა რიონზე.', en: 'Spring floods on the Rioni.' },
      altitude: { ka: '800 მ — რისკი არ არის.', en: '800 m — no risk.' },
      avalanche: { ka: 'ქალაქში — არა; მაღალ ხეობებში იანვარი–მარტი.', en: 'Not in town; January–March in upper valleys.' },
    },
    avalancheMonths: [],
    palette: ['#4F6B5A', '#D2C3A0'],
  },
  {
    id: 'shovi',
    region: 'racha',
    name: { ka: 'შოვი', en: 'Shovi' },
    coords: [42.704, 43.685],
    altitude: 1550,
    fromTbilisi: { ka: 'ონიდან ≈ 1 სთ', en: '≈ 1 h from Oni' },
    summary: {
      ka: 'მინერალური წყლების კურორტი ფიჭვნარში.',
      en: 'Mineral-spring resort in pine forest.',
    },
    description: {
      ka: 'შოვი საბჭოთა კურორტის ნაშთებისა და ფიჭვის ტყის კომბინაციაა, ბუბას მყინვარის ხედით. შესაფერისია როგორც ბუნების, ისე ისტორიული კადრებისთვის. 2023 წლის მეწყრის შემდეგ ნაწილი ტერიტორიისა შეზღუდულია.',
      en: 'Shovi combines remnants of a Soviet-era resort with pine forest and views of the Buba glacier. Suited for nature and period scenes. Parts of the area are restricted after the 2023 landslide.',
    },
    season: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1],
    access: ['car', '4x4', 'foot'],
    accessNote: {
      ka: 'ასფალტი უწერამდე, შემდეგ ნაწილობრივ გრუნტი. შეზღუდული ზონების შესახებ გადაამოწმეთ მუნიციპალიტეტთან.',
      en: 'Paved to Utsera, then partly unpaved. Check restricted zones with the municipality.',
    },
    infra: { electricity: true, signal: true, accommodation: true },
    risks: {
      weather: { ka: 'ძლიერი წვიმები — მეწყრის საფრთხე.', en: 'Heavy rain — landslide hazard.' },
      altitude: { ka: '1550 მ — დაბალი რისკი.', en: '1,550 m — low risk.' },
      avalanche: { ka: 'იანვარი–მარტი, ფერდობების ქვეშ.', en: 'January–March, below steep slopes.' },
    },
    avalancheMonths: [1, 2, 3],
    palette: ['#3F5A4A', '#A9B9A0'],
  },
  {
    id: 'shaori',
    region: 'racha',
    name: { ka: 'შაორის ტბის მიდამოები', en: 'Shaori Lake area' },
    coords: [42.405, 42.955],
    altitude: 1130,
    fromTbilisi: { ka: '≈ 3,5 სთ, ტყიბულის გავლით', en: '≈ 3.5 h via Tkibuli' },
    summary: {
      ka: 'ტბა ნაქერალას ქედზე — ღია ჰორიზონტი და ნისლი.',
      en: 'Lake on the Nakerala ridge — open horizons and fog.',
    },
    description: {
      ka: 'შაორის ტბა ზეგანზე მდებარეობს, ტყით გარშემორტყმული. დილის ნისლი და წყლის სარკე ატმოსფერულ კადრებს იძლევა. ახლოს განთავსება შეზღუდულია — ბაზად ამბროლაური ან ტყიბული გამოიყენეთ.',
      en: 'Shaori Lake sits on a plateau ringed by forest. Morning fog and still water make for atmospheric images. Accommodation nearby is limited — base in Ambrolauri or Tkibuli.',
    },
    season: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    access: ['car', '4x4'],
    accessNote: {
      ka: 'ნაქერალას უღელტეხილის გზა ასფალტიანია, ზამთარში — თოვლით დაფარული.',
      en: 'The Nakerala pass road is paved; snow-covered in winter.',
    },
    infra: { electricity: true, signal: true, accommodation: false },
    risks: {
      weather: { ka: 'ხშირი ნისლი — ნელი მოძრაობა.', en: 'Frequent fog — drive slowly.' },
      altitude: { ka: '1130 მ — რისკი არ არის.', en: '1,130 m — no risk.' },
      avalanche: { ka: 'პრაქტიკულად არ არის.', en: 'Practically none.' },
    },
    avalancheMonths: [],
    palette: ['#4A6670', '#C3CDC6'],
  },

  // ───────────── Khevsureti ─────────────
  {
    id: 'shatili',
    region: 'khevsureti',
    name: { ka: 'შატილი', en: 'Shatili' },
    coords: [42.6587, 45.1594],
    altitude: 1400,
    fromTbilisi: { ka: '≈ 4–5 სთ, დათვისჯვრის უღელტეხილით', en: '≈ 4–5 h via Datvisjvari Pass' },
    summary: {
      ka: 'ციხე-სოფელი — ერთიანი ქვის კომპლექსი.',
      en: 'Fortress-village — a single stone complex.',
    },
    description: {
      ka: 'შატილი ერთმანეთზე მიდგმული სახლ-კოშკების კომპლექსია არღუნის ხეობაში. ერთ-ერთი ყველაზე ცნობადი ლოკაცია ისტორიული ფილმებისთვის. ძეგლზე გადაღება კულტურული მემკვიდრეობის წესებს ექვემდებარება.',
      en: 'Shatili is a cluster of interlocking tower-houses in the Argun gorge, one of the most recognisable locations for historical films. Filming at the monument is subject to cultural-heritage rules.',
    },
    season: [0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0],
    access: ['car', '4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'ზაფხულში გამვლელია მაღალი კლირენსის მანქანით; დათვისჯვარი (2676 მ) ჩვეულებრივ მაისის ბოლოდან ნოემბრამდეა ღია.',
      en: 'In summer passable by high-clearance car; Datvisjvari (2,676 m) is usually open late May to November.',
    },
    infra: { electricity: true, signal: true, accommodation: true },
    risks: {
      weather: { ka: 'უღელტეხილზე მოულოდნელი თოვა სექტემბრიდანვე.', en: 'Sudden snow on the pass from September.' },
      altitude: { ka: 'სოფელი 1400 მ, უღელტეხილი 2676 მ.', en: 'Village 1,400 m; pass 2,676 m.' },
      avalanche: { ka: 'ნოემბერი–მაისი უღელტეხილზე.', en: 'November–May on the pass.' },
    },
    avalancheMonths: [11, 12, 1, 2, 3, 4, 5],
    palette: ['#56606A', '#C2B49A'],
  },
  {
    id: 'mutso',
    region: 'khevsureti',
    name: { ka: 'მუცო', en: 'Mutso' },
    coords: [42.601, 45.216],
    altitude: 1880,
    fromTbilisi: { ka: 'შატილიდან ≈ 1 სთ 4x4 + 40 წთ ფეხით', en: '≈ 1 h by 4x4 from Shatili + 40 min on foot' },
    summary: {
      ka: 'კლდის თავზე შეფენილი ციხე-სოფელი.',
      en: 'Fortress-village perched on a cliff.',
    },
    description: {
      ka: 'მუცო კლდოვან ქიმზე აშენებული ციხე-სოფელია, რომელიც ნაწილობრივ რესტავრირებულია. ზედა კოშკებამდე ასვლა ციცაბოა — მძიმე ტექნიკა ცხენით ან ხელით ადის.',
      en: 'Mutso is a partly restored fortress-village on a rocky spur. The climb to the upper towers is steep — heavy gear goes up by horse or by hand.',
    },
    season: [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0],
    access: ['4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'გრუნტის გზა შატილიდან არდოტისკენ; სოფლამდე ციცაბო ბილიკი.',
      en: 'Dirt road from Shatili towards Ardoti; steep path up to the village.',
    },
    infra: { electricity: false, signal: false, accommodation: false },
    risks: {
      weather: { ka: 'ქვაცვენა წვიმის შემდეგ.', en: 'Rockfall after rain.' },
      altitude: { ka: '1880 მ, ციცაბო ასვლა.', en: '1,880 m, steep climb.' },
      avalanche: { ka: 'ნოემბერი–აპრილი; მისასვლელი დაკეტილია.', en: 'November–April; access closed.' },
    },
    avalancheMonths: [11, 12, 1, 2, 3, 4],
    palette: ['#4D5258', '#A99B85'],
  },
  {
    id: 'roshka',
    region: 'khevsureti',
    name: { ka: 'როშკა და აბუდელაურის ტბები', en: 'Roshka & Abudelauri lakes' },
    coords: [42.565, 44.988],
    altitude: 2000,
    fromTbilisi: { ka: '≈ 4 სთ მანქანით + 2–3 სთ ფეხით ტბებამდე', en: '≈ 4 h by car + 2–3 h on foot to the lakes' },
    summary: {
      ka: 'სამი ფერის მყინვარული ტბა ჭაუხის კედლის ქვეშ.',
      en: 'Three coloured glacial lakes below the Chaukhi wall.',
    },
    description: {
      ka: 'როშკა პატარა სოფელია, საიდანაც ბილიკი აბუდელაურის მწვანე, ლურჯ და თეთრ ტბებამდე მიდის. ჭაუხის კლდოვანი კედელი ფონად ძლიერ, „ალპურ“ კადრს ქმნის.',
      en: 'Roshka is a small village from which a trail leads to the green, blue and white Abudelauri lakes. The rocky Chaukhi wall makes a strong “alpine” backdrop.',
    },
    season: [0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0],
    access: ['4x4', 'foot', 'horse'],
    accessNote: {
      ka: 'გზა ბარისახოდან როშკამდე გრუნტიანია; ტბებამდე მხოლოდ ბილიკი.',
      en: 'Unpaved road from Barisakho to Roshka; only a trail to the lakes.',
    },
    infra: { electricity: true, signal: false, accommodation: true },
    risks: {
      weather: { ka: 'ნაშუადღევის ჭექა-ქუხილი, ღია რელიეფი.', en: 'Afternoon thunderstorms on exposed terrain.' },
      altitude: { ka: 'ტბები ≈ 2800 მ — სიმაღლის ეფექტები.', en: 'Lakes at ≈ 2,800 m — altitude effects.' },
      avalanche: { ka: 'ნოემბერი–მაისი.', en: 'November–May.' },
    },
    avalancheMonths: [11, 12, 1, 2, 3, 4, 5],
    palette: ['#3C5560', '#9DBFB4'],
  },
];

export const locationById = (id: string): Location | undefined => locations.find((l) => l.id === id);

export const SEASON_MONTHS = {
  winter: [12, 1, 2],
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  autumn: [9, 10, 11],
} as const;
