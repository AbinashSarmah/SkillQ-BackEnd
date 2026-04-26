# AuraQ Backend

Express + MongoDB backend for the AuraQ frontend.

## Setup

1. Copy envs:
   - `cp .env.example .env`
2. Install dependencies:
   - `npm install`
3. Seed initial data:
   - `npm run seed`
4. Start server:
   - `npm run dev`

## Environment Variables

- `PORT` - API port (default: `5000`)
- `MONGODB_URI` - Mongo connection string
- `CLIENT_ORIGIN` - allowed CORS origin (default: `http://localhost:3000`)
- `DEFAULT_USER_USERNAME` - username used as default active user

## API Routes

### Health

- `GET /api/health`

### Profile

- `GET /api/me`
- `PATCH /api/me`
- `GET /api/me/stats`
- `GET /api/me/settings`
- `PATCH /api/me/settings`

### Categories

- `GET /api/categories`
- `POST /api/categories`

### Quizzes

- `GET /api/quizzes`
- `GET /api/quizzes/:id`
- `POST /api/quizzes`
- `POST /api/quizzes/:id/attempts`
- `GET /api/quizzes/:id/leaderboard`
- `GET /api/quizzes/leaderboard`
- `GET /api/leaderboard`

### Notifications

- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
