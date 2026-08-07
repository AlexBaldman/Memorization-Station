'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { buttonPopVariants } from '@/lib/design/animations';

interface AnswerControlsProps {
  isVisible: boolean;
  onAnswer: (gotIt: boolean) => void;
}

export function AnswerControls({ isVisible, onAnswer }: AnswerControlsProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 w-full gap-6 transition-all duration-500 transform max-w-md mx-auto",
      isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
    )}>
      <motion.div variants={buttonPopVariants} initial="initial" whileHover="hover" whileTap="tap">
        <Button
            variant="destructive"
            size="lg"
            className="w-full h-24 font-headline text-[10px] border-4 border-black ink-shadow-lg rounded-[1.5rem] group relative"
            onClick={(e) => {
              e.stopPropagation();
              onAnswer(false);
            }}
        >
            <div className="flex flex-col items-center gap-2">
              <ThumbsDown className="w-8 h-8" />
              <span className="font-black uppercase">Forget</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/20 text-white px-2 py-0.5 rounded text-[8px] font-code hidden md:block">← / 1</div>
        </Button>
      </motion.div>
      <motion.div variants={buttonPopVariants} initial="initial" whileHover="hover" whileTap="tap">
        <Button
            size="lg"
            variant="success"
            className="w-full h-24 font-headline text-[10px] border-4 border-black ink-shadow-lg rounded-[1.5rem] group relative"
            onClick={(e) => {
              e.stopPropagation();
              onAnswer(true);
            }}
        >
            <div className="flex flex-col items-center gap-2">
              <ThumbsUp className="w-8 h-8" />
              <span className="font-black uppercase">Synced</span>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/20 text-white px-2 py-0.5 rounded text-[8px] font-code hidden md:block">→ / 2</div>
        </Button>
      </motion.div>
    </div>
  );
}
