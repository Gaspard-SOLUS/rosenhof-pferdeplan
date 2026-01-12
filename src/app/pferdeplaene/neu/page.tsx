import PlanCreateForm from "@/components/PlanCreateForm";

export default function NeuerPlanPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Neuer Pferdeplan</h1>
        <p className="mt-1 text-sm text-gray-600">
          Datum und Zeitslot auswählen, dann weiter zur Vorbereitung.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <PlanCreateForm />
      </div>
    </div>
  );
}
