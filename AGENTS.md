# Vipas Energy Agent Guide

## Project Overview

Vipas Energy is a production-ready frontend application for a private authenticated energy-management admin portal. This repository is frontend-only. It owns routing, layout structure, client state, API consumption, and visualization rendering. It does not own ETL, reporting-table generation, or backend orchestration.

## Stack

- Next.js App Router on the current repo version
- React 19
- TypeScript 5+ in strict mode
- Tailwind CSS v4
- shadcn/ui
- Redux Toolkit + RTK Query
- Apache ECharts
- lucide-react
- Montserrat and Lora via `next/font/google`

## Setup And Validation

Use these commands after meaningful changes:

```bash
npm install
npm run format:check
npm run lint
npm run type-check
npm run build
```

## Architecture Rules

- Keep routing in `src/app/` using the App Router. Use route groups such as `(dashboard)` and `(auth)` when they help structure layouts without changing URLs.
- Keep root concerns in `src/app/layout.tsx`: fonts, global CSS, and providers only.
- Keep design tokens in `src/app/globals.css` and `src/lib/tokens.ts`. Reuse token names instead of introducing ad-hoc hex values in components.
- Keep shared UI primitives in `src/components/ui` and lightweight shared building blocks in `src/components/shared`.
- Keep domain-owned components, models, mocks, and future API modules under `src/features/<feature>`, with `src/features/<feature>/index.ts` as the public feature entry point.
- Do not deep-import one feature from another. Shared components must not depend on feature modules.
- Keep app state in Redux slices under `src/store/slices` and API access through `src/store/api/baseApi.ts` plus `injectEndpoints()` domain files.
- Frontend consumes backend GET APIs through RTK Query. Backend owns staging/reporting tables, tenant scoping, and data preparation.
- Use Apache ECharts only through shared chart wrappers and theme/registry files once chart work begins.

## What Not To Do

- Do not add Pages Router files.
- Do not use `any`.
- Do not add inline styles unless a third-party integration absolutely requires them and the exception is isolated in one shared wrapper.
- Do not bypass `baseApi` with ad-hoc `fetch` calls in page components for normal application data.
- Do not import stub or mock data directly into page components once RTK Query endpoints exist.
- Do not expose secrets, API keys, or direct third-party credentials in the client bundle.
- Do not add dashboard widgets, chart implementations, or business flows unless the task explicitly asks for them.

## Current Implementation Phase

The repo currently contains:

- project scaffold and quality tooling
- brand tokens and fonts
- Redux store, `authSlice`, `uiSlice`, and `baseApi`
- route placeholders for `/`, `/demand`, `/supply`, `/rate-tariff`, `/carbon`, `/subscriptions`, `/account`, and `/login`

The repo does not yet contain:

- app shell navigation
- business widgets
- domain RTK Query APIs
- chart components
- live API integration

## Expected Workflow

1. Inspect the relevant files first.
2. Plan the smallest viable change.
3. Implement only the requested scope.
4. Validate with the narrowest useful commands.
5. Summarize what changed, what was validated, and any assumptions.

## Next.js Note

This repo uses a newer Next.js App Router release. Before changing routing, layouts, rendering boundaries, or framework-specific APIs, check the versioned docs in `node_modules/next/dist/docs/` instead of relying on older framework assumptions.
