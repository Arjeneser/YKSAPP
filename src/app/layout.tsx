// src/app/layout.tsx
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-dvh bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/30">
          <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center gap-4">
            <Link href="/" className="font-semibold tracking-tight">YKS App</Link>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/profile" className="hover:underline underline-offset-4">Profil</Link>
              <Link href="/focus" className="hover:underline underline-offset-4">Odak</Link>
            </div>
            <div className="ml-auto text-xs text-zinc-400">dev</div>
          </nav>
        </header>

        {/* Page container */}
        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
