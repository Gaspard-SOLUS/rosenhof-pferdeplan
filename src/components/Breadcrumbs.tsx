"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  pferdeplaene: "Pferdepläne",
  pferde: "Pferde",
  kinder: "Kinder",
  vorbereiten: "Vorbereiten",
  neu: "Neu",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <div className="text-xs text-ink/60">
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1">/</span>}
          <span className="text-ink/70">{LABELS[p] ?? p}</span>
        </span>
      ))}
    </div>
  );
}
