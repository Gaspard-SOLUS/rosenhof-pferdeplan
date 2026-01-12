export type HorseStatus = "VERFUEGBAR" | "KRANK" | "NICHT_VERFUEGBAR";
export type HorseCategory = "NORMAL" | "FORTLER_BAHN" | "PRIVAT";

export type Horse = {
  id: string;
  name: string;
  status: HorseStatus;
  category: HorseCategory;

  // V1 champs suivi
  lastRiddenAt?: string;   // YYYY-MM-DD
  lastPastureAt?: string;  // YYYY-MM-DD
  medicalNote?: string;    // texte libre
};
