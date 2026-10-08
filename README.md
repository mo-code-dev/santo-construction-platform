# Santo — Construction Operations Platform

Complete frontend for a construction ERP, project management, and field operations platform.

## Stack

- Next.js 16.4
- React 19.3
- TypeScript
- Tailwind CSS v4
- Lucide React
- Framer Motion dependency included for future restrained motion polish

## Demo login

Email: `demo@santo.app`

Password: `SantoDemo123`

The demo uses browser `localStorage` for client-only demo auth. It is **not production authentication**. Replace it with a real API/auth provider when the backend is connected.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Backend integration

Set `NEXT_PUBLIC_API_URL` in the environment. `lib/api.ts` provides a small typed fetch wrapper using the API shape:

```json
{ "success": true, "message": "Success", "data": {}, "errors": [] }
```

## Routes

Public: `/`, `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`, `/invite`, `/onboarding`

App: `/app` plus independent module routes for projects, field operations, tasks, schedule, accounting, HR, materials, procurement, suppliers, equipment, safety, documents, contracts, reports, estimating, BOQ, RFIs, submittals, QA/QC, subcontractors, meetings, drawings, closeout, and settings.
