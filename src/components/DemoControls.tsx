import { Button } from '@/components/ui/button';
import { Compass, ClipboardList, RefreshCw, Heart, Building2, Sun, Moon, Utensils } from 'lucide-react';
import { tr, t, type Lang } from '@/lib/i18n';
import { CUSTOMER_PROFILES } from '@/lib/customer-profiles';

type Scenario = { id: string; name: string };
export function DemoControls({ lang, setLang, view, setView, focus, setFocus, profileId, onCustomer, scenarios, scenarioId, onScenario, phase, lunch, onTime, onPilot, onReset }: {
  lang: Lang; setLang: (l: Lang) => void; view: 'customer' | 'business'; setView: (v: 'customer' | 'business') => void;
  focus: boolean; setFocus: (f: boolean) => void; profileId: string; onCustomer: (id: string) => void;
  scenarios: Scenario[]; scenarioId: string; onScenario: (id: string) => void; phase: string; lunch: boolean;
  onTime: (time: 'morning' | 'lunch' | 'evening') => void; onPilot: () => void; onReset: () => void;
}) {
  return <aside aria-label={tr('Demo controls', lang)} className="presenter-controls space-y-6">
    <div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 font-bold text-primary"><Compass aria-hidden className="h-5 w-5" />IF Compass</span><div role="group" aria-label={tr('Language', lang)} className="flex gap-1">{(['fi','en'] as const).map(l => <Button key={l} size="sm" variant={lang === l ? 'default' : 'ghost'} aria-pressed={lang === l} onClick={() => setLang(l)} className="min-h-11 uppercase">{l}</Button>)}</div></div>
    <div role="group" aria-label={tr('Choose view', lang)} className="grid grid-cols-2 gap-1 border-b pb-5">{([['customer', Heart], ['business', Building2]] as const).map(([v, Icon]) => <Button key={v} variant={view === v ? 'default' : 'ghost'} aria-pressed={view === v} onClick={() => setView(v)} className="h-auto min-h-11 whitespace-normal text-xs"><Icon aria-hidden />{t(v, lang)}</Button>)}</div>
    {view === 'customer' && <>
      <div><p className="mb-2 text-xs font-semibold text-muted-foreground">{tr('Customer',lang)}</p><div role="group" aria-label={tr('Demo customer',lang)} className="grid grid-cols-3 gap-1">{CUSTOMER_PROFILES.map(p => <Button key={p.id} variant={profileId === p.id ? 'default' : 'outline'} aria-pressed={profileId === p.id} onClick={() => onCustomer(p.id)} className="px-1">{p.name}</Button>)}</div></div>
      <label className="block text-xs font-semibold text-muted-foreground">{t('scenario',lang)}<select value={scenarioId} onChange={e => onScenario(e.target.value)} className="mt-2 min-h-11 w-full rounded-md border bg-card px-3 text-sm text-foreground">{scenarios.map(s => <option key={s.id} value={s.id}>{tr(s.name,lang)}</option>)}</select></label>
      <div><p className="mb-2 text-xs font-semibold text-muted-foreground">{tr('Time of day',lang)}</p><div role="group" aria-label={tr('Time of day',lang)} className="grid grid-cols-3 gap-1">{([['morning','07:15',Sun],['lunch','12:00',Utensils],['evening','19:00',Moon]] as const).map(([time,label,Icon]) => <Button key={time} variant={(lunch ? time === 'lunch' : phase === time) ? 'default' : 'outline'} onClick={() => onTime(time)} aria-pressed={lunch ? time === 'lunch' : phase === time} className="h-auto min-h-14 flex-col gap-1 px-1 text-xs"><Icon aria-hidden className="h-4 w-4" />{label}</Button>)}</div></div>
      <Button variant="outline" className="w-full" aria-pressed={!focus} onClick={() => setFocus(!focus)}>{focus ? t('focusOn',lang) : t('focus',lang)}</Button>
    </>}
    <div className="space-y-2 border-t pt-5"><Button data-pilot-trigger variant="outline" onClick={onPilot} className="w-full justify-start"><ClipboardList aria-hidden />{lang === 'fi' ? 'Pilotti & konsepti' : 'Pilot & concept'}</Button><Button variant="ghost" onClick={onReset} className="w-full justify-start text-muted-foreground"><RefreshCw aria-hidden />{t('reset',lang)}</Button></div>
  </aside>;
}
