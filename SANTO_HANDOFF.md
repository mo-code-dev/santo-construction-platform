# Santo — Front-End Handoff

## Scope
Complete construction ERP / project management / field operations front-end. Backend is intentionally excluded; all application UI is API-ready and currently uses mock data.

## Demo
- URL after deployment: `/`
- Demo Login: `demo@santo.app`
- Demo Password: `SantoDemo123`
- Client-only demo session: localStorage key `santo-demo-auth`

## Core modules
Overview, Projects, Field Operations, Tasks, Schedule, Accounting, Human Resources, Materials, Procurement, Suppliers, Equipment, Safety & Compliance, Documents, Contracts, Reports, Estimating & Bids, BOQ / Cost Codes, RFIs, Submittals, QA/QC, Subcontractors, Meetings, Drawings / Sheets, Closeout, Settings.

## Auth flows
Sign in, Register, Forgot password, Reset password, Verify email, Accept invitation, Onboarding, 401/403/404/500 states.

## Backend handoff
Replace demo auth with real authentication and connect `lib/api.ts` to the backend using `NEXT_PUBLIC_API_URL`. Keep the response envelope:

`{ success, message, data, errors }`

Use API/service functions to replace mock data without changing the presentation components.

## Recommended production follow-up
- Replace localStorage demo auth with secure server/API session or JWT strategy.
- Add real RBAC enforcement server-side.
- Add real file storage and signed uploads.
- Connect accounting, payroll, procurement, safety, and document APIs.
