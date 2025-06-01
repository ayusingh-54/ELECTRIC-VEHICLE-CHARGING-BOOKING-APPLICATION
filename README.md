# Evoltsoft • Smart EV Charging Network

**Evoltsoft** is a full-stack web application that empowers electric vehicle owners to find, book, and manage charging sessions across a nationwide network of fast, reliable, and eco-friendly charging stations.

---

## Table of Contents

1. [Key Features](#key-features)
2. [Tech Stack](#tech-stack)
3. [Architecture & Folder Structure](#architecture--folder-structure)
4. [Prerequisites](#prerequisites)
5. [Environment Variables](#environment-variables)
6. [Getting Started](#getting-started)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
7. [Usage & Workflows](#usage--workflows)
8. [API Reference](#api-reference)
9. [Deployment Guide](#deployment-guide)
10. [Contributing](#contributing)
11. [License](#license)
12. [Contact & Support](#contact--support)

---

## Key Features

- 🗺️ **Interactive Map View**: Real-time markers for all charging stations
- 🔎 **Search & Filter**: Find stations by city, availability, or price
- ⏰ **Slot Booking**: Reserve charging timeslots in advance
- ⚡ **Fast Charging**: Supports DC fast chargers (CCS, CHAdeMO)
- 💳 **Flexible Pricing**: Pay-per-use, monthly passes, corporate plans
- 👤 **User & Owner Portals**: Role-based dashboards and permissions
- 🔒 **Secure Auth**: JWT authentication, password hashing with bcrypt
- ☁️ **Cloud Ready**: Deployable on Vercel (frontend) & any Node host

---

## Tech Stack

**Frontend**

- React 18 • Vite • React Router
- React Bootstrap • Axios • React Icons
- Environment via VITE_BASE_URL, Google Maps API

**Backend**

- Node.js 18+ • Express.js
- MongoDB • Mongoose ORM
- JWT • bcrypt for auth
- CORS, dotenv

---

## Architecture & Folder Structure

evoltsoft/  
├─ **server/**  
│ ├─ index.js • App setup, routes & DB middleware  
│ ├─ Models/ • Mongoose schemas (User, Station, Booking)  
│ ├─ Router/ • Express routers (user, ev, booking)  
│ └─ .env • `MONGODB_URI`, `JWT_SECRET`, `PORT`  
│  
├─ **client/**  
│ ├─ public/ • index.html, static assets  
│ ├─ src/  
│ │ ├─ App.jsx • Routes & context provider  
│ │ ├─ main.jsx • ReactDOM render  
│ │ ├─ Context/ • LoginContext  
│ │ ├─ Components/ • UI components, modals, tables  
│ │ ├─ Pages/ • Route pages (Home, Stations, Profile…)  
│ │ ├─ index.css • Global styles  
│ │ └─ .env • `VITE_BASE_URL`, `VITE_GOOGLE_MAPS_API_KEY`  
│ ├─ package.json • Scripts: dev, build, preview  
│ └─ vite.config.js

---

## Prerequisites

- Node.js v16+ (v18 recommended)
- MongoDB (local or Atlas)
- Git

---

## Environment Variables

Create a `.env` in **server/** and **client/** with:

**server/.env**

```
MONGODB_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
PORT=5000
```

**client/.env**

```
VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=<Your Google Maps API key>
```

---

## Getting Started

### Backend Setup

```bash
cd server
npm install
npm run dev        # starts Node + nodemon on PORT
```

### Frontend Setup

```bash
cd client
npm install
npm run dev        # Vite dev server at http://localhost:5173
```

Open your browser at `http://localhost:5173`. The frontend will proxy to the backend API using `VITE_BASE_URL`.

---

## Usage & Workflows

1. **Sign Up / Login**
   - Register as _user_, _ev-station owner_, or _admin_.
2. **Find Stations**
   - Browse list or map, filter by location, availability, price.
3. **Book a Slot (Users)**
   - Choose date/time, enter vehicle details, confirm payment.
4. **Manage Stations (Owners/Admins)**
   - Add new station via modal, pick accurate location on mini-map.
   - View bookings, cancel slots.
5. **Profile**
   - Update personal info, view/cancel your bookings.

---

## API Reference

**Auth**

- POST `/user/register` – register user
- POST `/user/login` – login, returns JWT & user data

**Stations**

- GET `/ev/all-stations`
- POST `/ev/create`
- PATCH `/ev/book-slot/:id`
- DELETE `/ev/delete/:id`

**Bookings**

- POST `/booking/new-booking`
- GET `/booking/user/get-all-bookings/:userId`
- DELETE `/booking/delete-slot-by-id/:id`

Refer to server/Router for full route details and payload schemas.

---

## Deployment Guide

### Frontend (Vercel)

1. Push `client/` to GitHub.
2. Import project in Vercel, set root folder to `client`.
3. Add environment variables (`VITE_BASE_URL`, `VITE_GOOGLE_MAPS_API_KEY`).

### Backend (Heroku / Railway / Render)

1. Push `server/` to GitHub.
2. Create app on Heroku (or similar), connect repo.
3. Set env vars in dashboard.
4. Deploy; your API is live and front will consume it.

---

## Contributing

1. Fork repo & clone.
2. Create feature branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m "feat: add amazing feature"`
4. Push & open a PR.

Please follow code style, write clear commit messages, and add minimal documentation for any new endpoints or components.

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Contact & Support

- 📧 ayusingh693@gmail.com
- 🛠️ Issues & feedback via GitHub issues
- 🌐 Project home: https://github.com/ayusingh-54/ELECTRIC-VEHICLE-CHARGING-BOOKING-APPLICATION

Thank you for exploring **Evoltsoft** – powering the future of electric mobility!
