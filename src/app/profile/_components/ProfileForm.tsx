'use client';
import { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import Segmented from '@/components/ui/Segmented';
import Button from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';

type Track = 'SAY'|'EA'|'SOZ'|'DIL';
type Profile = { track: Track; examYear: number; weeklyMinutesTarget: number };

const ITEMS = [
  { value:'SAY', label:'SAY' },
  { value:'EA',  label:'EA'  },
  { value:'SOZ', label:'SÖZ' },
  { value:'DIL', label:'DİL' },
];

export default function ProfileForm({ initial }: { initial: Profile }) {
  const [form, setForm] = useState<Profile>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setSaving(true); setMsg(null);
    const res = await fetch('/api/profile', {
      method:'PUT', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form),
    });
    setMsg(res.ok ? 'Kaydedildi ✅' : 'Kaydedilemedi'); setSaving(false);
  }

  return (
    <Card>
      <CardHeader title="Profil / Puan Türü" />
      <div>
        <span className="muted">Puan Türü (Track)</span>
        <Segmented items={ITEMS} value={form.track} onChange={v=>setForm({...form, track:v as Track})} className="" />
      </div>

      <div className="grid two" style={{marginTop:16}}>
        <Field label="Sınav Yılı">
          <Input type="number" value={form.examYear}
                 onChange={e=>setForm({...form, examYear:Number(e.target.value||0)})}/>
        </Field>
        <Field label="Haftalık Hedef (dk)">
          <Input type="number" step={30} min={0} value={form.weeklyMinutesTarget}
                 onChange={e=>setForm({...form, weeklyMinutesTarget:Number(e.target.value||0)})}/>
        </Field>
      </div>

      <div style={{marginTop:16, display:'flex', gap:12, alignItems:'center'}}>
        <Button onClick={save} disabled={saving}>{saving?'Kaydediliyor…':'Kaydet'}</Button>
        {msg && <span className="muted">{msg}</span>}
      </div>
    </Card>
  );
}
