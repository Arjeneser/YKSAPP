type Item = { value: string; label: string };
export default function Segmented({
  items, value, onChange, className=""
}: { items: Item[]; value: string; onChange: (v:string)=>void; className?: string }) {
  return (
    <div className={`grid grid-cols-${items.length} gap-3 ${className}`}>
      {items.map(it => {
        const active = it.value === value;
        return (
          <button key={it.value}
            onClick={()=>onChange(it.value)}
            className={`px-4 py-3 rounded-xl border transition shadow-sm
              ${active ? "bg-white text-black" : "bg-transparent border-white/20 text-zinc-200 hover:bg-white/10"}`}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
