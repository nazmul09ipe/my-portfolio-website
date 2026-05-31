# Md. Nazmul Haque — Portfolio

A world-class, production-ready full-stack developer portfolio built with React, Vite, Tailwind CSS, Express, and MongoDB.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, GSAP, Swiper, React CountUp, React Icons, Axios, React Router, React Hot Toast, Lottie React, Firebase Auth |
| **Backend** | Node.js, Express, MongoDB, Firebase Admin, Helmet, CORS, Rate Limiting |

## Project Structure

```
my-portfolio-web/
├── frontend/          # React + Vite SPA
│   └── src/
│       ├── components/   # UI, layout, sections
│       ├── context/      # Theme & Auth
│       ├── hooks/        # Custom hooks
│       ├── layouts/      # Page layouts
│       ├── pages/        # Route pages
│       ├── services/     # API layer
│       ├── data/         # Static portfolio content
│       └── config/       # Firebase client
├── backend/           # Express REST API
│   └── src/
│       ├── config/       # DB & Firebase
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── scripts/      # Seed data
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI

npm install
npm run dev
```

Seed sample projects and skills:

```bash
npm run seed
```

API runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
cp .env.example .env
# Optional: add Firebase and VITE_API_URL

npm install
npm run dev
```

App runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| GET | `/api/projects` | No | List projects |
| POST | `/api/messages` | No | Submit contact form |
| GET | `/api/skills` | No | List skills |
| POST/PATCH/DELETE | `/api/*` | Firebase token | Admin CRUD |

## Features

- Fully responsive design
- Dark / light mode with persistence
- Glassmorphism & gradient UI
- GSAP scroll animations & Framer Motion micro-interactions
- Animated gradient background
- SEO meta tags
- Lazy-loaded routes
- Contact form with MongoDB storage
- Firebase Authentication (optional admin)

## Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

Deploy the `frontend/dist` folder to Vercel/Netlify and the backend to Railway/Render with `MONGODB_URI` and `CLIENT_URL` set.

## License

MIT © Md. Nazmul Haque
