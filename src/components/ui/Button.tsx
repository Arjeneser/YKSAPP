import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};
export default function Button({ variant="primary", className="", ...p }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60";
  const styles = variant === "primary"
    ? "bg-white text-black hover:bg-zinc-100"
    : "border border-white/20 text-zinc-200 hover:bg-white/10";
  return <button {...p} className={`${base} ${styles} ${className}`} />;
}
