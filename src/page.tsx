// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">YKS App</h1>
        <p className="mt-2 text-zinc-400">Profilini ayarla, odaklan ve ilerlemeni takip et.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/profile" className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-100 transition">Profil</Link>
          <Link href="/focus" className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition">Odak</Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
        <h2 className="text-lg font-medium">Hızlı Notlar</h2>
        <ul className="mt-3 list-disc pl-5 text-zinc-400 space-y-1 text-sm">
          <li>Üst bardan sayfalar arasında hızlıca geçebilirsin.</li>
          <li>Seed endpoint’i sadece bir kez çalıştırman yeterli.</li>
          <li>Koyu temada yumuşak cam efektleri kullanıyoruz.</li>
        </ul>
      </div>
    </div>
  );
}
