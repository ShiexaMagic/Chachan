# Actor portfolio data

`portfolio.html` (the list) and `talent.html?id=<slug>` (one actor's page) both read
their profiles from **`talents/talents.json`**. Everyone who visits the site sees
the same data.

## Adding an actor

1. Create a folder named after the actor's slug, e.g. `talents/giorgi-beridze/`.
2. Put their files in it:
   - photos: `1.jpg`, `2.jpg`, … (the **first photo is the cover**). Resize to
     about 1600px on the long side and keep each file under ~500KB.
   - CV (optional): `cv.pdf`
   - showreel: upload to **YouTube** (Unlisted is fine) or Vimeo and paste the
     link. Small `.mp4` files (under ~50MB) can also go in the folder.
3. Add an entry to `talents/talents.json`:

```json
[
  {
    "slug": "giorgi-beridze",
    "name": { "ka": "გიორგი ბერიძე", "en": "Giorgi Beridze" },
    "gender": "male",
    "birthYear": 1998,
    "height": 182,
    "weight": 75,
    "eyeColor": { "ka": "ყავისფერი", "en": "Brown" },
    "hairColor": { "ka": "შავი", "en": "Black" },
    "city": { "ka": "თბილისი", "en": "Tbilisi" },
    "languages": { "ka": ["ქართული", "ინგლისური"], "en": ["Georgian", "English"] },
    "skills": { "ka": ["ცეკვა", "ცხენოსნობა"], "en": ["Dance", "Horse riding"] },
    "bio": { "ka": "მოკლე ბიოგრაფია...", "en": "Short bio..." },
    "education": { "ka": "2026 — shuQi Production-ის სამსახიობო კურსი", "en": "2026 — shuQi Production acting course" },
    "experience": { "ka": "2024 — ფილმი „...“, მთავარი როლი\n2023 — თეატრი ...", "en": "..." },
    "photos": [
      "talents/giorgi-beridze/1.jpg",
      "talents/giorgi-beridze/2.jpg"
    ],
    "videos": ["https://youtu.be/XXXXXXXXXXX"],
    "cv": "talents/giorgi-beridze/cv.pdf",
    "email": "",
    "phone": ""
  }
]
```

Only `slug`, `name` and `gender` are required. Leave out any other field you
don't have. Text fields can be either a plain string or `{ "ka": ..., "en": ... }`.
If only one language is filled in, that one is shown in both.

- `slug`: lowercase latin letters, digits and dashes. This becomes the link:
  `shuqi.ge/talent.html?id=giorgi-beridze`.
- `"birthDate": "2000-02-10"` (or just `"birthYear": 2000`) keeps the age up to
  date automatically. A fixed `"age": 25` also works but goes stale.
- `role` (optional) replaces the "Actor" line under the name.
- `email` / `phone` are shown publicly. Leave them empty to route all enquiries
  through `info@shuqi.ge`, which is always shown.
- `experience` uses `\n` for line breaks.
