'use client';

import { Card as UICard } from '@/components/ui/card';
import { Trophy, TrendingUp, Timer, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { pageTransitionVariants, staggerContainer, staggerItem } from '@/lib/design/animations';

interface SessionSummaryProps {
  initialCardCount: number;
  sessionStats: {
    correct: number;
    incorrect: number;
    combo: number;
    maxCombo: number;
    startTime: number;
  };
  elapsed: number;
  rank: string;
}

export function SessionSummary({ initialCardCount, sessionStats, elapsed, rank }: SessionSummaryProps) {
  const sessionAccuracy = Math.round((sessionStats.correct / initialCardCount) * 100);

  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <UICard noHover className="text-center p-0 max-w-lg mx-auto border-8 border-black ink-shadow-lg rounded-[3rem] bg-card overflow-hidden">
        <div className="p-12 bg-primary border-b-8 border-black text-center relative">
          <div className="absolute inset-0 blueprint-bg opacity-20" />
          <motion.div 
             initial={{ scale: 0, rotate: -180 }}
             animate={{ scale: 1, rotate: -6 }}
             transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
             className="bg-accent h-24 w-24 rounded-full border-4 border-black mx-auto mb-6 flex items-center justify-center ink-shadow-sm relative z-10"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="font-headline text-2xl text-primary-foreground text-shadow relative z-10">SYNC RESULT</h2>
          <p className="font-headline text-[10px] text-white/80 mt-2 tracking-widest uppercase">RANK: {rank}</p>
        </div>
        
        <div className="p-8 space-y-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Accuracy</p>
              <p className="text-3xl font-black font-code text-primary">{sessionAccuracy}%</p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <Timer className="h-5 w-5 text-orange-500 mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Duration</p>
              <p className="text-3xl font-black font-code text-orange-500">{elapsed}S</p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <Flame className="h-5 w-5 text-accent mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Max Combo</p>
              <p className="text-3xl font-black font-code text-accent">{sessionStats.maxCombo}</p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-[1.5rem] border-4 border-black ink-shadow-sm flex flex-col items-center">
              <Target className="h-5 w-5 text-success mb-2" />
              <p className="text-[9px] font-headline text-muted-foreground uppercase">Success</p>
              <p className="text-3xl font-black font-code text-success">{sessionStats.correct}</p>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem} initial="hidden" animate="show">
            <Button asChild size="lg" className="w-full h-20 font-headline text-xs bg-primary text-primary-foreground border-4 border-black ink-shadow-lg hover:-translate-y-2 transition-all">
              <Link href="/">RETURN TO DRAWER</Link>
            </Button>
          </motion.div>
        </div>
      </UICard>
    </motion.div>
  );
}
