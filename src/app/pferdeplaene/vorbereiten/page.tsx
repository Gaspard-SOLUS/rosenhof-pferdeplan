"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { SelectedHorse } from "@/components/HorsePicker";
import HorseRules from "@/components/HorseRules";
import HorsePicker from "@/components/HorsePicker";
import GroupBuilder from "@/components/GroupBuilder";

type PlanType = "NORMAL" | "FORTLER_BAHN";
function parsePlanType(v: string | null): PlanType {
  return v === "FORTLER_BAHN" ? "FORTLER_BAHN" : "NORMAL";
}

function planTypeLabel(t: string) {
  return t === "FORTLER_BAHN" ? "Fortler – Bahnstunden" : "Normaler Reitplan";
}

function formatDateDE(yyyyMmDd: string) {
  const d = new Date(`${yyyyMmDd}T00:00:00`);
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function VorbereitenPage() {
  const sp = useSearchParams();
  const date = sp.get("date") ?? "—";
  const type = parsePlanType(sp.get("type"));

  const [selectedHorses, setSelectedHorses] = useState<SelectedHorse[]>([]);

  const prettyDate = useMemo(() => (date !== "—" ? formatDateDE(date) : "—"), [date]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-ink">Pferdeplan vorbereiten</h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-ink/70">
          <span className="badge">
            Datum: <span className="ml-1 font-medium text-ink">{prettyDate}</span>
          </span>
          <span className="badge">
            Typ: <span className="ml-1 font-medium text-ink">{planTypeLabel(type)}</span>
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">
          <div className="text-sm font-semibold text-ink">1) Pferde auswählen</div>
          <p className="mt-1 text-sm text-ink/60">Liste der Pferde + Auswahl.</p>
        </div>

        <div className="card p-4">
          <div className="text-sm font-semibold text-ink">2) Gruppen / Spalten</div>
          <p className="mt-1 text-sm text-ink/60">Basis / MittelFort / Fortler Gruppen anlegen.</p>
        </div>

        <div className="card p-4">
          <div className="text-sm font-semibold text-ink">3) Regeln pro Pferd</div>
          <p className="mt-1 text-sm text-ink/60">Führpferd + erlaubte Niveaus.</p>
        </div>
      </div>

      <section className="card p-5">
        <HorsePicker planType={type} onChange={setSelectedHorses} />
      </section>

      <section className="card p-5">
        <GroupBuilder />
      </section>

      <section className="card p-5">
        <HorseRules selectedHorses={selectedHorses} />
      </section>

      <section className="card p-5">
        <div className="text-sm font-semibold text-ink">Status</div>

        <div className="mt-2 space-y-2 text-sm text-ink/60">
            <p>
            <span className="font-medium text-ink">Plan-Typ:</span>{" "}
            {type === "FORTLER_BAHN" ? "Fortler – Bahnstunden" : "Normaler Reitplan"}
            </p>

            <p>
            <span className="font-medium text-ink">Filter-Regel:</span>{" "}
            {type === "FORTLER_BAHN"
                ? "Nur Fortler-Bahn Pferde werden angezeigt."
                : "Nur normale Schulpferde werden angezeigt."}
            </p>

            <p>
            <span className="font-medium text-ink">Privatpferde:</span> Nicht auswählbar im Unterricht (werden nicht angezeigt).
            </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/pferdeplaene" className="btn-secondary">
            Zurück zur Liste
            </Link>
        </div>
      </section>
    </div>
  );
}
