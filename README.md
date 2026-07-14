# Vipas Energy Navigator

A production-ready frontend for the Vipas Energy private authenticated admin portal.

## Tech Stack

- **Next.js** App Router
- **React 19** / **TypeScript** strict mode
- **Tailwind CSS v4** + **shadcn/ui**
- **Redux Toolkit** + **RTK Query**
- **Apache ECharts**
- **lucide-react**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Purpose                  |
| ---------------------- | ------------------------ |
| `npm run dev`          | Start development server |
| `npm run build`        | Production build         |
| `npm run lint`         | ESLint                   |
| `npm run type-check`   | TypeScript check         |
| `npm run format:check` | Prettier check           |
| `npm run format`       | Prettier write           |

## Environment Variables

| Variable                   | Description                          |
| -------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for all RTK Query API calls |

Create a `.env.local` file at the project root and set the variable above before running the app against a live backend.

## Project Structure

```
src/app/
  (auth)/login/         # Login route
  (dashboard)/          # Authenticated dashboard routes
    demand/
    supply/
    rate-tariff/
    carbon/
    subscriptions/
    account/
src/components/
  ui/                   # shadcn/ui primitives
  shared/               # Reusable application building blocks
  layout/               # Shared application shell components
  charts/               # Reusable chart wrappers
src/features/
  <feature>/
    components/         # Domain-owned UI
    mocks/              # Domain-owned stub data
    models/             # Domain-owned TypeScript models
    index.ts            # Public feature entry point
src/store/
  slices/               # Redux state slices
  api/                  # RTK Query base API
src/lib/
  tokens.ts             # Brand design tokens
```
