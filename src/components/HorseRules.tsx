"use client";

import { useState } from "react";
import type { SelectedHorse } from "@/components/HorsePicker";

type Level = "BASIS" | "MITTELFORT" | "FORTLER";

type Rule = {
  horseId: string;
  allowedLevels: Record<Level, boolean>;
};

const DEFAULT_ALLOWED: Record<Level, boolean> = {
  BASIS: true,
  MITTELFORT: true,
  FORTLER: true,
};

function levelLabel(l: Level) {
  if (l === "BASIS") return "Basis";
  if (l === "MITTELFORT") return "MittelFort";
  return "Fortler";
}

export default function HorseRules({
  selectedHorses,
}: {
  selectedHorses: SelectedHorse[];
}) {
  const [rules, setRules] = useState<Record<string, Rule>>({});

  function getAllowed(horseId: string) {
    return rules[horseId]?.allowedLevels ?? DEFAULT_ALLOWED;
  }

  function toggleLevel(horseId: string, level: Level) {
    setRules((prev) => {
      const current = prev[horseId] ?? { horseId, allowedLevels: DEFAULT_ALLOWED };
      return {
        ...prev,
        [horseId]: {
          ...current,
          allowedLevels: {
            ...current.allowedLevels,
            [level]: !current.allowedLevels[level],
          },
        },
      };
    });
  }

  if (selectedHorses.length === 0) {
    return (
      <div className="text-sm text-ink/60">
        Wähle zuerst Pferde aus, um Regeln festzulegen.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-semibold text-ink">Regeln pro Pferd</div>
        <p className="mt-1 text-sm text-ink/60">
          Lege fest, welche Niveaus für jedes Pferd erlaubt sind.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-sand text-left text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">Pferd (ID)</th>
              <th className="px-4 py-3 font-medium">Basis</th>
              <th className="px-4 py-3 font-medium">MittelFort</th>
              <th className="px-4 py-3 font-medium">Fortler</th>
              <th className="px-4 py-3 font-medium">Führpferd</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {selectedHorses.map((s) => {
              const r = getAllowed(s.horseId);

              return (
                <tr key={s.horseId} className="hover:bg-sand/60 transition">
                  <td className="px-4 py-3 font-medium text-ink">{s.horseId}</td>

                  {(["BASIS", "MITTELFORT", "FORTLER"] as Level[]).map((lvl) => (
                    <td key={lvl} className="px-4 py-3">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!r[lvl]}
                          onChange={() => toggleLevel(s.horseId, lvl)}
                          className="accent-bordeaux"
                        />
                        <span className="text-sm text-ink/80">{levelLabel(lvl)}</span>
                      </label>
                    </td>
                  ))}

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "badge border",
                        s.isFuehrpferd
                          ? "bg-bark text-white border-bark"
                          : "bg-sand text-ink/60 border-line",
                      ].join(" ")}
                    >
                      {s.isFuehrpferd ? "Führpferd" : "—"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink/50">
        Hinweis: Aktuell wird die Pferd-ID angezeigt. Mit Datenbank zeigen wir den echten Namen.
      </p>
    </div>
  );
}
