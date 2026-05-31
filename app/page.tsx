export default function HomePage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-6 py-16">
      <section className="border-border bg-card w-full max-w-3xl rounded-2xl border p-8 shadow-sm sm:p-10">
        <p className="text-muted-foreground text-sm font-medium tracking-[0.2em] uppercase">
          Production Scaffold
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Vipas Energy
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
          Next.js App Router, React 19, TypeScript strict mode, Tailwind CSS v4,
          shadcn/ui, Redux Toolkit, and RTK Query are configured. Business
          pages, dashboard widgets, charts, and API endpoints are intentionally
          deferred.
        </p>
      </section>
    </main>
  );
}
