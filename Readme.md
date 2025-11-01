# Weather App – Quick Start Note

1. Install dependencies for both projects:
	- `cd backend && npm install`
	- `cd ../frontend && npm install`
2. Create `.env` files:
	- Backend: set `PORT`, `OPENWEATHER_API_KEY`, `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, and optional `FRONTEND_URL`.
	- Frontend: set `VITE_API_URL`, `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE`.
3. Run the servers in separate terminals:
	- Backend: `npm run dev` (from `backend/`).
	- Frontend: `npm run dev` (from `frontend/`).
4. Open the app at `http://localhost:5173` (or the port Vite prints), log in with your Auth0 tenant, and explore the weather cards.
g