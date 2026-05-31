export default function HomePage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Production Scaffold
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Vipas Energy
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Next.js App Router, React 19, TypeScript strict mode, Tailwind CSS v4,
          shadcn/ui, Redux Toolkit, and RTK Query are configured. Business pages,
          dashboard widgets, charts, and API endpoints are intentionally deferred.
        </p>
      </section>
    </main>
  );
}
