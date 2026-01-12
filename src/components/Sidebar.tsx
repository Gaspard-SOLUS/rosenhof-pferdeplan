"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavItem = { label: string; href: string; icon: React.ReactNode };

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2v3M16 2v3" />
      <path d="M3 7h18" />
      <path d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
function IconHorse() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 20c0-4 2-6 6-6s6 2 6 6" />
      <path d="M5 14c2-6 5-9 10-10l2 3-2 2" />
      <path d="M9 9l-2 2" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  { label: "Startseite", href: "/", icon: <IconHome /> },
  { label: "Pferdepläne", href: "/pferdeplaene", icon: <IconCalendar /> },
  { label: "Pferde", href: "/pferde", icon: <IconHorse /> },
  { label: "Kinder", href: "/kinder", icon: <IconUsers /> },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-30 h-screen border-r border-line bg-paper",
        "transition-[width] duration-200",
        collapsed ? "w-20 px-3 py-6" : "w-72 px-5 py-6",
        "flex flex-col",
      ].join(" ")}
    >
      {/* Brand + toggle */}
    <div className="mb-6 flex items-center justify-between">
    <a
        href="https://www.rosenhof-reiterferien.de"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 overflow-hidden rounded-xl p-2 hover:bg-sand focus:outline-none focus:ring-2 focus:ring-bordeaux/30"
    >
        <Image
        src="/Logo_Rosenhof.jpg"
        alt="Rosenhof"
        width={60}
        height={60}
        className="rounded"
        />
        {!collapsed && (
        <div>
            <div className="text-lg font-semibold tracking-tight text-ink">Rosenhof</div>
            <div className="text-sm text-ink/60">Reitplan</div>
        </div>
        )}
    </a>

    <button
        onClick={onToggle}
        className="rounded-xl border border-line bg-paper p-2 text-ink/70 hover:bg-sand"
        aria-label={collapsed ? "Menü öffnen" : "Menü schließen"}
        title={collapsed ? "Menü öffnen" : "Menü schließen"}
    >
        <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        >
        {collapsed ? <path d="m9 6 6 6-6 6" /> : <path d="m15 6-6 6 6 6" />}
        </svg>
    </button>
    </div>

      <div className="mb-4 h-px w-full bg-line" />

      {/* Nav */}
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={[
                "flex items-center rounded-xl py-2 text-sm transition hover:bg-sand",
                collapsed ? "justify-center px-0" : "justify-between px-3",
                isActive ? "bg-sand text-bark font-medium ring-1 ring-line" : "text-ink/80",
              ].join(" ")}
            >
              <span className={["flex items-center gap-3", collapsed ? "" : ""].join(" ")}>
                <span className="text-ink/80">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </span>

              {!collapsed && isActive && <span className="h-2 w-2 rounded-full bg-bordeaux" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer discret */}
      {!collapsed && (
        <div className="mt-auto pt-5 text-[11px] text-ink/45">
          <div className="h-px w-full bg-line" />
          <div className="mt-3">Demo · v0.1</div>
        </div>
      )}
    </aside>
  );
}
