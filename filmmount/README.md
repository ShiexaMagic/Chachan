# FilmMount — demo

**Working title:** Film Production in High-Mountain Georgia (კინოწარმოება მაღალმთიან საქართველოში)

A clickable demo of a shared hub for film crews shooting in Svaneti, Tusheti, Racha and Khevsureti.
It is built to show grant reviewers and partners how the platform works. **There is no backend:**
all data is sample data, and no real notifications or messages are sent.

## What you can try

1. **Home** → *Enter demo* (fake profile: *Producer · Demo Studio*).
2. **Register a shoot** (`/app/shoots/new`). Pick a location, dates, crew, route, equipment,
   emergency contact and accommodation, then submit. The *Notifications sent* panel then animates
   the three recipients for the chosen region: Rescue Service, the municipality and a partner hotel.
   If accommodation is needed, the hotel shows *Awaiting reply* for a few seconds before it confirms.
3. **Shoots**: the new shoot appears next to three preloaded sample shoots, with status chips.
   It is saved in `localStorage`. Use *Reset demo data* in the sidebar to clear it.
4. **Locations & Managers**: a Leaflet/OpenStreetMap map next to a list of 12 sample locations.
   You can filter by region, best season, access mode and infrastructure.
5. **Location detail**: a season calendar, access, infrastructure, risks and the regional manager
   card, with a mock *Contact manager* form.
6. **Guide**: a table of contents with two sample chapters (Planning, Safety & rescue).

The **KA / EN** toggle switches every UI string. Georgian is the default.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + static build into dist/
npm run preview    # serve the built site
```

Requires Node 18+.

## Deploy

The build output is a static site in `dist/`. Routing is client-side, so every path must fall
back to `index.html`. Both configs are already included.

- **Vercel**: import the repo, set *Root Directory* to `filmmount`, framework *Vite*. `vercel.json` adds the SPA rewrite.
- **Netlify**: set *Base directory* to `filmmount`. `netlify.toml` sets the build command and `dist/`, and `public/_redirects` handles the SPA fallback.
- **Any static host**: upload `dist/` and configure a fallback to `index.html`.

## Offline notes

The app itself works offline once it has loaded. Two things need a connection:
- Google Fonts (*Noto Serif/Sans Georgian*): falls back to system fonts.
- OpenStreetMap tiles: the map markers still render on a plain background.

## Project structure

```
src/
  i18n/strings.ts        all UI strings (ka + en)
  i18n/LangContext.tsx   language state, t(), L() for {ka,en} data
  data/                  regions + managers, locations, sample shoots, guide chapters
  lib/shootStore.ts      localStorage-backed shoot store
  components/            layout, logo, map, notifications panel, modal, …
  pages/                 Home, Shoots, RegisterShoot, Locations, LocationDetail, Guide
```

Content data (locations, guide text) keeps its own `{ ka, en }` pairs next to the data. The UI chrome
lives in `strings.ts`.

## Demo honesty

- A persistent banner reads: *Demo version — sample data, no real notifications are sent.*
- Every person, phone number (non-existent `+995 000 …` range), e-mail (`.example` domain) and hotel is
  fictional. Location facts (altitudes, seasons, access) are approximate and indicative only.
