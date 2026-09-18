# Energy Care Company

MERN solar energy company website inspired by the public product and company information from SolarMaxo/Urja Group, redesigned as an original Energy Care brand.

## Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and submits enquiries to the Express API at `http://localhost:5000/api/enquiries`. To persist enquiries, create `backend/.env` with `MONGODB_URI=mongodb://127.0.0.1:27017/energycare`; without it, valid submissions are logged by the API.
