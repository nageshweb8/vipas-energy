interface RoutePlaceholderProps {
  title: string;
  description: string;
}

export function RoutePlaceholder({
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <main className="bg-background min-h-[100dvh] px-6 py-16">
      <section className="border-border-default bg-card mx-auto grid w-full max-w-3xl gap-4 rounded-3xl border p-8 shadow-sm sm:p-10">
        <p className="text-muted-foreground text-sm font-medium tracking-[0.2em] uppercase">
          Route Placeholder
        </p>
        <h1 className="text-brand-secondary text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="text-brand-text max-w-2xl text-base leading-7">
          {description}
        </p>
      </section>
    </main>
  );
}
