import type { Horse } from "./types";

export const MOCK_HORSES: Horse[] = [
  { id: "h1", name: "Pferd1", status: "VERFUEGBAR", category: "NORMAL", lastRiddenAt: "2026-01-11", lastPastureAt: "2026-01-10" },
  { id: "h2", name: "Pferd2", status: "VERFUEGBAR", category: "NORMAL", lastRiddenAt: "2026-01-09", lastPastureAt: "2026-01-11" },
  { id: "h3", name: "Pferd3", status: "KRANK", category: "NORMAL", medicalNote: "Husten – bitte schonen.", lastRiddenAt: "2026-01-07", lastPastureAt: "2026-01-08" },
  { id: "h4", name: "Pferd4", status: "VERFUEGBAR", category: "NORMAL", lastRiddenAt: "2026-01-10", lastPastureAt: "2026-01-10" },

  { id: "h5", name: "Pferd5", status: "VERFUEGBAR", category: "FORTLER_BAHN", lastRiddenAt: "2026-01-11", lastPastureAt: "2026-01-09" },
  { id: "h6", name: "Pferd6", status: "NICHT_VERFUEGBAR", category: "FORTLER_BAHN", medicalNote: "Sattelkontrolle / Pause.", lastRiddenAt: "2026-01-06", lastPastureAt: "2026-01-06" },
  { id: "h7", name: "Pferd7", status: "VERFUEGBAR", category: "FORTLER_BAHN", lastRiddenAt: "2026-01-10", lastPastureAt: "2026-01-11" },

  { id: "h8", name: "Pferd8", status: "VERFUEGBAR", category: "PRIVAT", medicalNote: "Privatpferd – nicht im Unterricht." },
  { id: "h9", name: "Pferd9", status: "VERFUEGBAR", category: "PRIVAT", medicalNote: "Privatpferd – nicht im Unterricht." },
  { id: "h10", name: "Pferd10", status: "NICHT_VERFUEGBAR", category: "PRIVAT", medicalNote: "Privatpferd – Pause." },

  { id: "h11", name: "Pferd11", status: "VERFUEGBAR", category: "NORMAL", lastRiddenAt: "2026-01-08", lastPastureAt: "2026-01-11" },
  { id: "h12", name: "Pferd12", status: "VERFUEGBAR", category: "FORTLER_BAHN", lastRiddenAt: "2026-01-09", lastPastureAt: "2026-01-10" },
];

export function getHorseById(id: string) {
  return MOCK_HORSES.find((h) => h.id === id) ?? null;
}
