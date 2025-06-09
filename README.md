### 🎮 Backlogr

Track your gaming backlog, swipe-style.

Backlogr is a mobile-friendly web app for managing your personal game library. Add games, organize them by status, and swipe through your collection one card at a time. Built for simplicity and joy — no logins, no bloat.

### Why It Exists

Every gamer has a backlog — and most backlog tools are overkill. Backlogr strips it down to the essentials: a swipeable, categorized collection you can manage in seconds.

It’s a fast, local-first app with a clean UI and zero distractions.

### Features

- Add games via IGDB search (powered by a secure backend proxy)

- Filter by Backlog, Playing, Completed, or Dropped

- Swipe navigation on mobile, button controls on desktop

- LocalStorage persistence (no login needed)

- Status and date tracking for each entry

- Cover art via IGDB

### Tech Stack

- Frontend: React + Vite + TypeScript

- State Management: Zustand

- Styling: SCSS Modules (Mobile-first design)

- Backend: Node + AWS Lambda proxy for IGDB API

- Persistence: LocalStorage

### Deployed At

https://backlogr.vercel.app/

### Coming Features

A few ideas queued up for future polish:

- In-list search to quickly find a specific game

- Estimated time-to-beat integration

- Stats breakdown by status (e.g. % completed)

- Shuffle and random game picker

- Notes or personal ratings per game

### Get Started

```bash
git clone https://github.com/zakkfast/backlogr
cd backlogr
npm install
npm run dev
```
