'use client';

import { useState, useMemo } from 'react';
import { PAO_DICTIONARY } from '@/lib/data/initial-content';
import type { PaoData } from '@/lib/domain/types';
import { Search, Sparkles, Dices, RotateCw, ExternalLink, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function PaoMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [decadeFilter, setDecadeFilter] = useState<string>('all');
  const [hiddenCards, setHiddenCards] = useState<Record<string, boolean>>({});

  const allEntries = useMemo(() => {
    return Object.entries(PAO_DICTIONARY).sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10));
  }, []);

  const filteredEntries = useMemo(() => {
    return allEntries.filter(([num, pao]) => {
      // Filter by decade
      if (decadeFilter !== 'all') {
        const decade = parseInt(decadeFilter, 10);
        const cardNum = parseInt(num, 10);
        if (cardNum < decade || cardNum > decade + 9) {
          return false;
        }
      }

      // Filter by search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const numMatch = num.includes(term);
      const initialsMatch = (pao.initials || '').toLowerCase().includes(term);
      const nameMatch = (pao.name || '').toLowerCase().includes(term);
      const actionMatch = (pao.action || '').toLowerCase().includes(term);
      const objectMatch = (pao.object || '').toLowerCase().includes(term);

      return numMatch || initialsMatch || nameMatch || actionMatch || objectMatch;
    });
  }, [allEntries, decadeFilter, searchTerm]);

  const toggleHide = (num: string) => {
    setHiddenCards((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleAllHidden = () => {
    const allHidden = Object.keys(hiddenCards).length === filteredEntries.length;
    if (allHidden) {
      setHiddenCards({});
    } else {
      const newHidden: Record<string, boolean> = {};
      for (const [num] of filteredEntries) {
        newHidden[num] = true;
      }
      setHiddenCards(newHidden);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Station Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-white dark:bg-card border-4 border-black rounded-3xl ink-shadow mb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-purple-300 dark:bg-purple-400 border-2 border-black rounded-xl text-black">
              <Sparkles className="h-6 w-6" />
            </span>
            <h1 className="font-headline text-xl md:text-2xl text-foreground tracking-tight">
              PAO 00–99 MEMORY PALACE MATRIX
            </h1>
          </div>
          <p className="font-serif italic text-sm text-muted-foreground mt-1">
            Complete Person-Action-Object cognitive matrix mapped to 100 visual anchors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <Link href="/roll">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-3 border-black font-headline text-xs h-11 px-4 gap-2 rounded-xl"
            >
              <Dices className="h-4 w-4 text-primary" />
              <span>DICE ROLLER</span>
            </Button>
          </Link>

          <Link href="/practice?deckId=mt-pao">
            <Button
              type="button"
              className="border-3 border-black font-headline text-xs h-11 px-4 bg-primary text-primary-foreground hover:bg-black hover:text-white rounded-xl gap-2 ink-shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>SPACED RECALL SESSION</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by number (e.g. 42), initials (DB), name (Bowie), action, or object..."
            className="pl-12 h-14 border-3 border-black rounded-2xl bg-white dark:bg-card font-medium text-base shadow-sm focus-visible:ring-black"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleAllHidden}
            className="border-3 border-black font-headline text-[10px] h-14 px-4 rounded-2xl gap-2"
          >
            <RotateCw className="h-4 w-4" />
            <span>TOGGLE TEST MODE</span>
          </Button>

          <div className="flex overflow-x-auto gap-1.5 p-1 bg-muted/60 rounded-2xl border-2 border-black/20">
            {[
              { id: 'all', label: 'ALL 100' },
              { id: '00', label: '00-09' },
              { id: '10', label: '10-19' },
              { id: '20', label: '20-29' },
              { id: '30', label: '30-39' },
              { id: '40', label: '40-49' },
              { id: '50', label: '50-59' },
              { id: '60', label: '60-69' },
              { id: '70', label: '70-79' },
              { id: '80', label: '80-89' },
              { id: '90', label: '90-99' },
            ].map((tab) => {
              const active = decadeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDecadeFilter(tab.id)}
                  className={cn(
                    'font-mono text-xs px-3 py-2 rounded-xl transition-all whitespace-nowrap font-bold',
                    active
                      ? 'bg-black text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-black/5'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of 100 PAO Nodes */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 border-4 border-dashed border-black/20 rounded-3xl p-8">
          <p className="font-headline text-lg text-muted-foreground">NO MATCHING PAO NODES FOUND</p>
          <p className="text-sm font-serif italic text-muted-foreground mt-2">Try searching by celebrity name or number.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map(([num, pao]) => {
            const isHidden = hiddenCards[num];
            return (
              <div
                key={num}
                className="group relative flex flex-col justify-between p-5 bg-white dark:bg-card border-4 border-black rounded-3xl ink-shadow hover:translate-y-[-2px] transition-all"
              >
                {/* Card Top: Number, Initials & Flip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xl px-2.5 py-0.5 bg-black text-yellow-300 rounded-lg">
                      {num}
                    </span>
                    {pao.initials && (
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-muted rounded-md text-foreground">
                        {pao.initials}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleHide(num)}
                    className="font-headline text-[9px] px-2.5 py-1 rounded-md border-2 border-black hover:bg-black hover:text-white transition-colors"
                  >
                    {isHidden ? 'REVEAL' : 'HIDE'}
                  </button>
                </div>

                {/* Portrait / Visual Anchor */}
                <div className="relative w-full h-44 rounded-2xl border-3 border-black overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 shrink-0">
                  {pao.imageUrl ? (
                    <Image
                      src={pao.imageUrl}
                      alt={pao.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      {pao.emoji || '🎭'}
                    </div>
                  )}

                  {/* Test Mode Overlay */}
                  {isHidden && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 text-center">
                      <span className="text-3xl mb-1">🧠</span>
                      <span className="font-headline text-xs text-yellow-300">TEST YOUR RECALL</span>
                      <p className="font-serif italic text-xs mt-1 text-white/80">Who is #{num}?</p>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-headline text-base text-foreground leading-snug">
                        {isHidden ? '••••••••••' : pao.name}
                      </h3>
                      {!isHidden && pao.emoji && (
                        <span className="text-xl shrink-0">{pao.emoji}</span>
                      )}
                    </div>

                    {!isHidden ? (
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-muted/60 rounded-xl border border-black/10">
                          <span className="font-mono text-[9px] font-bold text-muted-foreground uppercase block">
                            ACTION
                          </span>
                          <span className="font-sans font-medium text-foreground">
                            {pao.action}
                          </span>
                        </div>
                        <div className="p-2.5 bg-muted/60 rounded-xl border border-black/10">
                          <span className="font-mono text-[9px] font-bold text-muted-foreground uppercase block">
                            OBJECT
                          </span>
                          <span className="font-sans font-medium text-foreground">
                            {pao.object}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-black/20 text-center text-muted-foreground font-serif italic text-xs">
                        Tap "Reveal" to check Person, Action & Object.
                      </div>
                    )}
                  </div>

                  {!isHidden && pao.emojiStory && (
                    <div className="mt-3 pt-2 border-t border-black/10 text-center text-lg tracking-widest opacity-80">
                      {pao.emojiStory}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
