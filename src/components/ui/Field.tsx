export function Field({ label, children }:{label:string; children:React.ReactNode}) {
  return (
    <label className="block">
      <span className="block text-sm text-zinc-400">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props}
      className={`w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-white/40 ${props.className || ""}`} />
  );
}
