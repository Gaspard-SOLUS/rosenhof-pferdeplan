import Link from "next/link";
import { getHorseById } from "@/lib/mock";
import type { HorseCategory, HorseStatus } from "@/lib/types";

function statusLabel(s: HorseStatus) {
  if (s === "VERFUEGBAR") return "Verfügbar";
  if (s === "KRANK") return "Krank";
  return "Nicht verfügbar";
}
function statusClass(s: HorseStatus) {
  if (s === "VERFUEGBAR") return "bg-emerald-100 text-emerald-900 border-emerald-200";
  if (s === "KRANK") return "bg-red-100 text-red-900 border-red-200";
  return "bg-sand text-ink/70 border-line";
}

function categoryLabel(c: HorseCategory) {
  if (c === "FORTLER_BAHN") return "Fortler – Bahn";
  if (c === "PRIVAT") return "Privat";
  return "Normal";
}
function categoryClass(c: HorseCategory) {
  if (c === "FORTLER_BAHN") return "bg-violet-100 text-violet-900 border-violet-200";
  if (c === "PRIVAT") return "bg-bordeaux/10 text-ink border-bordeaux/25";
  return "bg-sky-100 text-sky-900 border-sky-200";
}

function planCompatibility(c: HorseCategory) {
  if (c === "NORMAL") return "Nur Normaler Reitplan";
  if (c === "FORTLER_BAHN") return "Nur Fortler – Bahnstunden";
  return "Nicht im Unterricht (Privat)";
}

export default function PferdDetailsPage({ params }: { params: { id: string } }) {
  const horse = getHorseById(params.id);

  if (!horse) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-ink">Pferd nicht gefunden</h1>
        <p className="text-sm text-ink/60">
          Diese ID existiert nicht in den Demo-Daten.
        </p>
        <Link href="/pferde" className="btn-secondary">
          Zurück zu Pferde
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-ink">{horse.name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className={["badge border", categoryClass(horse.category)].join(" ")}>
            {categoryLabel(horse.category)}
          </span>
          <span className={["badge border", statusClass(horse.status)].join(" ")}>
            {statusLabel(horse.status)}
          </span>
          <span className="badge border border-line bg-sand text-ink/70">
            ID: <span className="ml-1 font-medium text-ink">{horse.id}</span>
          </span>
        </div>
      </div>

      {/* Important info */}
      {horse.category === "PRIVAT" && (
        <div className="rounded-2xl border border-bordeaux/25 bg-bordeaux/10 p-4 text-sm text-ink">
          <div className="font-semibold">Privatpferd</div>
          <div className="mt-1 text-ink/70">
            Dieses Pferd darf nicht von Kindern im Unterricht geritten werden.
          </div>
        </div>
      )}

      {/* Overview */}
      <section className="card p-5">
        <div className="text-sm font-semibold text-ink">Übersicht</div>
        <div className="mt-3 grid gap-4 md:grid-cols-3 text-sm">
          <div>
            <div className="text-ink/50">Kategorie</div>
            <div className="font-medium text-ink">{categoryLabel(horse.category)}</div>
          </div>
          <div>
            <div className="text-ink/50">Status</div>
            <div className="font-medium text-ink">{statusLabel(horse.status)}</div>
          </div>
          <div>
            <div className="text-ink/50">Plan-Kompatibilität</div>
            <div className="font-medium text-ink">{planCompatibility(horse.category)}</div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/pferde" className="btn-secondary">
          Zurück
        </Link>

        {/* plus tard: Editer via DB */}
        <button type="button" className="btn-primary" disabled>
          Bearbeiten (später)
        </button>
      </div>
    </div>
  );
}
