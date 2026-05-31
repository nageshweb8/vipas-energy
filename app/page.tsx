export default function HomePage() {
  return (
    <main className="bg-background min-h-[100dvh] px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-8">
        <section className="border-border-default bg-card rounded-3xl border p-8 shadow-sm sm:p-10">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">
            Design Token Foundation
          </p>
          <h1 className="text-brand-secondary mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Vipas Energy
          </h1>
          <p className="text-brand-text mt-4 max-w-3xl text-base leading-7 sm:text-lg">
            Global design tokens and font foundations are configured. Montserrat
            is the default UI font, Lora is available for accent and display
            usage, and brand colors are mapped for both semantic UI tokens and
            direct Tailwind usage.
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-6">
            Dashboard pages, business components, charts, and mock data remain
            intentionally deferred in this phase.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-border-default bg-card rounded-3xl border p-8 shadow-sm">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">
              Font Verification
            </p>
            <h2 className="text-brand-secondary mt-4 text-3xl font-semibold tracking-tight">
              Montserrat drives interface copy and navigation.
            </h2>
            <p className="text-brand-text mt-4 max-w-2xl leading-7">
              This paragraph uses the default sans font token. It verifies that
              the global UI font is applied through Tailwind and the root layout
              without introducing any component-level styling.
            </p>
            <p className="font-serif text-brand-secondary mt-8 text-2xl leading-9">
              Lora is available for accent, editorial, and display moments when
              the interface needs a softer branded contrast.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="bg-brand-primary rounded-3xl p-6 text-white shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em]">
                Primary
              </p>
              <p className="mt-3 text-2xl font-semibold">#00A176</p>
              <p className="mt-2 text-sm text-white/80">
                Buttons, selected states, positive status, key CTAs.
              </p>
            </div>

            <div className="bg-brand-secondary rounded-3xl p-6 text-white shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em]">
                Secondary
              </p>
              <p className="mt-3 text-2xl font-semibold">#003F5C</p>
              <p className="mt-2 text-sm text-white/80">
                Brand contrast, headings, sidebar and header accents.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="border-border-default bg-brand-mint rounded-3xl border p-6">
            <p className="text-brand-secondary text-sm font-medium uppercase tracking-[0.18em]">
              Brand Mint
            </p>
            <p className="text-brand-text mt-3 text-xl font-semibold">#E6F4F1</p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Soft backgrounds, active navigation fills, empty-state highlights.
            </p>
          </div>

          <div className="border-border-default bg-surface-white rounded-3xl border p-6">
            <p className="text-brand-secondary text-sm font-medium uppercase tracking-[0.18em]">
              Surface White
            </p>
            <p className="text-brand-text mt-3 text-xl font-semibold">#FFFFFF</p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Cards, dialogs, and elevated surfaces on the application canvas.
            </p>
          </div>

          <div className="border-border-default bg-card rounded-3xl border p-6">
            <p className="text-brand-secondary text-sm font-medium uppercase tracking-[0.18em]">
              Semantic Status
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-success/12 text-success rounded-full px-3 py-1 text-sm font-medium">
                Success
              </span>
              <span className="bg-warning/12 text-warning rounded-full px-3 py-1 text-sm font-medium">
                Warning
              </span>
              <span className="bg-danger/12 text-danger rounded-full px-3 py-1 text-sm font-medium">
                Danger
              </span>
              <span className="bg-info/12 text-info rounded-full px-3 py-1 text-sm font-medium">
                Info
              </span>
            </div>
          </div>

          <div className="border-border-default bg-card rounded-3xl border p-6">
            <p className="text-brand-secondary text-sm font-medium uppercase tracking-[0.18em]">
              Chart Palette
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-chart-1 h-10 rounded-2xl" />
              <div className="bg-chart-2 h-10 rounded-2xl" />
              <div className="bg-chart-3 h-10 rounded-2xl" />
              <div className="bg-chart-4 h-10 rounded-2xl" />
              <div className="bg-chart-5 h-10 rounded-2xl" />
              <div className="bg-chart-6 h-10 rounded-2xl" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
