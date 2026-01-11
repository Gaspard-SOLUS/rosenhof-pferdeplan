type PlanStatus = "ENTWURF" | "BEREIT" | "VEROEFFENTLICHT";

type Plan = {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: "AM" | "PM" | "DAY";
  status: PlanStatus;
};

const MOCK_PLANS: Plan[] = [
  { id: "1", date: "2026-01-11", timeSlot: "AM", status: "ENTWURF" },
  { id: "2", date: "2026-01-11", timeSlot: "PM", status: "BEREIT" },
  { id: "3", date: "2026-01-10", timeSlot: "DAY", status: "VEROEFFENTLICHT" },
];

function statusLabel(status: PlanStatus) {
  if (status === "ENTWURF") return "Entwurf";
  if (status === "BEREIT") return "Bereit zur Zuweisung";
  return "Veröffentlicht";
}

function statusClass(status: PlanStatus) {
  if (status === "ENTWURF") return "bg-gray-100 text-gray-800 border-gray-200";
  if (status === "BEREIT") return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-emerald-100 text-emerald-900 border-emerald-200";
}

function timeSlotLabel(slot: Plan["timeSlot"]) {
  if (slot === "AM") return "Vormittag";
  if (slot === "PM") return "Nachmittag";
  return "Ganzer Tag";
}

export default function PferdeplaenePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pferdepläne</h1>
          <p className="mt-1 text-sm text-gray-600">
            Pläne erstellen, öffnen und exportieren.
          </p>
        </div>

        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Neuer Plan
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Datum</th>
              <th className="px-4 py-3 font-medium">Zeitslot</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {MOCK_PLANS.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{plan.date}</td>
                <td className="px-4 py-3">{timeSlotLabel(plan.timeSlot)}</td>
                <td className="px-4 py-3">
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                      statusClass(plan.status),
                    ].join(" ")}
                  >
                    {statusLabel(plan.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-100">
                    Öffnen
                  </button>
                </td>
              </tr>
            ))}

            {MOCK_PLANS.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={4}>
                  Noch keine Pläne. Klicke auf “Neuer Plan”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
