import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Rosenhof — Pferdeplan",
  description: "Pferdeplan & Zuweisungen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-gray-50 text-gray-900">
        <div className="flex">
          <Sidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-white">
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="text-sm text-gray-500">Rosenhof Reiterferien</div>
                  <div className="text-lg font-semibold">Pferdeplan</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">Moderator</div>
                  <button className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-100">
                    Abmelden
                  </button>
                </div>
              </div>
            </header>

            {/* Main */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
