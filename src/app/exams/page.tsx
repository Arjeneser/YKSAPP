'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';

type Type = 'TYT'|'AYT'; type Nets = Record<string, number>;
const TYT=[{key:'turkce',label:'Türkçe'},{key:'sosyal',label:'Sosyal'},{key:'matematik',label:'Matematik'},{key:'fen',label:'Fen'}] as const;
const AYT=[{key:'mat',label:'Mat'},{key:'fizik',label:'Fizik'},{key:'kimya',label:'Kimya'},{key:'biyoloji',label:'Biyoloji'},{key:'edebiyat',label:'Edebiyat'},{key:'tarih',label:'Tarih'},{key:'cografya',label:'Coğrafya'},{key:'dil',label:'Dil'}] as const;

export default function ExamsPage(){
  const [type,setType]=useState<Type>('TYT'); const [name,setName]=useState('');
  const [nets,setNets]=useState<Nets>({}); const [list,setList]=useState<any[]>([]);
  const F=type==='TYT'?TYT:AYT;
  useEffect(()=>{refresh()},[]);
  async function refresh(){const r=await fetch('/api/exams'); setList(await r.json());}
  function setNet(k:string,v:string){ setNets(p=>({...p,[k]:Number(v||0)})); }
  async function save(){ const ok=(await fetch('/api/exams',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,name,nets})})).ok; if(ok){setName('');setNets({});refresh();}}

  return (
    <div className="grid two">
      <Card>
        <CardHeader title="Deneme Logu" desc="TYT/AYT netlerini kaydet." />
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <Button variant={type==='TYT'?'primary':'ghost'} onClick={()=>setType('TYT')}>TYT</Button>
          <Button variant={type==='AYT'?'primary':'ghost'} onClick={()=>setType('AYT')}>AYT</Button>
        </div>
        <Field label="Deneme Adı (opsiyonel)"><Input value={name} onChange={e=>setName(e.target.value)} /></Field>
        <div className="grid two" style={{marginTop:12}}>
          {F.map(f=>(
            <Field key={f.key} label={`${f.label} Net`}>
              <Input type="number" step="0.5" min="0" value={nets[f.key]??''} onChange={e=>setNet(f.key,e.target.value)} />
            </Field>
          ))}
        </div>
        <div style={{marginTop:12}}><Button onClick={save}>Kaydet</Button></div>
      </Card>

      <Card>
        <CardHeader title="Son Kayıtlar" />
        <div style={{display:'grid', gap:12}}>
          {list.map(it=>(
            <div key={it.id} className="card" style={{padding:12}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:600}}>{it.type}{it.name?` • ${it.name}`:''}</div>
                <div className="muted">{new Date(it.date).toLocaleDateString('tr-TR')}</div>
              </div>
              <div style={{marginTop:8}}>
                {Object.entries(it.nets||{}).map(([k,v])=>(<span key={k} style={{marginRight:12}}>{k}: <b>{v as any}</b></span>))}
              </div>
            </div>
          ))}
          {list.length===0 && <div className="muted">Henüz kayıt yok.</div>}
        </div>
      </Card>
    </div>
  );
}
