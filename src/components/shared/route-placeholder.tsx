interface RoutePlaceholderProps {
  title: string;
  description: string;
}

export function RoutePlaceholder({
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] px-4 py-5 sm:px-5 lg:px-6">
      <section className="border-border-default bg-card grid w-full gap-4 rounded-xl border p-8 shadow-sm sm:p-10">
        <p className="text-muted-foreground text-sm font-semibold tracking-[0.16em] uppercase">
          Coming Next
        </p>
        <h1 className="text-brand-secondary text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="text-brand-text max-w-2xl text-base leading-7">
          {description}
        </p>
      </section>
    </main>
  );
}
