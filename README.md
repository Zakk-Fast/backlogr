# 🎮 Backlogr

**Backlogr** is a sleek, swipe-based game backlog tracker for managing what you’re playing, have played, or plan to play. Built to feel great on mobile, it combines a minimal UI with powerful game search powered by the IGDB API. Whether you're juggling retro ROMs or next-gen releases, Backlogr helps you stay focused—and finish more games.

---

## 🕹 Features

- **Mobile-First Swipe Interface**  
  Swipe through full-screen game cards to update status (Playing, Completed, Backlog, Dropped).

- **Add Games via IGDB Search**  
  Search by title and instantly add game metadata including cover art, platform, and release info.

- **Game Status Filters**  
  Easily browse only what you’re currently playing, completed titles, or your full wishlist.

- **Persistent Local Storage**  
  All game data is stored in `localStorage`, so your list is always saved—even offline.

- **Fast, Minimal UX**  
  Built with speed and simplicity in mind. No logins, no clutter—just your games.

---

## 🖼️Screenshots
![Screenshot 2025-06-25 124655](https://github.com/user-attachments/assets/57de031d-9434-4142-aa24-c10116da169c)
![Screenshot 2025-06-25 124655](https://github.com/user-attachments/assets/57de031d-9434-4142-aa24-c10116da169c)
![Screenshot 2025-06-25 124643](https://github.com/user-attachments/assets/ba927ad4-994a-43b8-b8e9-8244e9635ab4)
![Screenshot 2025-06-25 124643](https://github.com/user-attachments/assets/ba927ad4-994a-43b8-b8e9-8244e9635ab4)
![Screenshot 2025-06-25 124634](https://github.com/user-attachments/assets/cc9544b7-a5a2-4256-bc57-e3a5e048ce29)
![Screenshot 2025-06-25 124634](https://github.com/user-attachments/assets/cc9544b7-a5a2-4256-bc57-e3a5e048ce29)



---

## 🛠 Tech Stack

| Area            | Tools / Frameworks                        |
|-----------------|-------------------------------------------|
| Frontend        | React, TypeScript, SCSS Modules           |
| State Management| Zustand (lightweight, reactive)           |
| Backend         | AWS Lambda + API Gateway (IGDB proxy)     |
| API             | IGDB (via Twitch OAuth)                   |
| Storage         | `localStorage` for user persistence       |
| Deployment      | Vercel                                     |

---

## 📱 UX Flow

1. **Search & Add Games**  
   Use the “+” button to search IGDB and add games to your backlog.

2. **Swipe Through Cards**  
   View each game full-screen. Tap to cycle statuses or swipe to reorder.

3. **Filter by Status**  
   Use the bottom nav to show only what you're currently playing or plan to play.

---

## 🧪 Planned Features
- Drag-to-reorder within status filters  
- Social features: shareable backlogs or recommendations  

---

## 🚀 Getting Started

```bash
git clone https://github.com/Zakk-Fast/backlogr.git
cd backlogr
npm install
npm run dev
