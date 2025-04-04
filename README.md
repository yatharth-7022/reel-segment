🎥 Reels - Optimized Instagram-like Reels Segment

A high-performance Instagram-style Reels application with backend powered by Node.js, Express, PostgreSQL, and Cloudinary for video storage. Built with modern React optimizations for a smooth infinite-scrolling experience.

✨ Features
🚀 Performance Optimizations
Virtualized lists with react-window (only renders visible content)

Lazy loading for videos and images

Smart caching with React Query (reduces API calls)

Code splitting (faster initial load with Vite)

🎥 Reel Functionality
Infinite scroll for seamless browsing

Upload reels (stored in Cloudinary)

Like & comment on reels (real-time updates)

View reels from other users

🔒 Backend & Storage
Node.js + Express REST API

PostgreSQL database (users, likes, comments)

Cloudinary for video uploads & streaming

JWT Authentication (secure user sessions)

🛠 Tech Stack
Frontend
⚡ Vite (fast builds & HMR)

⚛️ React 18 (concurrent features)

🎨 Tailwind CSS (responsive design)

🔄 React Query (data fetching & caching)

📜 React Window (virtualized scrolling)

Backend
🏗 Node.js + Express

🗄 PostgreSQL (structured data storage)

☁️ Cloudinary (video uploads & CDN)

🔐 JWT Authentication

🚀 Getting Started
Prerequisites
Node.js (v16+)

PostgreSQL (running locally or remote)

Cloudinary account (for video storage)

Installation
Clone the repo

bash
Copy
git clone https://github.com/yourusername/reels-app.git
cd reels-app
Install dependencies

bash
Copy
npm install
# or
yarn install
Set up environment variables

Create .env files for both frontend and backend (check .env.example)

Required:

DATABASE_URL (PostgreSQL connection string)

CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

Run the app

bash
Copy
# Start backend (Express + PostgreSQL)
cd Reel-segment-backend && nox nodemon server.js

# Start frontend (Vite + React)
cd Reel-segment-frontend && npm run dev
🏗 Project Structure(Not updated)
Copy
reels-app/
├── backend/              # Node.js + Express API
│   ├── controllers/      # Route handlers
│   ├── models/           # Database models (PostgreSQL)
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation
│   └── utils/            # Helpers (Cloudinary, JWT)
│
├── frontend/             # Vite + React
│   ├── src/
│   │   ├── components/   # Reusable UI
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Screen components
│   │   ├── services/     # API calls
│   │   └── styles/       # Tailwind config
│   └── vite.config.js    # Vite settings
│
├── .env.example          # Environment variables template
└── README.md             # You're here! 😃
📜 Available Scripts
Frontend (Vite)
Command	Description
npm run dev	Start dev server (fast HMR)
npm run build	Optimized production build
npm run preview	Test production build locally
Backend (Express)
Command	Description
npm run dev	Start dev server (Nodemon)
npm start	Production start
🔄 Data Flow
Video Upload

User uploads → Express API → Cloudinary (stores video) → PostgreSQL (metadata)

Fetching Reels

React Query caches reels → Virtualized list renders only visible items

Likes/Comments

Optimistic updates → PostgreSQL stores interactions

📸 Screenshots (Optional)
![image](https://github.com/user-attachments/assets/250906ac-4b77-4a10-8613-3fb13777c8a2)
![image](https://github.com/user-attachments/assets/55f959e2-2ae9-4750-a2ea-a7de069463c6)
![image](https://github.com/user-attachments/assets/c139691d-73f4-4ed3-a37a-ae7bbe98113c)


🤝 Contributing
PRs welcome! Please follow:

Fork → Clone → Create Branch

Test changes → Open PR



Made with ❤️ by Yatharth
