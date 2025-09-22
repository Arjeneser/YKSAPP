'use client';
import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';

export default function FocusPage() {
  const [mode, setMode] = useState<'POMODORO'|'FREE'>('POMODORO');
  const [subject, setSubject] = useState('Genel');
  const [running, setRunning] = useState(false);
  const [startAt, setStartAt] = useState<number|null>(null);
  const [elapsedMs, setElapsed] = useState(0);
  const t = useRef<number|null>(null);
  const POMO_MS = 25*60*1000;

  useEffect(()=>{
    if(!running) return;
    const s = startAt ?? Date.now(); if(startAt===null) setStartAt(s);
    t.current = window.setInterval(()=>setElapsed(Date.now()-s), 250);
    return ()=>{ if(t.current) window.clearInterval(t.current); };
  },[running]);

  function reset(){ if(t.current) window.clearInterval(t.current); setRunning(false); setStartAt(null); setElapsed(0); }
  async function saveAndReset(){
    const body = { mode, subject, topic:null, startedAt:new Date(startAt ?? Date.now()), endedAt:new Date(), minutes:Math.max(1, Math.round(elapsedMs/60000)) };
    await fetch('/api/study-sessions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    reset();
  }

  const displayMs = mode==='POMODORO' ? Math.max(0, POMO_MS-elapsedMs) : elapsedMs;
  const mm = String(Math.floor(displayMs/60000)).padStart(2,'0');
  const ss = String(Math.floor((displayMs%60000)/1000)).padStart(2,'0');

  return (
    <Card>
      <CardHeader title="Odak" desc="Pomodoro veya serbest modda çalışma kaydı tut." />
      <div style={{display:'flex', gap:8, marginBottom:16}}>
        <Button variant={mode==='POMODORO'?'primary':'ghost'} onClick={()=>setMode('POMODORO')}>Pomodoro</Button>
        <Button variant={mode==='FREE'?'primary':'ghost'} onClick={()=>setMode('FREE')}>Serbest</Button>
      </div>

      <div className="grid two">
        <div className="center">
          <div style={{position:'relative', width:220, height:220}}>
            <div style={{position:'absolute', inset:0, border:'1px solid var(--line)', borderRadius:'50%'}} />
            <div className="center timer" style={{position:'absolute', inset:0}}>{mm}:{ss}</div>
          </div>
        </div>
        <div>
          <Field label="Ders / Konu">
            <Input value={subject} onChange={e=>setSubject(e.target.value)} />
          </Field>
          <div style={{marginTop:12, display:'flex', gap:8}}>
            {!running ? (
              <Button onClick={()=>setRunning(true)}>Başlat</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={()=>setRunning(false)}>Duraklat</Button>
                <Button variant="ghost" onClick={()=>setRunning(true)}>Sürdür</Button>
                <Button onClick={saveAndReset}>Bitir & Kaydet</Button>
                <Button variant="ghost" onClick={reset}>Sıfırla</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
