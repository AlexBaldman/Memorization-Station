'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDeckStore } from '@/lib/store/useDeckStore';
import { Card as CardType, PracticeMode } from '@/lib/domain/types';
import { Button } from '@/components/ui/button';
import { Card as UICard } from '@/components/ui/card';
import { Trophy, Dices, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useStatsStore } from '@/lib/store/useStatsStore';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { PracticeCardView } from './practice/practice-card-view';
import { AnswerControls } from './practice/answer-controls';
import { SessionSummary } from './practice/session-summary';
import { playSuccessSound, playErrorSound, playFlipSound } from '@/lib/design/audio';

interface SessionStats {
  correct: number;
  incorrect: number;
  combo: number;
  maxCombo: number;
  startTime: number;
}

export function PracticeSession({ deckId }: { deckId?: string }) {
  const { getDueCards, recordPractice, getDeck } = useDeckStore(state => ({
    getDueCards: state.getDueCards,
    recordPractice: state.recordPractice,
    getDeck: state.getDeck,
  }));
  const { getRank } = useStatsStore();
  const { showPronunciation, defaultPracticeMode } = useSettingsStore();

  const [mode, setMode] = useState<PracticeMode>(defaultPracticeMode);
  const [cardsInSession, setCardsInSession] = useState<CardType[]>([]);
  const [sessionStats, setSessionStats] = useState<SessionStats>({ 
    correct: 0, 
    incorrect: 0, 
    combo: 0, 
    maxCombo: 0,
    startTime: Date.now()
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dismissal, setDismissal] = useState<'correct' | 'incorrect' | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const deck = useMemo(() => deckId ? getDeck(deckId) : null, [deckId, getDeck]);
  const dueCards = useMemo(() => getDueCards(deckId), [deckId, getDueCards]);

  useEffect(() => {
    if (dueCards.length > 0 && cardsInSession.length === 0) {
      setCardsInSession([...dueCards].sort(() => Math.random() - 0.5));
    }
  }, [dueCards, cardsInSession.length]);

  useEffect(() => {
    if (currentCardIndex < cardsInSession.length) {
        const timer = setInterval(() => {
            setElapsed(Math.floor((Date.now() - sessionStats.startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }
  }, [currentCardIndex, cardsInSession.length, sessionStats.startTime]);

  const initialCardCount = useMemo(() => cardsInSession.length, [cardsInSession.length]);
  const progressValue = useMemo(() => initialCardCount > 0 ? ((currentCardIndex) / initialCardCount) * 100 : 0, [initialCardCount, currentCardIndex]);
  const cardsToRender = useMemo(() => {
    return cardsInSession.slice(currentCardIndex, currentCardIndex + 2).reverse();
  }, [cardsInSession, currentCardIndex]);
  
  const currentCard = cardsInSession[currentCardIndex];

  const handleAnswer = useCallback((gotIt: boolean) => {
    if (!currentCard || dismissal) return;

    if (gotIt) {
      playSuccessSound();
    } else {
      playErrorSound();
    }

    setDismissal(gotIt ? 'correct' : 'incorrect');
    
    setSessionStats(prev => {
        const newCombo = gotIt ? prev.combo + 1 : 0;
        return {
            ...prev,
            correct: prev.correct + (gotIt ? 1 : 0),
            incorrect: prev.incorrect + (gotIt ? 0 : 1),
            combo: newCombo,
            maxCombo: Math.max(prev.maxCombo, newCombo)
        };
    });
    
    recordPractice(currentCard.id, gotIt);

    setTimeout(() => {
      setIsFlipped(false);
      setCurrentCardIndex(prev => prev + 1);
      setDismissal(null);
    }, 600);

  }, [currentCard, dismissal, recordPractice]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!currentCard || dismissal) return;
        if (e.code === 'Space' || e.key === 'f') {
            e.preventDefault();
            playFlipSound();
            setIsFlipped(f => !f);
        } else if (isFlipped) {
            if (e.key === '1' || e.key === 'ArrowLeft') {
                e.preventDefault();
                handleAnswer(false);
            } else if (e.key === '2' || e.key === 'ArrowRight') {
                e.preventDefault();
                handleAnswer(true);
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, handleAnswer, currentCard, dismissal]);

  if (dueCards.length === 0 && cardsInSession.length === 0) {
     return (
      <UICard noHover className="text-center p-0 max-w-lg mx-auto border-8 border-black ink-shadow-lg rounded-[3rem] bg-card animate-in fade-in zoom-in duration-700 overflow-hidden relative">
        <div className="p-12 bg-success border-b-8 border-black text-center relative">
          <div className="absolute inset-0 blueprint-bg opacity-20" />
          <Trophy className="w-24 h-24 text-white mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] relative z-10" />
          <h2 className="font-headline text-3xl text-white text-shadow relative z-10 uppercase tracking-tighter">ARCHIVE SECURED</h2>
        </div>
        <div className="p-12 space-y-8 relative z-10">
          <p className="text-2xl text-muted-foreground font-serif italic max-w-sm mx-auto leading-relaxed">
            All neural cards in this repository have been synchronized. No review required.
          </p>
          <Button asChild size="lg" className="mt-8 font-headline text-xs px-12 h-20 rounded-2xl border-4 border-black shadow-[8px_8px_0_black]">
            <Link href="/">RETURN TO DRAWER</Link>
          </Button>
        </div>
      </UICard>
    );
  }

  if (currentCardIndex >= initialCardCount && initialCardCount > 0) {
    return (
      <SessionSummary 
        initialCardCount={initialCardCount}
        sessionStats={sessionStats}
        elapsed={elapsed}
        rank={getRank()}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 max-w-xl mx-auto pb-32 px-4">
      <div className="w-full space-y-6 bg-card p-6 rounded-[2.5rem] border-4 border-black ink-shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-headline text-muted-foreground uppercase tracking-widest font-black">Active Sync Session</span>
            <div className="flex items-center gap-2">
                <Dices className="h-4 w-4 text-primary" />
                <span className="font-headline text-[9px] text-primary truncate max-w-[120px] uppercase">
                    {deck?.name || "Global Sync"}
                </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
              <div className="flex flex-col items-end gap-1">
                  <span className="text-[7px] font-headline text-muted-foreground uppercase">Combo</span>
                  <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full border-2 border-accent">
                      <Flame className={cn("h-3 w-3 text-accent", sessionStats.combo > 0 && "animate-bounce")} />
                      <span className="font-code font-black text-xs text-accent">{sessionStats.combo}</span>
                  </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                  <span className="text-[7px] font-headline text-muted-foreground uppercase">Time</span>
                  <div className="bg-orange-500/10 px-3 py-1 rounded-full border-2 border-orange-500">
                      <span className="font-code font-black text-xs text-orange-500">{elapsed}s</span>
                  </div>
              </div>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <div className="flex justify-between text-[7px] font-headline uppercase text-muted-foreground">
              <span>Synchronization Progress</span>
              <span>{currentCardIndex + 1} / {initialCardCount}</span>
          </div>
          <Progress value={progressValue} className="h-6 border-4 border-black bg-muted/30 rounded-xl overflow-hidden" />
        </div>

        <div className="flex gap-2 p-1 border-2 border-black rounded-xl bg-white/50">
            {(['classic', 'visual', 'bridge'] as PracticeMode[]).map((m) => (
                <Button 
                    key={m}
                    variant={mode === m ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                        "flex-1 h-8 font-headline text-[7px] uppercase border-0 shadow-none",
                        mode === m ? "bg-primary text-white" : "text-muted-foreground"
                    )}
                    onClick={() => setMode(m)}
                >
                    {m}
                </Button>
            ))}
        </div>
      </div>
      
      <div className="relative w-full max-w-sm mx-auto h-[540px] perspective-1000">
        {cardsToRender.map((card, index) => {
            const position = cardsToRender.length - 1 - index;
            const isTopCard = position === 0;

            const style: React.CSSProperties = {
                zIndex: 100 - position,
                transform: `scale(${1 - position * 0.08}) translateY(-${position * 30}px) rotate(${position * 2}deg)`,
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            };

            if (isTopCard && dismissal) {
                style.transform = dismissal === 'correct' 
                    ? 'translateX(500%) rotate(45deg) scale(0.5)' 
                    : 'translateX(-500%) rotate(-45deg) scale(0.5)';
                style.opacity = 0;
            }
             if (!isTopCard) {
                style.pointerEvents = 'none';
                style.opacity = 0.5;
            }

            return (
                 <div
                    key={card.id}
                    className="absolute w-full h-full"
                    style={style}
                    onClick={(e) => {
                      if (!isTopCard || dismissal) return;
                      playFlipSound();
                      setIsFlipped(!isFlipped);
                    }}
                >
                    <PracticeCardView
                        card={card}
                        isFlipped={isFlipped}
                        isTopCard={isTopCard}
                        showPronunciation={showPronunciation}
                        mode={mode}
                    />
                </div>
            );
        })}
      </div>
      
      <AnswerControls 
        isVisible={isFlipped && !dismissal} 
        onAnswer={handleAnswer} 
      />
    </div>
  );
}
