"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type PlanType = "NORMAL" | "FORTLER_BAHN";

function planTypeLabel(t: PlanType) {
  if (t === "FORTLER_BAHN") return "Fortler – Bahnstunden";
  return "Normaler Reitplan";
}

function formatDateDE(yyyyMmDd: string) {
  const d = new Date(`${yyyyMmDd}T00:00:00`);
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function PlanCreateForm() {
  const router = useRouter();

  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [planType, setPlanType] = useState<PlanType>("NORMAL");
  const [error, setError] = useState<string | null>(null);

  const prettyDate = useMemo(() => (date ? formatDateDE(date) : "—"), [date]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!date) {
      setError("Bitte Datum auswählen.");
      return;
    }

    router.push(
      `/pferdeplaene/vorbereiten?date=${encodeURIComponent(date)}&type=${planType}`
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Datum</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input mt-2"
        />
        <div className="mt-2 text-xs text-ink/50">
          Anzeige: <span className="font-medium text-ink">{prettyDate}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Reitplan-Typ</label>
        <select
          value={planType}
          onChange={(e) => setPlanType(e.target.value as PlanType)}
          className="input mt-2"
        >
          <option value="NORMAL">Normaler Reitplan</option>
          <option value="FORTLER_BAHN">Fortler – Bahnstunden</option>
        </select>

        <div className="mt-2 text-xs text-ink/50">
          Ausgewählt: <span className="font-medium text-ink">{planTypeLabel(planType)}</span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-bordeaux/25 bg-bordeaux/10 px-3 py-2 text-sm text-ink">
          <span className="font-medium">Hinweis:</span> {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary">
          Weiter
        </button>

        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Abbrechen
        </button>
      </div>
    </form>
  );
}
