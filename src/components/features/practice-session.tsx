'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDeckStore } from '@/lib/store/useDeckStore';
import { Card as CardType, PracticeMode, ConjugationMatrix, TenseConjugation } from '@/lib/domain/types';
import { Button } from '@/components/ui/button';
import { Card as UICard } from '@/components/ui/card';
import { 
  ThumbsDown, ThumbsUp, Trophy, Target, Loader2, Info, ChevronRight, 
  BrainCircuit, Sparkles, TrendingUp, History, Zap, Timer, 
  Dices, Eye, Layout, Languages, Flame, Clock, Calendar
} from 'lucide-react';
import Image from 'next/image';
import { getImage } from '@/lib/data/image-cache';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useStatsStore } from '@/lib/store/useStatsStore';
import { useSettingsStore } from '@/lib/store/useSettingsStore';

interface SessionStats {
  correct: number;
  incorrect: number;
  combo: number;
  maxCombo: number;
  startTime: number;
}

const ConjugationHub = ({ conjugations }: { conjugations: ConjugationMatrix }) => {
    const [activeTense, setActiveTense] = useState<'present' | 'past' | 'future'>('present');
    const data = conjugations[activeTense];

    const labels = {
        eu: 'Eu (I)',
        voce: 'Você (You)',
        nos: 'Nós (We)',
        eles: 'Eles (They)',
    };

    return (
        <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-headline text-[8px] uppercase tracking-widest text-primary">Conjugation Matrix</span>
                </div>
                <div className="flex gap-1 border-2 border-black rounded-lg p-0.5 bg-white shadow-sm">
                    {(['present', 'past', 'future'] as const).map(t => (
                        <button
                            key={t}
                            onClick={(e) => { e.stopPropagation(); setActiveTense(t); }}
                            className={cn(
                                "px-2 py-1 text-[7px] font-headline uppercase rounded-md transition-all",
                                activeTense === t ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {Object.entries(labels).map(([key, label]) => (
                    <div key={key} className="bg-white border-2 border-black rounded-xl p-3 ink-shadow-sm flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                        <span className="text-[6px] font-headline text-muted-foreground uppercase mb-1">{label}</span>
                        <span className="text-sm font-code font-black text-primary uppercase">{(data as any)[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PracticeCardView = ({ 
  card, 
  isFlipped, 
  isTopCard, 
  showPronunciation, 
  mode 
}: { 
  card: CardType, 
  isFlipped: boolean, 
  isTopCard: boolean, 
  showPronunciation: boolean,
  mode: PracticeMode
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    useEffect(() => {
        let objectUrl: string | null = null;
        let isCancelled = false;

        if (isTopCard) {
            setImageUrl(null);
            if (card?.imageUrl) {
                setImageUrl(card.imageUrl);
            } else if (card?.imageKey) {
                getImage(card.imageKey).then(blob => {
                    if (!isCancelled && blob) {
                        objectUrl = URL.createObjectURL(blob);
                        setImageUrl(objectUrl);
                    }
                });
            }
        }
        
        return () => {
            isCancelled = true;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [card, isTopCard]);

    return (
        <div
            className={cn(
                "relative w-full h-full transform-style-3d transition-transform duration-500 ease-in-out cursor-pointer",
                isFlipped && "rotate-y-180"
            )}
        >
            {/* Front of card (TCG Quest Phase) */}
            <UICard 
                noHover 
                className="absolute flex h-full w-full flex-col p-0 text-center text-card-foreground backface-hidden overflow-hidden border-8 border-black ink-shadow-lg rounded-[2.5rem] bg-card"
            >
                <div className="p-4 border-b-4 border-black bg-primary/10 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4 text-primary" />
                        <h3 className="font-headline text-[8px] text-primary tracking-tighter uppercase">
                            NEURAL QUEST: {mode.toUpperCase()}
                        </h3>
                    </div>
                    <div className="bg-accent text-accent-foreground px-2 py-0.5 rounded border-2 border-black font-code text-[8px] font-black">
                        LV.{card.interval}
                    </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col items-center justify-center bg-muted/5 blueprint-bg overflow-hidden">
                    {(mode === 'visual' || mode === 'classic') && (
                        <div className="w-full aspect-square rounded-xl border-4 border-black overflow-hidden shadow-inner bg-secondary/5 relative">
                             {isTopCard && imageUrl ? (
                                <Image 
                                  src={imageUrl} 
                                  alt={card.mnemonic} 
                                  fill 
                                  className="object-cover transition-transform duration-700 hover:scale-110" 
                                  unoptimized={true}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin opacity-20" />
                                </div>
                            )}
                        </div>
                    )}

                    {(mode === 'classic' || mode === 'bridge') && (
                        <div className="w-full flex flex-col items-center justify-center p-6 mt-4 rounded-xl border-4 border-black border-dashed bg-white/50 backdrop-blur-sm min-h-[120px]">
                            <p className="text-[7px] font-headline text-muted-foreground uppercase mb-2 tracking-widest">Vision Mnemonic</p>
                            <p className="text-base sm:text-lg font-serif font-black italic leading-snug break-words">
                                {mode === 'bridge' ? card.english : card.mnemonic}
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="p-6 shrink-0 border-t-4 border-black/10 bg-muted/5 flex justify-center">
                    <div className="bg-accent text-accent-foreground text-[8px] font-headline px-8 py-3 rounded-full border-4 border-black ink-shadow-sm animate-bounce shadow-xl uppercase relative">
                      Reveal Target
                      <div className="absolute -top-3 -right-3 bg-white text-black px-2 py-1 rounded-md text-[6px] font-code font-bold border-2 border-black rotate-12 hidden md:block shadow-sm">SPACE</div>
                    </div>
                </div>
            </UICard>

            {/* Back of card (TCG Target Revealed) */}
            <UICard 
                noHover 
                className="absolute flex h-full w-full flex-col p-0 items-center justify-start text-center text-card-foreground backface-hidden rotate-y-180 overflow-hidden border-8 border-black ink-shadow-lg rounded-[2.5rem] bg-card"
            >
                <div className="w-full p-8 border-b-4 border-black bg-primary relative overflow-hidden shrink-0 flex flex-col items-center justify-center min-h-[180px]">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10 blueprint-bg" />
                     <span className="text-[8px] font-headline text-white/60 uppercase tracking-widest mb-2 relative z-10">Target Manifested</span>
                     <h2 className="font-headline text-3xl sm:text-5xl text-primary-foreground text-shadow drop-shadow-[4px_4px_0_black] relative z-10 uppercase tracking-tighter break-words max-w-full px-6 leading-tight">
                         {card.portuguese}
                     </h2>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center space-y-6 p-6 w-full bg-secondary/5 blueprint-bg overflow-y-auto">
                    {card.conjugations ? (
                        <ConjugationHub conjugations={card.conjugations} />
                    ) : (
                        <div className="space-y-6 w-full">
                          <div className="bg-white/80 backdrop-blur-sm border-4 border-black p-6 rounded-2xl ink-shadow-sm transform -rotate-1">
                             <span className="text-[7px] font-headline text-muted-foreground uppercase tracking-widest mb-2 block">Interpretation</span>
                             <p className="text-3xl sm:text-5xl font-black font-serif text-foreground tracking-tighter italic break-words leading-tight">
                                 {card.english}
                             </p>
                          </div>
                          
                          {showPronunciation && card.pronunciation && (
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-[8px] font-headline text-muted-foreground uppercase tracking-widest">Phonetic Matrix</span>
                                <div className="bg-white border-2 border-black px-6 py-2 rounded-xl">
                                  <p className="text-xl text-foreground font-code font-black">/{card.pronunciation}/</p>
                                </div>
                              </div>
                          )}
                        </div>
                    )}
                </div>

                <div className="p-6 w-full border-t-4 border-black bg-muted/10 flex items-center justify-center shrink-0">
                  <p className="text-[10px] font-headline text-primary uppercase tracking-[0.3em] font-black">Grade Accuracy</p>
                </div>
            </UICard>
        </div>
    );
};


export function PracticeSession({ deckId }: { deckId?: string }) {
  const { getDueCards, recordPractice, getDeck, getDeckMastery } = useDeckStore(state => ({
    getDueCards: state.getDueCards,
    recordPractice: state.recordPractice,
    getDeck: state.getDeck,
    getDeckMastery: state.getDeckMastery,
  }));
  const { currentStreak, getAccuracy, getRank } = useStatsStore();
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
    const sessionAccuracy = Math.round((sessionStats.correct / initialCardCount) * 100);
    const rank = getRank();
    
    return (
      <UICard noHover className="text-center p-0 max-w-lg mx-auto border-8 border-black ink-shadow-lg rounded-[3rem] bg-card animate-in fade-in slide-in-from-bottom-10 duration-700 overflow-hidden">
        <div className="p-12 bg-primary border-b-8 border-black text-center relative">
          <div className="absolute inset-0 blueprint-bg opacity-20" />
          <div className="bg-accent h-24 w-24 rounded-full border-4 border-black mx-auto mb-6 flex items-center justify-center ink-shadow-sm transform -rotate-6 relative z-10">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-headline text-2xl text-primary-foreground text-shadow relative z-10">SYNC RESULT</h2>
          <p className="font-headline text-[10px] text-white/80 mt-2 tracking-widest uppercase">RANK: {rank}</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Accuracy</p>
              <p className="text-3xl font-black font-code text-primary">{sessionAccuracy}%</p>
            </div>
            <div className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <Timer className="h-5 w-5 text-orange-500 mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Duration</p>
              <p className="text-3xl font-black font-code text-orange-500">{elapsed}S</p>
            </div>
            <div className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <Flame className="h-5 w-5 text-accent mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Max Combo</p>
              <p className="text-3xl font-black font-code text-accent">{sessionStats.maxCombo}</p>
            </div>
            <div className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <Target className="h-5 w-5 text-success mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Success</p>
              <p className="text-3xl font-black font-code text-success">{sessionStats.correct}</p>
            </div>
          </div>

          <Button asChild size="lg" className="w-full h-20 font-headline text-xs bg-primary text-primary-foreground border-4 border-black ink-shadow-lg hover:-translate-y-2 transition-all">
            <Link href="/">RETURN TO DRAWER</Link>
          </Button>
        </div>
      </UICard>
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
      
      <div className={cn(
        "grid grid-cols-2 w-full gap-6 transition-all duration-500 transform max-w-md mx-auto",
        isFlipped && !dismissal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      )}>
        <Button
            variant="destructive"
            size="lg"
            className="h-24 font-headline text-[10px] border-4 border-black ink-shadow-lg rounded-[1.5rem] group relative"
            onClick={(e) => {
              e.stopPropagation();
              handleAnswer(false);
            }}
        >
            <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
              <ThumbsDown className="w-8 h-8" />
              <span className="font-black uppercase">Forget</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/20 text-white px-2 py-0.5 rounded text-[8px] font-code hidden md:block">← / 1</div>
        </Button>
        <Button
            size="lg"
            variant="success"
            className="h-24 font-headline text-[10px] border-4 border-black ink-shadow-lg rounded-[1.5rem] group relative"
            onClick={(e) => {
              e.stopPropagation();
              handleAnswer(true);
            }}
        >
            <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
              <ThumbsUp className="w-8 h-8" />
              <span className="font-black uppercase">Synced</span>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/20 text-white px-2 py-0.5 rounded text-[8px] font-code hidden md:block">→ / 2</div>
        </Button>
      </div>
    </div>
  );
}
