'use client';

import { useState, useEffect, useCallback } from 'react';
import { PAO_DICTIONARY } from '@/lib/data/initial-content';
import { playDiceRollSound } from '@/lib/design/audio';
import { Volume2, VolumeX, RotateCcw, Sparkles, BookOpen, ExternalLink, Dices } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Skin {
  id: string;
  name: string;
  detail: string;
  tens: string;
  ones: string;
  highlight: string;
  bgDark: string;
}

const SKINS: Skin[] = [
  { id: 'afterburn', name: 'AFTERBURN', detail: 'CYAN / HOT PINK', tens: '#28eaf5', ones: '#fa4dc8', highlight: '#f8c96a', bgDark: '#080c1a' },
  { id: 'phosphor', name: 'PHOSPHOR', detail: 'LIME / JADE', tens: '#aeff39', ones: '#33ffbe', highlight: '#e8ffbc', bgDark: '#061812' },
  { id: 'goldrush', name: 'GOLDRUSH', detail: 'AMBER / CORAL', tens: '#ffc45e', ones: '#ff6d48', highlight: '#f8e8bd', bgDark: '#17100b' },
  { id: 'ultraviolet', name: 'ULTRAVIOLET', detail: 'LILAC / MAGENTA', tens: '#a28cff', ones: '#f767d6', highlight: '#eae7ff', bgDark: '#100b21' },
  { id: 'comix', name: 'COMIX INK', detail: 'SOLAR / CORAL', tens: '#fde047', ones: '#fb7185', highlight: '#38bdf8', bgDark: '#1c1917' },
];

function getRandomDigit(): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const buf = new Uint8Array(1);
    do {
      window.crypto.getRandomValues(buf);
    } while (buf[0] >= 250);
    return buf[0] % 10;
  }
  return Math.floor(Math.random() * 10);
}

export function RollStation() {
  const [activeSkin, setActiveSkin] = useState<Skin>(SKINS[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRolling, setIsRolling] = useState(false);
  const [tensDigit, setTensDigit] = useState<number | null>(4);
  const [onesDigit, setOnesDigit] = useState<number | null>(2);
  const [currentNumber, setCurrentNumber] = useState<string>('42');
  const [isRevealed, setIsRevealed] = useState(false);
  const [rollHistory, setRollHistory] = useState<string[]>(['42']);

  const activePao = currentNumber ? PAO_DICTIONARY[currentNumber] : null;

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setIsRevealed(false);

    if (soundEnabled) {
      playDiceRollSound();
    }

    const newTens = getRandomDigit();
    const newOnes = getRandomDigit();
    const numStr = `${newTens}${newOnes}`;

    setTimeout(() => {
      setTensDigit(newTens);
      setOnesDigit(newOnes);
      setCurrentNumber(numStr);
      setRollHistory((prev) => [numStr, ...prev.filter((_, idx) => idx < 23)]);
      setIsRolling(false);
    }, 850);
  }, [isRolling, soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleRoll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRoll]);

  const selectHistoricRoll = (num: string) => {
    setCurrentNumber(num);
    const t = parseInt(num[0], 10);
    const o = parseInt(num[1], 10);
    setTensDigit(t);
    setOnesDigit(o);
    setIsRevealed(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Station Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-white dark:bg-card border-4 border-black rounded-3xl ink-shadow mb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-yellow-300 dark:bg-yellow-400 border-2 border-black rounded-xl text-black">
              <Dices className="h-6 w-6" />
            </span>
            <h1 className="font-headline text-xl md:text-2xl text-foreground tracking-tight">
              ROLL//99 · DIGITAL DICE MACHINE
            </h1>
          </div>
          <p className="font-serif italic text-sm text-muted-foreground mt-1">
            Percentile D10 reflexes meets the 00–99 Person-Action-Object memory matrix.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="border-3 border-black font-headline text-xs h-11 px-4 gap-2 rounded-xl"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-green-500" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
            <span>SFX {soundEnabled ? 'ON' : 'OFF'}</span>
          </Button>

          <Link href="/practice?deckId=mt-pao">
            <Button
              type="button"
              className="border-3 border-black font-headline text-xs h-11 px-4 bg-primary text-primary-foreground hover:bg-black hover:text-white rounded-xl gap-2 ink-shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>TRAIN PAO DECK</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Machine Stage & Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stage (Left 2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div
            className="relative p-6 sm:p-10 border-4 border-black rounded-3xl overflow-hidden transition-colors duration-500 ink-shadow"
            style={{
              backgroundColor: activeSkin.bgDark,
              boxShadow: `0 20px 80px rgba(0,0,0,0.4), inset 0 2px rgba(255,255,255,0.1)`,
            }}
          >
            {/* Ambient Backlight */}
            <div
              className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] pointer-events-none opacity-20 blur-3xl transition-all duration-700"
              style={{
                background: `radial-gradient(circle at 40% 40%, ${activeSkin.tens}, ${activeSkin.ones} 70%, transparent)`,
              }}
            />

            {/* Header / Subhead */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase mb-6">
              <span style={{ color: activeSkin.tens }} className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ backgroundColor: activeSkin.tens }} />
                TWO D10 / 100 COMBINATIONS
              </span>
              <span className="text-white/60 font-medium">STATION 02 · ROLL ENGINE</span>
            </div>

            {/* Dice Pair */}
            <div
              onClick={handleRoll}
              className="relative z-10 cursor-pointer select-none grid grid-cols-2 gap-4 max-w-lg mx-auto my-4 group"
              title="Click or press Space to roll"
            >
              {/* Tens Die */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-full max-w-[210px] aspect-[280/320] transition-transform duration-700 filter drop-shadow-xl',
                    isRolling && 'animate-spin-slow'
                  )}
                  style={{
                    filter: `drop-shadow(0 12px 24px ${activeSkin.tens}33)`,
                  }}
                >
                  <svg viewBox="0 0 280 320" className="w-full h-full overflow-visible">
                    <polygon
                      points="140,11 241,60 271,172 220,279 140,314 60,279 9,172 39,60"
                      fill="#0e1726"
                      stroke={activeSkin.tens}
                      strokeWidth="5"
                    />
                    <path
                      d="M140 11 L140 128 L39 60 M140 128 L9 172 L60 279 M140 128 L140 314 L220 279 M140 128 L271 172 L241 60 M140 128 L140 11"
                      stroke={activeSkin.tens}
                      strokeWidth="2.5"
                      strokeOpacity="0.4"
                      fill="none"
                    />
                    <polygon points="39,60 140,128 241,60 140,11" fill="white" fillOpacity="0.06" />
                    <text
                      x="140"
                      y="195"
                      textAnchor="middle"
                      fontSize="108"
                      fontWeight="900"
                      fontFamily="monospace"
                      fill="#ffffff"
                    >
                      {isRolling ? '·' : (tensDigit !== null ? tensDigit : '?')}
                    </text>
                    <text
                      x="140"
                      y="245"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="800"
                      fontFamily="monospace"
                      fill={activeSkin.tens}
                      letterSpacing="4"
                    >
                      ×10
                    </text>
                  </svg>
                </div>
                <span className="font-mono text-xs font-bold tracking-widest mt-2" style={{ color: activeSkin.tens }}>
                  01 / TENS DIGIT
                </span>
              </div>

              {/* Ones Die */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-full max-w-[210px] aspect-[280/320] transition-transform duration-700 filter drop-shadow-xl',
                    isRolling && 'animate-spin-slow'
                  )}
                  style={{
                    filter: `drop-shadow(0 12px 24px ${activeSkin.ones}33)`,
                  }}
                >
                  <svg viewBox="0 0 280 320" className="w-full h-full overflow-visible">
                    <polygon
                      points="140,11 241,60 271,172 220,279 140,314 60,279 9,172 39,60"
                      fill="#0e1726"
                      stroke={activeSkin.ones}
                      strokeWidth="5"
                    />
                    <path
                      d="M140 11 L140 128 L39 60 M140 128 L9 172 L60 279 M140 128 L140 314 L220 279 M140 128 L271 172 L241 60 M140 128 L140 11"
                      stroke={activeSkin.ones}
                      strokeWidth="2.5"
                      strokeOpacity="0.4"
                      fill="none"
                    />
                    <polygon points="39,60 140,128 241,60 140,11" fill="white" fillOpacity="0.06" />
                    <text
                      x="140"
                      y="195"
                      textAnchor="middle"
                      fontSize="108"
                      fontWeight="900"
                      fontFamily="monospace"
                      fill="#ffffff"
                    >
                      {isRolling ? '·' : (onesDigit !== null ? onesDigit : '?')}
                    </text>
                    <text
                      x="140"
                      y="245"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="800"
                      fontFamily="monospace"
                      fill={activeSkin.ones}
                      letterSpacing="4"
                    >
                      ×1
                    </text>
                  </svg>
                </div>
                <span className="font-mono text-xs font-bold tracking-widest mt-2" style={{ color: activeSkin.ones }}>
                  02 / ONES DIGIT
                </span>
              </div>
            </div>

            {/* Readout */}
            <div className="relative z-10 text-center border-t border-white/10 pt-4 mt-4">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold block mb-1">
                PERCENTILE OUTPUT
              </span>
              <div className="font-mono text-7xl sm:text-8xl font-black tracking-tighter">
                <span style={{ color: activeSkin.tens }}>
                  {isRolling ? '-' : (tensDigit !== null ? tensDigit : '-')}
                </span>
                <span style={{ color: activeSkin.ones }}>
                  {isRolling ? '-' : (onesDigit !== null ? onesDigit : '-')}
                </span>
              </div>
            </div>

            {/* Roll Trigger Button */}
            <div className="relative z-10 mt-6">
              <button
                type="button"
                onClick={handleRoll}
                disabled={isRolling}
                style={{
                  background: `linear-gradient(100deg, ${activeSkin.tens}, #ffffff)`,
                  boxShadow: `0 8px 30px ${activeSkin.tens}55`,
                }}
                className={cn(
                  'w-full py-5 rounded-2xl font-headline text-sm sm:text-base text-black tracking-widest border-4 border-black transition-all',
                  'hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 disabled:cursor-wait font-bold'
                )}
              >
                {isRolling ? '◉ ROLLING 2 × D10...' : '↻  ROLL THE DICE  [SPACE / R]'}
              </button>
            </div>
          </div>

          {/* PAO Active Recall Card */}
          <div className="p-6 bg-white dark:bg-card border-4 border-black rounded-3xl ink-shadow">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-headline text-xs px-2.5 py-1 bg-black text-yellow-300 rounded-md">
                  PAO NODE #{currentNumber}
                </span>
                {activePao?.initials && (
                  <span className="font-mono text-xs font-bold text-muted-foreground">
                    INITIALS: {activePao.initials}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Active Recall Drill
              </span>
            </div>

            {activePao ? (
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Visual Thumbnail */}
                <div className="w-full md:w-36 h-36 relative rounded-2xl border-3 border-black overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  {activePao.imageUrl ? (
                    <Image
                      src={activePao.imageUrl}
                      alt={activePao.name}
                      fill
                      className="object-cover"
                      sizes="150px"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {activePao.emoji || '🎭'}
                    </div>
                  )}
                  {!isRevealed && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-2 text-center">
                      <span className="text-2xl mb-1">❓</span>
                      <span className="font-headline text-[9px]">LOCKED</span>
                    </div>
                  )}
                </div>

                {/* Details / Hidden Area */}
                <div className="flex-1 w-full">
                  {!isRevealed ? (
                    <div className="space-y-4">
                      <p className="font-serif italic text-base text-foreground">
                        Test your memory! What is the <strong>Person</strong>, <strong>Action</strong>, and <strong>Object</strong> for number <span className="font-mono font-bold text-lg text-primary">{currentNumber}</span>?
                      </p>
                      <Button
                        type="button"
                        onClick={() => setIsRevealed(true)}
                        className="font-headline text-xs h-12 px-6 border-3 border-black bg-yellow-400 text-black hover:bg-black hover:text-white rounded-xl ink-shadow-sm"
                      >
                        REVEAL PAO ANCHOR
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className="font-headline text-lg sm:text-xl text-foreground flex items-center gap-2">
                          <span>{activePao.name}</span>
                          <span className="text-2xl">{activePao.emoji}</span>
                        </div>
                        {activePao.emojiStory && (
                          <div className="text-xl tracking-widest mt-1 opacity-80">
                            {activePao.emojiStory}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-muted/50 rounded-xl border-2 border-black/10">
                          <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold block">
                            ACTION
                          </span>
                          <span className="font-sans font-medium text-sm text-foreground">
                            {activePao.action}
                          </span>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-xl border-2 border-black/10">
                          <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold block">
                            OBJECT
                          </span>
                          <span className="font-sans font-medium text-sm text-foreground">
                            {activePao.object}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsRevealed(false)}
                          className="font-mono text-xs text-muted-foreground hover:text-foreground"
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1" />
                          Hide Details
                        </Button>
                        <Link href="/pao">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="font-headline text-[10px] h-8 border-2 border-black rounded-lg gap-1.5"
                          >
                            <ExternalLink className="h-3 w-3" />
                            VIEW IN PAO MATRIX
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No PAO data registered for number {currentNumber}.</p>
            )}
          </div>
        </div>

        {/* Sidebar Controls (Right 1 col) */}
        <div className="flex flex-col gap-6">
          {/* Skin / Finishes Panel */}
          <div className="p-6 bg-white dark:bg-card border-4 border-black rounded-3xl ink-shadow">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-4">
              <span className="font-headline text-xs text-foreground">01 / DIE FINISHES</span>
              <span className="font-mono text-xs text-muted-foreground">{SKINS.length} SKINS</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {SKINS.map((skin) => {
                const isActive = activeSkin.id === skin.id;
                return (
                  <button
                    key={skin.id}
                    type="button"
                    onClick={() => setActiveSkin(skin)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left',
                      isActive
                        ? 'border-black bg-black/5 dark:bg-white/10 font-bold scale-[1.02]'
                        : 'border-transparent hover:border-black/20 hover:bg-black/5'
                    )}
                  >
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-black shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${skin.tens} 0%, ${skin.tens} 50%, ${skin.ones} 50%, ${skin.ones} 100%)`,
                      }}
                    />
                    <div>
                      <div className="font-headline text-[11px] text-foreground">{skin.name}</div>
                      <div className="font-mono text-[9px] text-muted-foreground">{skin.detail}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Roll History */}
          <div className="p-6 bg-white dark:bg-card border-4 border-black rounded-3xl ink-shadow">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-4">
              <span className="font-headline text-xs text-foreground">02 / RECENT ROLLS</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRollHistory([])}
                className="font-mono text-[10px] text-muted-foreground h-6 px-2 hover:text-destructive"
              >
                CLEAR
              </Button>
            </div>

            {rollHistory.length === 0 ? (
              <p className="font-mono text-xs text-muted-foreground italic py-4 text-center">
                No rolls yet. Statistical suspense.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
                {rollHistory.map((roll, idx) => {
                  const isCurrent = roll === currentNumber && idx === 0;
                  return (
                    <button
                      key={`${roll}-${idx}`}
                      type="button"
                      onClick={() => selectHistoricRoll(roll)}
                      className={cn(
                        'font-mono text-sm px-3 py-1.5 rounded-xl border-2 transition-all font-bold',
                        isCurrent
                          ? 'border-black bg-yellow-300 text-black ink-shadow-sm scale-105'
                          : 'border-black/20 bg-muted hover:border-black hover:bg-black/10 text-foreground'
                      )}
                    >
                      {roll}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Universe Link Box */}
          <div className="p-6 bg-amber-50 dark:bg-amber-950/30 border-4 border-black rounded-3xl ink-shadow flex flex-col gap-3">
            <span className="font-headline text-xs text-amber-900 dark:text-amber-300">
              ⚡ VOLTRON POWER
            </span>
            <p className="font-serif text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
              Every roll emits cryptographic percentile events linked directly to the canonical 100-character PAO memory palace.
            </p>
            <Link href="/pao">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full border-2 border-black font-headline text-[10px] h-9 bg-white dark:bg-card gap-2"
              >
                <BookOpen className="h-3.5 w-3.5" />
                EXPLORE FULL 00-99 MATRIX
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
