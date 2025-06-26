# Event Management Website (BookMyShow Clone)

## Overview
A full-stack event management and ticket booking platform inspired by BookMyShow. Features include:
- User authentication (register/login)
- Event listing, search, and filtering
- Event details and booking
- Seat selection
- User dashboard (bookings, profile)
- Admin dashboard (manage events, view bookings)
- Responsive design

## Getting Started

### 1. Backend (Express + MongoDB)
- See `server/README.md` for backend setup instructions.

### 2. Frontend (React)
```bash
cd client
npm install
npm run dev
```

## Environment Variables
- Backend: Add your MongoDB Atlas URI in `server/.env` as `MONGO_URI`.

---

## Folder Structure
- `client/` - React frontend
- `client/server/` - Express backend

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
