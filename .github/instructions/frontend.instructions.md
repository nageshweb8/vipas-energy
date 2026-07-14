---
description: "Use when implementing Vipas Energy frontend TypeScript, React, Next.js App Router, Tailwind CSS, shadcn/ui, Redux Toolkit, RTK Query, or ECharts files."
applyTo: "**/*.{ts,tsx,css}"
---

# Frontend Implementation Rules

## Next.js App Router

- Keep routes in `src/app/` and preserve existing route groups such as `(dashboard)` and `(auth)`.
- Keep `src/app/layout.tsx` limited to global providers, fonts, and app-wide metadata.
- Do not add Pages Router files or duplicate route definitions.
- Use route/layout files for composition and shared shells, not for large business logic blocks.

## Client Component Rules

- Add `"use client"` only when a file needs hooks, event handlers, Redux hooks, RTK Query hooks, browser APIs, or ECharts.
- Do not mark root layouts as client components.
- Prefer the smallest interactive boundary instead of pushing unnecessary client rendering upward.

## Tailwind CSS v4 Rules

- Map and extend design tokens in `src/app/globals.css` using the Tailwind v4 token model already present in this repo.
- Prefer semantic classes such as `bg-background`, `text-foreground`, `text-brand-secondary`, and `border-border-default`.
- Reuse `cn()` for class composition.
- Do not hardcode brand hex values inside components when a token already exists.
- Avoid CSS modules unless the task explicitly needs them.

## shadcn/ui Rules

- Keep shadcn components under `src/components/ui`.
- Customize shadcn styling through existing tokens and Tailwind utilities, not by bypassing the project theme.
- Do not edit `node_modules`; keep source-owned component code in the repo.
- Add only the shadcn components needed for the requested scope.

## Redux Toolkit And RTK Query Rules

- Keep UI and auth state in slices under `src/store/slices`.
- Create future domain APIs with `baseApi.injectEndpoints()` under `src/store/api/`.
- Use typed hooks from `src/store/hooks.ts`.
- Keep bearer token injection inside `src/store/api/baseApi.ts`.
- Prefer RTK Query for GET API consumption instead of ad-hoc `fetch` calls in components.
- Once a domain API exists, do not import stub/mock data directly inside page components.

## ECharts Rules

- Use Apache ECharts only through shared wrappers in `src/components/charts` once chart work starts.
- Centralize chart theming with `src/lib/tokens.ts` and a shared ECharts theme module.
- Do not call `echarts.init()` directly in page components.
- Lazy-load heavy chart modules when implementation begins.

## Non-Negotiable Guardrails

- No `any`.
- No inline styles unless isolated in a documented third-party wrapper exception.
- No direct stub imports inside page components after RTK Query is available for that domain.
- No raw HTML rendering for AI or API responses.
