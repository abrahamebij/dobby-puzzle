# Dobby Tile Puzzle

![image](https://github.com/user-attachments/assets/ef3a5096-af50-47ac-8faa-ab08ce98500b)

**Dobby Tile Puzzle** is a fast-paced browser-based tile puzzle game that challenges your speed, memory, and problem-solving skills.  
Compete against other players by solving puzzles as quickly as possible and climb the global leaderboard!

---

## Demo

[https://dobby-tile.vercel.app/](https://dobby-tile.vercel.app/)

![Demo Video](https://github.com/user-attachments/assets/47ffbe5d-2433-4f27-8dd0-b23512f4bbec)

---

## Features

- 🎮 **Challenging Gameplay** – Solve tile puzzles under time pressure.
- 🏆 **Global Leaderboard** – Compete with others and track your rank.
- ⚡ **Optimized Performance** – Uses server-side and client-side caching for faster leaderboard loading.
- 🖥️ **Modern Stack** – Built with Next.js and Appwrite for a scalable experience.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, TailwindCSS
- **Backend:** Appwrite (Databases & Server Functions)
- **Caching:** Server-side in-memory cache + Client-side session storage
- **Deployment:** (Add your deployment platform, e.g., Vercel/Netlify)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Appwrite instance (self-hosted or cloud)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abrahamebij/dobby-puzzle.git
   cd dobby-puzzle
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   APPWRITE_PROJECT_ID=your-project-id
   DATABASE_ID=your_database_id
   LEADERBOARD_EASY_ID=your_easy_collection_id
   LEADERBOARD_HARD_ID=your_hard_collection_id
   APPWRITE_ENDPOINT="https://<region>.cloud.appwrite.io/v1"
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

---

## Leaderboard Caching

- **Server-side caching:**
  Leaderboard data is cached in memory for 1 minute to reduce Appwrite calls.

- **Client-side caching:**
  The client stores leaderboard data in `sessionStorage` to speed up reloads.
  After an update (e.g., submitting a new score), the cache is automatically cleared to fetch fresh data.

---

## Project Structure

```bash
/public
/src
  /app           # App Router
  /db            # All Database Manipulation
  /components    # Reusable components
  /hooks         # Custom hooks (e.g., leaderboard fetching)
  /lib           # Appwrite setup & helper functions
```

---

## Things Still Left To Do

- [ ] Convert to PWA.
- [ ] Ability to update leaderboard if the same user scores higher.
- [ ] Add animations & sound effects.
- [ ] Implement offline mode.
- [ ] Create a mobile-friendly UI.

---

## Contributing

1. Fork the project.
2. Create your feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```

5. Open a pull request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Appwrite](https://appwrite.io)
- [TailwindCSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/)
