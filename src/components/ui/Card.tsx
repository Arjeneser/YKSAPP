import type { ReactNode } from "react";
export function Card({ children, className="" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg backdrop-blur ${className}`}>{children}</div>;
}
export function CardHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {desc && <p className="mt-1 text-sm text-zinc-400">{desc}</p>}
    </div>
  );
}
