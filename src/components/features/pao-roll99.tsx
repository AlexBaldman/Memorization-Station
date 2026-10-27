'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Dices, Eye, RotateCcw, Download, Upload, Brain, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import rawRoster from '@/lib/memory/pao-legacy.json';
import { normalizeRoster, type LegacyPaoEntry, type PaoBinding } from '@/lib/memory/roster';
import { rollPercentile } from '@/lib/memory/rollkit';
import { deriveSchedules, dueBindings, makeRecallEvent, type RecallGrade } from '@/lib/memory/review';
import { assertLedger, exportCsv, exportLedger, mergeLedger, readLedger, writeLedger, type PaoLedger } from '@/lib/memory/ledger';

const ROSTER = normalizeRoster(rawRoster as unknown as Record<string, LegacyPaoEntry>);
const EMPTY: PaoLedger = { version: 1, events: [] };
type Prompt = { binding: PaoBinding; rollId: string | null; startedAt: number };
type LastAnswer = { number: string; person: string; grade: RecallGrade };

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function gradeLabel(grade: RecallGrade): string {
  return grade === 1 ? 'Again' : grade === 3 ? 'Hard' : 'Good';
}

export function PaoRoll99() {
  const [ready, setReady] = useState(false);
  const [ledger, setLedger] = useState<PaoLedger>(EMPTY);
  const [blocked, setBlocked] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [last, setLast] = useState<LastAnswer | null>(null);
  const sessionId = useRef('');
  const grading = useRef(false);

  useEffect(() => {
    sessionId.current = crypto.randomUUID();
    try { setLedger(readLedger(window.localStorage)); }
    catch {
      setBlocked('Stored history could not be read safely. No data has been overwritten. Back up this browser\'s PAO localStorage entry before resetting it.');
    }
    setReady(true);
  }, []);

  const schedules = useMemo(() => deriveSchedules(ledger.events), [ledger.events]);
  const due = dueBindings(ROSTER, schedules, new Date());
  const tried = new Set(ledger.events.map(event => event.bindingId)).size;
  const good = ledger.events.filter(event => event.grade === 5).length;
  const latest = [...ledger.events].slice(-8).reverse();

  const begin = (binding: PaoBinding, rollId: string | null = null) => {
    grading.current = false;
    setPrompt({ binding, rollId, startedAt: Date.now() });
    setRevealed(false);
    setLast(null);
    setMessage(null);
  };

  const roll = () => {
    try {
      const result = rollPercentile();
      begin(ROSTER[result.value], result.id);
    } catch {
      setMessage('Secure dice are unavailable in this browser. Try a secure connection.');
    }
  };
  const practiceDue = () => {
    const available = dueBindings(ROSTER, schedules, new Date());
    if (!available.length) { setMessage('All 100 slots are scheduled for later. Use Roll 00–99 to keep practicing.'); return; }
    // Never-reviewed associations first, then earliest scheduled review.
    const [next] = [...available].sort((a, b) =>
      (schedules[a.id]?.dueDate ?? '').localeCompare(schedules[b.id]?.dueDate ?? '') ||
      a.number.localeCompare(b.number));
    begin(next);
  };

  const grade = (rating: RecallGrade) => {
    if (!prompt || !revealed || grading.current || blocked) return;
    grading.current = true;
    try {
      const event = makeRecallEvent({
        slotId: prompt.binding.number,
        bindingId: prompt.binding.id,
        sessionId: sessionId.current,
        rollId: prompt.rollId,
        grade: rating,
        startedAt: prompt.startedAt,
      });
      const next = assertLedger({ version: 1, events: [...ledger.events, event] });
      // Persist first: a full storage quota must never produce a false success state.
      writeLedger(window.localStorage, next);
      setLedger(next);
      setLast({ number: prompt.binding.number, person: prompt.binding.person, grade: rating });
      setPrompt(null);
      setRevealed(false);
      setMessage('Review saved. Your next due date was updated.');
    } catch {
      grading.current = false;
      setMessage('Could not save that review. Browser storage may be full; export your history.');
    }
  };

  const importHistory = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file || blocked) return;
    try {
      if (file.size > 12_000_000) throw new Error('File too large');
      const incoming = assertLedger(JSON.parse(await file.text()));
      const merged = mergeLedger(ledger, incoming);
      writeLedger(window.localStorage, merged);
      setLedger(merged);
      setMessage(`History merged safely: ${merged.events.length - ledger.events.length} new events.`);
    } catch (err) {
      setMessage(`Import rejected; existing history preserved. ${err instanceof Error ? err.message : ''}`);
    }
  };

  if (!ready) return <p className="p-6 font-code">Loading local PAO practice history…</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-16">
      <section className="rounded-[2rem] border-4 border-black bg-card p-5 sm:p-10 ink-shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full border-2 border-black bg-accent px-4 py-2 text-xs font-bold text-accent-foreground">MEMORY LAB / 00—99</span>
          <span className="text-xs font-code text-muted-foreground">Candidate roster · source-aware · offline local history</span>
        </div>
        <h1 className="mt-6 font-headline text-2xl leading-snug sm:text-4xl">ROLL // 99</h1>
        <p className="mt-3 max-w-2xl text-lg">Roll two ten-sided digits. Recall the person, action and object. Reveal, grade yourself, and strengthen your next recall.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'PAO slots', value: ROSTER.length },
            { label: 'Practiced', value: tried },
            { label: 'Due now', value: due.length },
            { label: 'Good recalls', value: good },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border-2 border-black bg-muted/30 p-4 text-center">
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {blocked ? (
        <div role="alert" className="rounded-xl border-4 border-destructive bg-card p-6 text-destructive">{blocked}</div>
      ) : (
        <section className="rounded-[2rem] border-4 border-black bg-card p-5 sm:p-10 ink-shadow-sm">
          <div className="flex flex-wrap gap-3">
            <Button onClick={roll} className="min-h-14"><Dices className="mr-2 size-5" />Roll 00–99</Button>
            <Button onClick={practiceDue} variant="secondary" className="min-h-14"><Clock className="mr-2 size-5" />Practice due ({due.length})</Button>
          </div>

          {prompt ? (
            <div className="mt-8 space-y-7">
              <div className="rounded-3xl border-4 border-black bg-primary/10 p-7 text-center blueprint-bg">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest">Recall this number</div>
                <div aria-label={`Number ${prompt.binding.number[0]} ${prompt.binding.number[1]}`} className="font-headline text-6xl tracking-wider sm:text-8xl">
                  {prompt.binding.number}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">Think of your person, action and object before revealing.</div>
              </div>
              {!revealed ? (
                <Button onClick={() => setRevealed(true)} variant="accent" className="w-full min-h-16">
                  <Eye className="mr-2 size-5" />Reveal association
                </Button>
              ) : (
                <div aria-live="polite" className="space-y-5">
                  <div className="rounded-2xl border-4 border-black bg-muted/20 p-5">
                    <div className="text-xs font-bold text-muted-foreground">PERSON / {prompt.binding.initials || '—'}</div>
                    <h2 className="mt-2 text-3xl font-black">{prompt.binding.person}</h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div><div className="text-xs font-bold uppercase text-muted-foreground">Action</div><p className="text-lg">{prompt.binding.action}</p></div>
                      <div><div className="text-xs font-bold uppercase text-muted-foreground">Object</div><p className="text-lg">{prompt.binding.object}</p></div>
                    </div>
                    {prompt.binding.emojiStory && <p className="mt-5 text-2xl" aria-label="Emoji memory story">{prompt.binding.emojiStory}</p>}
                    <p className="mt-5 text-xs text-muted-foreground">Legacy public PAO association; this does not overwrite your canonical roster.</p>
                  </div>
                  <p className="font-bold">How well did you recall it?</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Button variant="destructive" onClick={() => grade(1)} className="min-h-16">Again · 1</Button>
                    <Button variant="secondary" onClick={() => grade(3)} className="min-h-16">Hard · 3</Button>
                    <Button variant="success" onClick={() => grade(5)} className="min-h-16">Good · 5</Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border-4 border-dashed border-black/40 bg-muted/20 p-10 text-center">
              <Brain className="mx-auto mb-3 size-12 text-primary" />
              {last ? (
                <>
                  <h2 className="text-xl font-black"><CheckCircle2 className="mr-2 inline size-6" />{last.number} · {last.person}</h2>
                  <p className="mt-2">Graded {gradeLabel(last.grade)}. Ready for another?</p>
                </>
              ) : <p className="text-lg">Start with a random roll or work through your due cards.</p>}
            </div>
          )}
          {message && <p role="status" className="mt-5 rounded-lg border-2 border-black bg-muted/40 p-3 text-sm">{message}</p>}
        </section>
      )}

      <section className="rounded-[2rem] border-4 border-black bg-card p-5 sm:p-8 ink-shadow-sm">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold"><RotateCcw className="size-5" />Review history</h2>
        <p className="text-sm text-muted-foreground">Reviews belong to this browser until you export them. JSON imports merge by immutable event ID; conflicts are rejected.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" disabled={!!blocked} onClick={() => download('pao-roll99-history.json', exportLedger(ledger), 'application/json')}>
            <Download className="mr-2 size-4" />Export JSON
          </Button>
          <Button variant="outline" size="sm" disabled={!!blocked} onClick={() => download('pao-roll99-history.csv', exportCsv(ledger), 'text/csv')}>
            <Download className="mr-2 size-4" />Export CSV
          </Button>
          <label className={`inline-flex min-h-9 items-center gap-2 rounded-md border-2 border-black px-4 py-2 text-xs font-bold ${blocked ? 'opacity-50' : 'cursor-pointer'}`}>
            <Upload className="size-4" />Import JSON
            <input type="file" accept=".json,application/json" disabled={!!blocked} onChange={importHistory} className="sr-only" />
          </label>
        </div>
        {latest.length ? (
          <ul className="mt-6 space-y-2">
            {latest.map(item => <li key={item.id} className="flex flex-wrap justify-between gap-2 rounded-lg border border-border p-3 text-sm">
              <span><strong>{item.slotId}</strong> · {gradeLabel(item.grade)} · {(item.durationMs / 1000).toFixed(1)}s</span>
              <span className="text-muted-foreground">{new Date(item.occurredAt).toLocaleString()}</span>
            </li>)}
          </ul>
        ) : <p className="mt-6 text-sm text-muted-foreground">No reviews yet. Your first roll is ready.</p>}
      </section>
    </div>
  );
}
