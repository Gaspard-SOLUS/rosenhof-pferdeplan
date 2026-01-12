"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

type PlanStatus = "ENTWURF" | "BEREIT" | "VEROEFFENTLICHT";
type PlanType = "NORMAL" | "FORTLER_BAHN";

type Plan = {
  id: string;
  date: string;
  planType: PlanType;
  status: PlanStatus;
};

const MOCK_PLANS: Plan[] = [
  { id: "1", date: "2026-01-11", planType: "NORMAL", status: "ENTWURF" },
  { id: "2", date: "2026-01-11", planType: "FORTLER_BAHN", status: "BEREIT" },
  { id: "3", date: "2026-01-10", planType: "NORMAL", status: "VEROEFFENTLICHT" },
];

function statusLabel(status: PlanStatus) {
  if (status === "ENTWURF") return "Entwurf";
  if (status === "BEREIT") return "Bereit zur Zuweisung";
  return "Veröffentlicht";
}

function statusClass(status: PlanStatus) {
  if (status === "ENTWURF") return "bg-sand text-ink/70 border-line";
  if (status === "BEREIT") return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-emerald-100 text-emerald-900 border-emerald-200";
}

function planTypeLabel(t: PlanType) {
  return t === "FORTLER_BAHN" ? "Fortler – Bahnstunden" : "Normaler Reitplan";
}

function planTypeClass(t: PlanType) {
  // juste une touche visuelle, cohérente avec le reste
  return t === "FORTLER_BAHN"
    ? "bg-violet-100 text-violet-900 border-violet-200"
    : "bg-sky-100 text-sky-900 border-sky-200";
}

function formatDateDE(yyyyMmDd: string) {
  // "2026-01-11" -> "11. Januar 2026"
  const d = new Date(`${yyyyMmDd}T00:00:00`);
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/* --- strict parsers (no any) --- */
type StatusFilter = "" | PlanStatus;
type TypeFilter = "" | PlanType;

function parseStatus(v: string): StatusFilter {
  if (v === "ENTWURF" || v === "BEREIT" || v === "VEROEFFENTLICHT") return v;
  return "";
}

function parseType(v: string): TypeFilter {
  if (v === "NORMAL" || v === "FORTLER_BAHN") return v;
  return "";
}

/* --- Small icons --- */
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 21l-4.35-4.35" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2v3M16 2v3" />
      <path d="M3 7h18" />
      <path d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
function IconTag() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 12l-8 8-10-10V2h8l10 10Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 3 7l9 5 9-5-9-5Z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function Chip({
  icon,
  text,
  onRemove,
}: {
  icon?: ReactNode;
  text: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand px-2.5 py-1 text-xs text-ink/80">
      <span className="inline-flex items-center gap-1">
        {icon}
        <span>{text}</span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 text-ink/60 hover:bg-paper hover:text-ink"
        aria-label={`Filter entfernen: ${text}`}
        title="Entfernen"
      >
        <IconX />
      </button>
    </span>
  );
}

export default function PferdeplaenePage() {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterType, setFilterType] = useState<TypeFilter>("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("");

  const filteredPlans = useMemo(() => {
    const q = search.trim().toLowerCase();

    return MOCK_PLANS.filter((p) => {
      if (filterDate && p.date !== filterDate) return false;
      if (filterType && p.planType !== filterType) return false;
      if (filterStatus && p.status !== filterStatus) return false;

      if (q) {
        const hay = [
          p.id,
          p.date,
          formatDateDE(p.date),
          planTypeLabel(p.planType),
          statusLabel(p.status),
        ]
          .join(" ")
          .toLowerCase();

        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [search, filterDate, filterType, filterStatus]);

  const hasFilters = Boolean(search || filterDate || filterType || filterStatus);

  function resetFilters() {
    setSearch("");
    setFilterDate("");
    setFilterType("");
    setFilterStatus("");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink">Pferdepläne</h1>
          <p className="mt-1 text-sm text-ink/60">Pläne erstellen, öffnen und exportieren.</p>
        </div>

        <Link href="/pferdeplaene/neu" className="btn-primary">
          Neuer Plan
        </Link>
      </div>

      {/* Filters */}
      <section className="card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-ink">Filter</div>

          {hasFilters && (
            <button type="button" onClick={resetFilters} className="btn-secondary">
              Alles zurücksetzen
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-ink">Suche</label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45">
                <IconSearch />
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="z.B. Januar, Fortler, bereit…"
                className="input pl-9"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-ink">Datum</label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45">
                <IconCalendar />
              </div>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="input pl-9"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-ink">Typ</label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45">
                <IconLayers />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(parseType(e.target.value))}
                className="input pl-9"
              >
                <option value="">Alle</option>
                <option value="NORMAL">Normaler Reitplan</option>
                <option value="FORTLER_BAHN">Fortler – Bahnstunden</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-ink">Status</label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45">
                <IconTag />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(parseStatus(e.target.value))}
                className="input pl-9"
              >
                <option value="">Alle</option>
                <option value="ENTWURF">Entwurf</option>
                <option value="BEREIT">Bereit zur Zuweisung</option>
                <option value="VEROEFFENTLICHT">Veröffentlicht</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active chips */}
        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {search && <Chip icon={<IconSearch />} text={`Suche: ${search}`} onRemove={() => setSearch("")} />}

            {filterDate && (
              <Chip
                icon={<IconCalendar />}
                text={`Datum: ${formatDateDE(filterDate)}`}
                onRemove={() => setFilterDate("")}
              />
            )}

            {filterType && (
              <Chip
                icon={<IconLayers />}
                text={`Typ: ${planTypeLabel(filterType)}`}
                onRemove={() => setFilterType("")}
              />
            )}

            {filterStatus && (
              <Chip
                icon={<IconTag />}
                text={`Status: ${statusLabel(filterStatus)}`}
                onRemove={() => setFilterStatus("")}
              />
            )}

            <span className="ml-auto text-xs text-ink/50">
              Anzeigen: <span className="font-medium text-ink">{filteredPlans.length}</span> von{" "}
              <span className="font-medium text-ink">{MOCK_PLANS.length}</span>
            </span>
          </div>
        )}
      </section>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-sand text-left text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">Datum</th>
              <th className="px-4 py-3 font-medium">Typ</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-sand/60 transition">
                <td className="px-4 py-3 font-medium text-ink">{formatDateDE(plan.date)}</td>

                <td className="px-4 py-3">
                  <span className={["badge border", planTypeClass(plan.planType)].join(" ")}>
                    {planTypeLabel(plan.planType)}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className={["badge border", statusClass(plan.status)].join(" ")}>
                    {statusLabel(plan.status)}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/pferdeplaene/vorbereiten?date=${encodeURIComponent(plan.date)}&type=${plan.planType}`}
                    className="btn-secondary"
                  >
                    Öffnen
                  </Link>
                </td>
              </tr>
            ))}

            {filteredPlans.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-ink/60" colSpan={4}>
                  Keine Pläne gefunden. Passe die Filter an oder setze sie zurück.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-ink/50">
        Hinweis: Aktuell sind dies Demo-Daten. Später kommen die Pläne aus der Datenbank.
      </div>
    </div>
  );
}
