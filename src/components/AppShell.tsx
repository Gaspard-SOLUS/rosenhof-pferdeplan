"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

const KEY = "sidebar_collapsed";
const EVENT_NAME = "sidebar-collapsed";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onChange = () => callback();

  // Si tu changes le localStorage dans un autre onglet
  window.addEventListener("storage", onChange);
  // Si tu changes dans le même onglet (on déclenche un event custom)
  window.addEventListener(EVENT_NAME, onChange as EventListener);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT_NAME, onChange as EventListener);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const collapsed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setCollapsed(next: boolean) {
    window.localStorage.setItem(KEY, next ? "1" : "0");
    window.dispatchEvent(new Event(EVENT_NAME)); // update même onglet
  }

  return (
    <div className="min-h-screen bg-sand text-ink">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div
        className={[
          "transition-[padding] duration-200",
          collapsed ? "pl-20" : "pl-72",
        ].join(" ")}
      >
        <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
          <div className="h-1 w-full bg-bordeaux/90" />
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <div className="text-sm text-ink/60">Rosenhof Reiterferien</div>
              <div className="text-lg font-semibold tracking-tight text-ink">Reitplan</div>
              <div className="mt-1">
                <Breadcrumbs />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-ink/70">Moderator</div>
              <button className="rounded-xl border border-line bg-paper px-3 py-2 text-sm hover:bg-sand">
                Abmelden
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
