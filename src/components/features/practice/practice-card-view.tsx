'use client';

import { useState, useEffect } from 'react';
import { Card as CardType, PracticeMode, ConjugationMatrix } from '@/lib/domain/types';
import { Card as UICard } from '@/components/ui/card';
import { Layout, Loader2, Clock } from 'lucide-react';
import Image from 'next/image';
import { getImage } from '@/lib/data/image-cache';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { cardFlipVariants } from '@/lib/design/animations';

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

interface PracticeCardViewProps {
  card: CardType;
  isFlipped: boolean;
  isTopCard: boolean;
  showPronunciation: boolean;
  mode: PracticeMode;
}

export function PracticeCardView({ 
  card, 
  isFlipped, 
  isTopCard, 
  showPronunciation, 
  mode 
}: PracticeCardViewProps) {
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
        <motion.div
            variants={cardFlipVariants}
            initial="front"
            animate={isFlipped ? "back" : "front"}
            className="relative w-full h-full transform-style-3d cursor-pointer"
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
        </motion.div>
    );
}
