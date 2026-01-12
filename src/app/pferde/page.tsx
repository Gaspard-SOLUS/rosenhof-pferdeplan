"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Horse, HorseCategory, HorseStatus } from "@/lib/types";
import { MOCK_HORSES, getHorseById } from "@/lib/mock";

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

function formatDateDE(yyyyMmDd?: string) {
  if (!yyyyMmDd) return "—";
  const d = new Date(`${yyyyMmDd}T00:00:00`);
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/* --- strict filters --- */
type StatusFilter = "" | HorseStatus;
type CategoryFilter = "" | HorseCategory;

function parseStatus(v: string): StatusFilter {
  if (v === "VERFUEGBAR" || v === "KRANK" || v === "NICHT_VERFUEGBAR") return v;
  return "";
}
function parseCategory(v: string): CategoryFilter {
  if (v === "NORMAL" || v === "FORTLER_BAHN" || v === "PRIVAT") return v;
  return "";
}

/* --- Icons + chip --- */
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 21l-4.35-4.35" />
      <circle cx="11" cy="11" r="7" />
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

function HorseModal({
  horse,
  onClose,
}: {
  horse: Horse;
  onClose: () => void;
}) {
  // ESC pour fermer (pro)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
      onMouseDown={onClose} // clic dehors
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-line bg-paper shadow-soft"
        onMouseDown={(e) => e.stopPropagation()} // empêche fermeture quand on clique dans la fenêtre
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <div className="text-2xl font-semibold text-ink">{horse.name}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
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

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-line bg-paper p-2 text-ink/60 hover:bg-sand hover:text-ink"
            aria-label="Schließen"
            title="Schließen"
          >
            <IconX />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {horse.category === "PRIVAT" && (
            <div className="rounded-2xl border border-bordeaux/25 bg-bordeaux/10 p-4 text-sm text-ink">
              <div className="font-semibold">Privatpferd</div>
              <div className="mt-1 text-ink/70">
                Dieses Pferd darf nicht von Kindern im Unterricht geritten werden.
              </div>
            </div>
          )}

          <section className="card p-4">
            <div className="text-sm font-semibold text-ink">Aktivität</div>
            <div className="mt-3 grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <div className="text-ink/50">Zuletzt geritten</div>
                <div className="font-medium text-ink">{formatDateDE(horse.lastRiddenAt)}</div>
              </div>
              <div>
                <div className="text-ink/50">Zuletzt auf der Weide</div>
                <div className="font-medium text-ink">{formatDateDE(horse.lastPastureAt)}</div>
              </div>
            </div>
          </section>

          <section className="card p-4">
            <div className="text-sm font-semibold text-ink">Gesundheit / Notizen</div>
            <div className="mt-2 rounded-2xl border border-line bg-paper p-4 text-sm text-ink/70">
              {horse.medicalNote?.trim() ? horse.medicalNote : "Keine Notizen vorhanden."}
            </div>
          </section>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="btn-secondary">
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PferdePage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("");

  const [openId, setOpenId] = useState<string | null>(null);
  const openHorse = useMemo(() => (openId ? getHorseById(openId) : null), [openId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MOCK_HORSES.filter((h) => {
      if (filterCategory && h.category !== filterCategory) return false;
      if (filterStatus && h.status !== filterStatus) return false;

      if (q) {
        const hay = [h.id, h.name, categoryLabel(h.category), statusLabel(h.status)]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, filterCategory, filterStatus]);

  const hasFilters = Boolean(search || filterCategory || filterStatus);

  function reset() {
    setSearch("");
    setFilterCategory("");
    setFilterStatus("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-ink">Pferde</h1>
        <p className="mt-1 text-sm text-ink/60">
          Übersicht aller Pferde (Normal, Fortler-Bahn, Privat) inkl. Status.
        </p>
      </div>

      <section className="card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-ink">Filter</div>
          {hasFilters && (
            <button type="button" onClick={reset} className="btn-secondary">
              Alles zurücksetzen
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-ink">Suche</label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45">
                <IconSearch />
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="z.B. Pferd3, privat, krank…"
                className="input pl-9"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">Kategorie</label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45">
                <IconLayers />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(parseCategory(e.target.value))}
                className="input pl-9"
              >
                <option value="">Alle</option>
                <option value="NORMAL">Normal</option>
                <option value="FORTLER_BAHN">Fortler – Bahn</option>
                <option value="PRIVAT">Privat</option>
              </select>
            </div>
          </div>

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
                <option value="VERFUEGBAR">Verfügbar</option>
                <option value="KRANK">Krank</option>
                <option value="NICHT_VERFUEGBAR">Nicht verfügbar</option>
              </select>
            </div>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {search && <Chip icon={<IconSearch />} text={`Suche: ${search}`} onRemove={() => setSearch("")} />}
            {filterCategory && (
              <Chip
                icon={<IconLayers />}
                text={`Kategorie: ${categoryLabel(filterCategory)}`}
                onRemove={() => setFilterCategory("")}
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
              Anzeigen: <span className="font-medium text-ink">{filtered.length}</span> von{" "}
              <span className="font-medium text-ink">{MOCK_HORSES.length}</span>
            </span>
          </div>
        )}
      </section>

      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-sand text-left text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Kategorie</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Zuletzt geritten</th>
              <th className="px-4 py-3 font-medium text-right">Aktion</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {filtered.map((h) => (
              <tr key={h.id} className="hover:bg-sand/60 transition">
                <td className="px-4 py-3 font-medium text-ink">{h.name}</td>

                <td className="px-4 py-3">
                  <span className={["badge border", categoryClass(h.category)].join(" ")}>
                    {categoryLabel(h.category)}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className={["badge border", statusClass(h.status)].join(" ")}>
                    {statusLabel(h.status)}
                  </span>
                </td>

                <td className="px-4 py-3 text-ink/80">{formatDateDE(h.lastRiddenAt)}</td>

                <td className="px-4 py-3 text-right">
                  <button type="button" className="btn-secondary" onClick={() => setOpenId(h.id)}>
                    Details
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-ink/60" colSpan={5}>
                  Keine Pferde gefunden. Passe die Filter an oder setze sie zurück.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-ink/50">
        Hinweis: Demo-Daten. Später kommen Pferde/Status/Kategorien aus der Datenbank.
      </div>

      {openHorse && <HorseModal horse={openHorse} onClose={() => setOpenId(null)} />}
    </div>
  );
}
