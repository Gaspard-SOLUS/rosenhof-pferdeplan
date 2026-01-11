"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Startseite", href: "/" },
  { label: "Pferdepläne", href: "/pferdeplaene" },
  { label: "Pferde", href: "/pferde" },
  { label: "Kinder", href: "/kinder" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-white p-4">
      <div className="mb-6">
        <div className="text-lg font-bold">Rosenhof</div>
        <div className="text-sm text-gray-500">Pferdeplan</div>
      </div>

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
            className={[
                "block rounded-lg px-3 py-2 text-sm transition",
                isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
            ].join(" ")}
            >
            {item.label}
            </Link>
        );
        })}
      </nav>

      <div className="mt-8 border-t pt-4 text-xs text-gray-500">
        <div>Status: Demo</div>
        <div className="mt-1">v0.1</div>
      </div>
    </aside>
  );
}
