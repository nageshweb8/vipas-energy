# Vipas Energy Copilot Instructions

## Project Overview

Vipas Energy is a production-ready frontend for a private authenticated energy-management dashboard. The app is built as a real long-lived codebase, not a disposable mockup.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui
- Redux Toolkit + RTK Query
- Apache ECharts
- lucide-react
- Montserrat and Lora fonts

## Current Architecture Boundaries

- App routing lives under `src/app/(dashboard)` and `src/app/(auth)`.
- Root layout owns fonts, global CSS, and providers only.
- Design tokens live in `src/app/globals.css` and `src/lib/tokens.ts`.
- Global state lives in `src/store/slices`; API access starts from `src/store/api/baseApi.ts`.
- Placeholder routes exist, but the dashboard shell, widgets, and domain APIs are not implemented yet.
- Backend owns ETL, reporting/staging tables, and API payload generation. Frontend owns rendering, state, routing, and API consumption.

## Do

- Preserve the App Router structure and route groups.
- Use strict TypeScript with explicit interfaces and narrow types.
- Reuse brand tokens through Tailwind utilities and `src/lib/tokens.ts`.
- Use RTK Query for application data fetching and endpoint injection.
- Keep future chart work behind shared ECharts wrappers and a single theme/registry.
- Run validation commands relevant to the change before finishing.

## Do Not

- Do not use `any`.
- Do not add inline styles unless a third-party library requires a tightly scoped wrapper exception.
- Do not add Pages Router files.
- Do not fetch normal application data directly inside page components when RTK Query is the intended path.
- Do not import stub/mock data directly into page components after a domain API file exists.
- Do not add secrets or third-party keys to client code.
- Do not blur frontend and backend responsibilities by implementing staging logic in the frontend.

## Coding Standards

- Keep components small and composable.
- Prefer shared primitives over copy-pasted markup.
- Keep route files thin; import feature page components through `src/features/<feature>/index.ts`.
- Keep reusable UI in `src/components/`, domain-owned code in `src/features/`, and shared Redux infrastructure in `src/store/`.
- Prefer semantic Tailwind token classes over raw color literals.
- Keep placeholder/demo state clearly separated from production state transitions.

## Security Expectations

- Auth tokens flow through Redux and RTK Query header injection.
- Keep third-party credentials server-side only.
- Do not use `dangerouslySetInnerHTML` for AI or API text responses.
- Treat tenant boundaries and subscription gating as backend concerns enforced by API responses, not frontend assumptions.

## Validation Commands

```bash
npm run format:check
npm run lint
npm run type-check
npm run build
```

## Frontend/Backend Boundary

- Frontend: routing, layout, components, chart rendering, RTK Query consumption, client state, responsive behavior.
- Backend: ETL, staging/reporting tables, row-level access, subscription entitlements, API contracts, AI orchestration.
