import Link from "next/link";

const tiles = [
  {
    title: "Pferdepläne",
    desc: "Pläne erstellen, vorbereiten und exportieren.",
    href: "/pferdeplaene",
  },
  {
    title: "Pferde",
    desc: "Status, Verfügbarkeit und Regeln einsehen.",
    href: "/pferde",
  },
  {
    title: "Kinder",
    desc: "Listen nach Niveau importieren und zuweisen.",
    href: "/kinder",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-paper p-8 shadow-soft">
        {/* décor léger */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sand" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-bordeaux/10" />

        <div className="relative space-y-3">
          <span className="badge">Internes Tool</span>
          <h1 className="text-4xl font-semibold text-ink">Rosenhof Pferdeplan</h1>
          <p className="max-w-2xl text-sm text-ink/70">
            Schnell, übersichtlich und zuverlässig: Pferde auswählen, Gruppen vorbereiten,
            Regeln setzen und Kinder zuweisen – alles an einem Ort.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link href="/pferdeplaene" className="btn-primary">
              Zum Pferdeplan
            </Link>
            <Link href="/pferde" className="btn-secondary">
              Pferdeübersicht
            </Link>
          </div>
        </div>
      </section>

      {/* Tiles */}
      <section className="grid gap-4 md:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="card p-6 transition hover:-translate-y-0.5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-ink">{t.title}</h2>
              <p className="text-sm text-ink/70">{t.desc}</p>
              <div className="pt-2 text-sm font-medium text-bark">
                Öffnen →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Petit bloc “ton Rosenhof” */}
      <section className="card p-6">
        <h3 className="text-lg font-semibold">Hinweis</h3>
        <p className="mt-2 text-sm text-ink/70">
          Dieses Tool ist für Rosenhof Reiterferien gedacht. Bitte verwende klare Namen,
          und halte die Planung konsistent (Basis / MittelFort / Fortler).
        </p>
      </section>
    </div>
  );
}
