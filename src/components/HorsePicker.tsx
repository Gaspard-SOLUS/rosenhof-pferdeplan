"use client";

import { useEffect, useMemo, useState } from "react";
import type { Horse, HorseCategory, HorseStatus } from "@/lib/types";
import { MOCK_HORSES } from "@/lib/mock";

export type SelectedHorse = {
  horseId: string;
  isFuehrpferd: boolean;
};

export type PlanType = "NORMAL" | "FORTLER_BAHN";

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

function allowedCategory(planType: PlanType): HorseCategory {
  return planType === "FORTLER_BAHN" ? "FORTLER_BAHN" : "NORMAL";
}

export default function HorsePicker({
  planType,
  onChange,
}: {
  planType: PlanType;
  onChange?: (selected: SelectedHorse[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [fuehrpferd, setFuehrpferd] = useState<Record<string, boolean>>({});

  const horses = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cat = allowedCategory(planType);

    // IMPORTANT: PRIVAT jamais affichés dans le Pferdeplan
    let list = MOCK_HORSES.filter((h) => h.category === cat);

    if (q) list = list.filter((h) => h.name.toLowerCase().includes(q));

    return list;
  }, [query, planType]);

  const selectedList = useMemo<SelectedHorse[]>(() => {
    return Object.entries(selected)
      .filter(([, v]) => v)
      .map(([horseId]) => ({ horseId, isFuehrpferd: !!fuehrpferd[horseId] }));
  }, [selected, fuehrpferd]);

  useEffect(() => {
    onChange?.(selectedList);
  }, [onChange, selectedList]);

  const selectedCount = selectedList.length;

  function toggleSelect(h: Horse) {
    const wasSelected = !!selected[h.id];

    setSelected((prev) => ({ ...prev, [h.id]: !prev[h.id] }));

    // si on désélectionne, on enlève Führpferd
    if (wasSelected) {
      setFuehrpferd((prev) => {
        const next = { ...prev };
        delete next[h.id];
        return next;
      });
    }
  }

  function toggleFuehrpferd(id: string) {
    if (!selected[id]) return;
    setFuehrpferd((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-ink">Pferde auswählen</div>
          <div className="text-sm text-ink/60">
            Typ: <span className="font-medium text-ink">{categoryLabel(allowedCategory(planType))}</span> ·{" "}
            Ausgewählt: <span className="font-medium text-ink">{selectedCount}</span>
          </div>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche (z.B. Bella)…"
          className="input w-64"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-sand text-left text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">Auswahl</th>
              <th className="px-4 py-3 font-medium">Pferd</th>
              <th className="px-4 py-3 font-medium">Kategorie</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Führpferd</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {horses.map((h) => {
              const isSelected = !!selected[h.id];
              const isFuehr = !!fuehrpferd[h.id];

              // PRIVAT est déjà filtré (pas affiché ici)
              const disabled = h.status !== "VERFUEGBAR";

              return (
                <tr
                  key={h.id}
                  className={[
                    disabled ? "opacity-60" : "hover:bg-sand/60",
                    "transition",
                  ].join(" ")}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(h)}
                      disabled={disabled}
                      className="accent-bordeaux"
                    />
                  </td>

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

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleFuehrpferd(h.id)}
                      disabled={!isSelected}
                      className={[
                        "btn-secondary text-xs",
                        "px-3 py-2",
                        isSelected ? "text-ink" : "text-ink/40 bg-sand",
                        isFuehr ? "ring-1 ring-bordeaux/40" : "",
                      ].join(" ")}
                    >
                      {isFuehr ? "Führpferd ✓" : "Als Führpferd"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {horses.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-ink/60" colSpan={5}>
                  Keine passenden Pferde gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink/50">
        Hinweis: Privatpferde sind im Pferdeplan nicht auswählbar und werden hier nicht angezeigt.
      </p>
    </div>
  );
}
