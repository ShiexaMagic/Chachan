import type { Localized } from '../types';

export type Block =
  | { kind: 'p'; text: Localized }
  | { kind: 'h'; text: Localized }
  | { kind: 'list'; items: Localized[] }
  | { kind: 'note'; text: Localized };

export interface Chapter {
  id: string;
  title: Localized;
  lead: Localized;
  minutes?: number;
  body?: Block[];
}

export const chapters: Chapter[] = [
  {
    id: 'planning',
    title: { ka: 'დაგეგმვა', en: 'Planning' },
    lead: {
      ka: 'როგორ ავაგოთ გადაღების გრაფიკი, როცა ამინდი და გზა გეგმას ყოველდღე ცვლის.',
      en: 'How to build a schedule when weather and roads rewrite the plan every day.',
    },
    minutes: 4,
    body: [
      {
        kind: 'p',
        text: {
          ka: 'მთაში გადაღების დაგეგმვა იწყება არა სცენარით, არამედ კალენდრით. სვანეთში, თუშეთსა და ხევსურეთში ბევრი ლოკაცია წელიწადში მხოლოდ 3–5 თვეა მისაწვდომი, ხოლო აბანოსა და დათვისჯვრის უღელტეხილები ზამთარში სრულად იკეტება. ამიტომ პირველი კითხვაა: როდის არის ლოკაცია რეალურად ხელმისაწვდომი — და მხოლოდ შემდეგ: როდის გვჭირდება ის სცენარისთვის.',
          en: 'Planning a mountain shoot starts with the calendar, not the script. Many locations in Svaneti, Tusheti and Khevsureti are reachable for only 3–5 months a year, and the Abano and Datvisjvari passes close completely in winter. So the first question is when a location is actually accessible — and only then when the script needs it.',
        },
      },
      { kind: 'h', text: { ka: '1.1 დროის მარაგი', en: '1.1 Building in buffer time' } },
      {
        kind: 'p',
        text: {
          ka: 'ბარში ჩვეულებრივი 10-დღიანი გადაღებისთვის მთაში მინიმუმ 2–3 სარეზერვო დღე დაგეგმეთ. ნისლი, წვიმის შემდეგ ჩამოწოლილი მეწყერი ან დაკეტილი გზა ერთ დღეს მარტივად „ჭამს“. სარეზერვო დღეები ბიუჯეტში თავიდანვე ჩადეთ — და არა როგორც გაუთვალისწინებელი ხარჯი.',
          en: 'For what would be a 10-day shoot in the lowlands, plan at least 2–3 reserve days in the mountains. Fog, a landslide after rain or a closed road easily costs a full day. Put reserve days in the budget from the start — not under contingency.',
        },
      },
      {
        kind: 'list',
        items: [
          { ka: 'სცენები დაალაგეთ ლოკაციის, არა სცენარის თანმიმდევრობით.', en: 'Group scenes by location, not by script order.' },
          { ka: 'ყოველ დღეს ჰქონდეს „ცუდი ამინდის“ ალტერნატივა (ინტერიერი, ახლო ხედები).', en: 'Give each day a bad-weather alternative (interiors, close-ups).' },
          { ka: 'ღია ლანდშაფტის კადრები დილით დაგეგმეთ — ნაშუადღევს ღრუბლები და ჭექა-ქუხილი ხშირია.', en: 'Schedule open-landscape shots in the morning — afternoons often bring cloud and storms.' },
          { ka: 'გადაადგილების დრო ორჯერ მეტი აიღეთ, ვიდრე რუკა აჩვენებს.', en: 'Allow twice the travel time a map suggests.' },
        ],
      },
      { kind: 'h', text: { ka: '1.2 ადგილობრივი მენეჯერის როლი', en: '1.2 The role of the local manager' } },
      {
        kind: 'p',
        text: {
          ka: 'ადგილობრივი ლოკაციის მენეჯერი არის ჯგუფის „თვალი და ყური“ რეგიონში: იცის, რომელი გზაა ღია, ვის ეკუთვნის მიწა, როდის არის სოფლის დღესასწაული და ვინ დაიქირავოს ცხენებისთვის. მასთან კონტაქტი გადაღებამდე მინიმუმ 4–6 კვირით ადრე დაამყარეთ.',
          en: 'The local location manager is the crew’s eyes and ears in the region: they know which roads are open, who owns the land, when a village holds its festival and whom to hire for horses. Get in touch at least 4–6 weeks before the shoot.',
        },
      },
      {
        kind: 'note',
        text: {
          ka: 'პრაქტიკული წესი: გადაღების რეგისტრაცია პლატფორმაზე გააკეთეთ მაშინვე, როცა თარიღები დადასტურდება — ასე მაშველებს, მუნიციპალიტეტს და სასტუმროებს მეტი დრო ექნებათ მოსამზადებლად.',
          en: 'Rule of thumb: register the shoot on the platform as soon as dates are confirmed — rescue, municipality and hotels then have more time to prepare.',
        },
      },
    ],
  },
  {
    id: 'safety',
    title: { ka: 'უსაფრთხოება და გადარჩენა', en: 'Safety & rescue' },
    lead: {
      ka: 'ვინ უნდა იცოდეს, სად ხართ — და რა ხდება, როცა რაღაც არასწორად მიდის.',
      en: 'Who needs to know where you are — and what happens when something goes wrong.',
    },
    minutes: 5,
    body: [
      {
        kind: 'p',
        text: {
          ka: 'მაღალმთიან რეგიონებში სამაშველო ოპერაცია საათებს, ზოგჯერ დღეებს მოითხოვს. ვერტმფრენი ამინდზეა დამოკიდებული, ხოლო მობილური კავშირი ბევრ ხეობაში არ არის. ამიტომ უსაფრთხოების საფუძველია ინფორმაცია: მაშველებმა წინასწარ უნდა იცოდნენ, სად, როდის და რამდენი ადამიანი იმუშავებს.',
          en: 'In high-mountain regions a rescue can take hours, sometimes days. Helicopters depend on the weather and many valleys have no mobile signal. The foundation of safety is therefore information: rescuers must know in advance where, when and how many people will be working.',
        },
      },
      { kind: 'h', text: { ka: '2.1 სამი ადრესატი, ერთი შეტყობინება', en: '2.1 Three recipients, one notice' } },
      {
        kind: 'list',
        items: [
          { ka: 'სამაშველო სამსახური — მარშრუტი, თარიღები, ჯგუფის ზომა, საგანგებო კონტაქტი.', en: 'Rescue service — route, dates, crew size, emergency contact.' },
          { ka: 'მუნიციპალიტეტი — გზების გადაკეტვა, საჯარო სივრცეები, ადგილობრივი ღონისძიებები.', en: 'Municipality — road closures, public spaces, local events.' },
          { ka: 'სასტუმრო — განთავსება და იმის ცოდნა, რომ ჯგუფი საღამოს უნდა დაბრუნდეს.', en: 'Hotel — accommodation, and knowing the crew should be back by evening.' },
        ],
      },
      { kind: 'h', text: { ka: '2.2 ყოველდღიური პროტოკოლი', en: '2.2 Daily protocol' } },
      {
        kind: 'p',
        text: {
          ka: 'ყოველ დილით ჯგუფის უსაფრთხოების პასუხისმგებელი ამოწმებს ამინდის პროგნოზს, ავსებს „გასვლის ფურცელს“ (ვინ, სად, დაბრუნების დრო) და ტოვებს მას სასტუმროში. თუ ჯგუფი დათქმულ დროს არ დაბრუნდა და კავშირზე არ გამოდის, სასტუმრო რეკავს მაშველებთან.',
          en: 'Every morning the crew’s safety lead checks the forecast, fills in a departure sheet (who, where, return time) and leaves it at the hotel. If the crew is not back on time and cannot be reached, the hotel calls the rescue service.',
        },
      },
      {
        kind: 'list',
        items: [
          { ka: 'სატელიტური კომუნიკატორი ან რაცია ყოველ გასვლაზე.', en: 'A satellite messenger or radio on every outing.' },
          { ka: 'პირველადი დახმარების ჩანთა და მინიმუმ ერთი გაწვრთნილი წევრი.', en: 'A first-aid kit and at least one trained crew member.' },
          { ka: '„უკან დაბრუნების დრო“ — მის შემდეგ კადრი აღარ არის მნიშვნელოვანი.', en: 'A turnaround time — after it, no shot is worth it.' },
        ],
      },
      {
        kind: 'note',
        text: {
          ka: 'საქართველოში საგანგებო ზარის ერთიანი ნომერია 112. დემოში მოცემული ყველა სხვა ნომერი გამოგონილია.',
          en: 'Georgia’s single emergency number is 112. All other numbers in this demo are fictional.',
        },
      },
    ],
  },
  {
    id: 'equipment',
    title: { ka: 'აღჭურვილობა სიცივესა და სიმაღლეზე', en: 'Equipment in cold & altitude' },
    lead: { ka: 'ბატარეები, კონდენსაცია, დრონები თხელ ჰაერში.', en: 'Batteries, condensation, drones in thin air.' },
  },
  {
    id: 'logistics',
    title: { ka: 'ლოჯისტიკა და ტრანსპორტი', en: 'Logistics & transport' },
    lead: { ka: '4x4, ცხენები, საწვავი და ტვირთის წონა.', en: '4x4s, horses, fuel and payload.' },
  },
  {
    id: 'communities',
    title: { ka: 'მუშაობა ადგილობრივ თემებთან', en: 'Working with local communities' },
    lead: { ka: 'ტრადიციები, სალოცავები და სამართლიანი ანაზღაურება.', en: 'Traditions, shrines and fair compensation.' },
  },
  {
    id: 'permits',
    title: { ka: 'ნებართვები', en: 'Permits' },
    lead: { ka: 'დაცული ტერიტორიები, ძეგლები, დრონები, სასაზღვრო ზონა.', en: 'Protected areas, monuments, drones, border zones.' },
  },
];
