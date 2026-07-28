# BIXI Pulse 🚲

Real-time dashboard for Montréal's BIXI bike-sharing network. Watch station availability change live on an interactive map, search stations, and keep your favorites one click away.

> **Unofficial project** — not affiliated with BIXI Montréal. Built on their public GBFS feed.

![BIXI Pulse screenshot](docs/screenshot.png)

live demo : [Bixi Pulse live demo](https://bixi-pulse.vercel.app/)

## Features

- **Live availability** — station data refreshes every 10 seconds, matching the feed's TTL
- **Interactive map** — every station drawn as a colored marker (green / amber / red by bike availability), with a legend
- **Fly-to selection** — click a station in the list and the map flies to it and opens its popup
- **Debounced search** — filter stations by name as you type
- **Favorites** — star stations, persisted in `localStorage`, with a favorites-only filter
- **Montréal clock** — local time displayed via the native `Intl` timezone API

The UI is in French — the app targets Montréal.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict) on [Vite](https://vite.dev/)
- [TanStack Query](https://tanstack.com/query) for server state
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Base UI primitives)
- [react-leaflet](https://react-leaflet.js.org/) / [Leaflet](https://leafletjs.com/) for the map

## Architecture notes

- The GBFS feed splits station data in two: `station_information` (static — names, coordinates) and `station_status` (dynamic — bikes and docks). Each has its own query with its own cache strategy: status refetches every 10 s (the feed's TTL), information stays fresh for much longer.
- The two feeds are joined by a pure helper (`mergeStations`) using a `Map` index — one pass to index, one pass to merge, O(n).
- Server state lives in the TanStack Query cache and is read where needed (`useStations` in both the list and the map — same key, one fetch). Client state (selected station, filters) is lifted to the nearest common ancestor.

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (type-check + build), `npm run lint`, `npm run preview`.

## Data source

Station data comes from the public [GBFS 2.2 feed](https://gbfs.velobixi.com/gbfs/2-2/gbfs.json) published by BIXI Montréal. No API key required.
