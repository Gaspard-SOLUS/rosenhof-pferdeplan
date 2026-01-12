"use client";

import { useMemo, useState } from "react";

type Level = "BASIS" | "MITTELFORT" | "FORTLER";

type Group = {
  id: string;
  name: string;
  level: Level;
};

function levelLabel(l: Level) {
  if (l === "BASIS") return "Basis";
  if (l === "MITTELFORT") return "MittelFort";
  return "Fortler";
}

function levelBadgeClass(l: Level) {
  if (l === "BASIS") return "bg-sky-100 text-sky-900 border-sky-200";
  if (l === "MITTELFORT") return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-violet-100 text-violet-900 border-violet-200";
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function GroupBuilder() {
  const [level, setLevel] = useState<Level>("BASIS");
  const [name, setName] = useState("");
  const [groups, setGroups] = useState<Group[]>([
    { id: "g1", name: "Basis Gruppe 1", level: "BASIS" },
    { id: "g2", name: "MittelFort Gruppe 1", level: "MITTELFORT" },
    { id: "g3", name: "Fortler Gruppe 1", level: "FORTLER" },
  ]);

  const groupedCounts = useMemo(() => {
    const c = { BASIS: 0, MITTELFORT: 0, FORTLER: 0 };
    for (const g of groups) c[g.level]++;
    return c;
  }, [groups]);

  const hasDuplicate = useMemo(() => {
    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return false;
    return groups.some((g) => g.name.toLowerCase() === trimmed);
  }, [name, groups]);

  function addGroup() {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (hasDuplicate) return;

    setGroups((prev) => [...prev, { id: uid(), name: trimmed, level }]);
    setName("");
  }

  function removeGroup(id: string) {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-ink">Gruppen / Spalten</div>
          <div className="text-sm text-ink/60">
            Basis: <span className="font-medium text-ink">{groupedCounts.BASIS}</span> ·{" "}
            MittelFort:{" "}
            <span className="font-medium text-ink">{groupedCounts.MITTELFORT}</span> ·{" "}
            Fortler: <span className="font-medium text-ink">{groupedCounts.FORTLER}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-ink">Gruppenname</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='z.B. "Basis Gruppe 2"'
            className="input mt-2"
          />

          <div className="mt-1 text-xs text-ink/50">
            Tipp: Ein klarer Name wird später zur Spalte im Plan.
          </div>

          {hasDuplicate && (
            <div className="mt-2 rounded-xl border border-bordeaux/25 bg-bordeaux/10 px-3 py-2 text-xs text-ink">
              Eine Gruppe mit diesem Namen existiert bereits.
            </div>
          )}
        </div>

        <div className="w-full md:w-56">
          <label className="block text-sm font-medium text-ink">Niveau</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="input mt-2"
          >
            <option value="BASIS">Basis</option>
            <option value="MITTELFORT">MittelFort</option>
            <option value="FORTLER">Fortler</option>
          </select>
        </div>

        <button type="button" onClick={addGroup} className="btn-primary">
          Hinzufügen
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-sand text-left text-ink/60">
            <tr>
              <th className="px-4 py-3 font-medium">Gruppe</th>
              <th className="px-4 py-3 font-medium">Niveau</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {groups.map((g) => (
              <tr key={g.id} className="hover:bg-sand/60 transition">
                <td className="px-4 py-3 font-medium text-ink">{g.name}</td>

                <td className="px-4 py-3">
                  <span className={["badge border", levelBadgeClass(g.level)].join(" ")}>
                    {levelLabel(g.level)}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => removeGroup(g.id)}
                    className="btn-secondary"
                  >
                    Entfernen
                  </button>
                </td>
              </tr>
            ))}

            {groups.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-ink/60" colSpan={3}>
                  Noch keine Gruppen. Füge eine Gruppe hinzu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
