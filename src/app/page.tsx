import { DeckDrawer } from '@/components/features/deck-drawer';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Zap, Play, Info, BookOpen, Star, LayoutGrid, PlusCircle, Dices } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-32">
      {/* Hero / Start Screen Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-[4rem] border-8 border-black ink-shadow-lg bg-primary/5 blueprint-bg mx-auto w-full max-w-7xl mt-4 animate-in fade-in zoom-in duration-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/70 pointer-events-none" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 animate-float opacity-20 hidden md:block">
            <Star className="h-24 w-24 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float opacity-20 hidden md:block" style={{ animationDelay: '3s' }}>
            <Zap className="h-32 w-32 text-accent fill-accent drop-shadow-lg" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center space-y-16 w-full max-w-5xl mx-auto py-12">
          <div className="flex flex-col items-center space-y-8 w-full px-2">
            <div className="inline-flex items-center gap-4 bg-black text-white px-10 py-4 rounded-full font-headline text-[11px] animate-pulse border-4 border-accent shadow-xl">
                <Zap className="h-5 w-5 text-[#d4ff00] fill-[#d4ff00]" />
                NEURAL LINK ACTIVE
            </div>
            
            <div className="relative group w-full flex justify-center py-6 px-10 overflow-visible">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-headline leading-[1.2] uppercase text-center w-full max-w-full tracking-tighter transition-all duration-500 group-hover:scale-105">
                    <span className="inline-block whitespace-nowrap text-shadow drop-shadow-[6px_6px_0_black] md:drop-shadow-[10px_10px_0_black] text-accent dark:text-primary">
                        MEMORIZATION
                    </span>
                    <br className="hidden sm:block" /> 
                    <span className="inline-block whitespace-nowrap text-shadow drop-shadow-[6px_6px_0_black] md:drop-shadow-[10px_10px_0_black] text-accent dark:text-primary">
                        STATION
                    </span>
                </h1>
            </div>

            <p className="text-xl md:text-4xl font-serif italic font-black text-muted-foreground mt-6 max-w-3xl text-center px-6 leading-relaxed animate-in slide-in-from-bottom-4 delay-500 duration-1000 fill-mode-both">
                "The most absurd way to conversational mastery."
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 w-full px-4 max-w-2xl mx-auto">
            <Button asChild size="lg" className="h-28 sm:h-32 w-full font-headline text-3xl sm:text-4xl bg-accent text-white border-8 border-black ink-shadow-lg hover:scale-105 active:scale-95 transition-all group rounded-[2.5rem] relative overflow-hidden shadow-[12px_12px_0px_black]">
                <Link href="#drawer">
                    <Play className="mr-8 h-12 w-12 fill-current group-hover:rotate-12 transition-transform" />
                    PRESS START
                </Link>
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              <Button asChild size="lg" variant="success" className="h-24 w-full font-headline text-xs border-6 border-black ink-shadow-sm hover:scale-105 hover:bg-accent hover:text-white active:bg-primary transition-all rounded-[1.5rem] group shadow-[6px_6px_0px_black]">
                  <Link href="#drawer" className="flex items-center justify-center">
                      <LayoutGrid className="mr-4 h-6 w-6 group-hover:rotate-12 transition-transform" />
                      DECK DRAWER
                  </Link>
              </Button>
              <Button asChild size="lg" variant="success" className="h-24 w-full font-headline text-xs border-6 border-black ink-shadow-sm hover:scale-105 hover:bg-accent hover:text-white active:bg-primary transition-all rounded-[1.5rem] group shadow-[6px_6px_0px_black]">
                  <Link href="/create" className="flex items-center justify-center">
                      <PlusCircle className="mr-4 h-6 w-6 group-hover:scale-125 transition-transform" />
                      CREATE CARDS
                  </Link>
              </Button>
            </div>
            <Button asChild variant="accent" size="lg" className="mt-5 min-h-16 w-full border-4 border-black rounded-2xl shadow-[6px_6px_0px_black]">
              <Link href="/pao"><Dices className="mr-3 h-6 w-6" /> ROLL//99 · PAO MEMORY LAB</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="max-w-6xl mx-auto w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-card p-10 border-8 border-black ink-shadow-sm rounded-[2.5rem] space-y-6 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="bg-primary h-20 w-20 rounded-2xl border-4 border-black flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                    <Brain className="text-white h-10 w-10" />
                </div>
                <h3 className="font-headline text-xl tracking-tighter uppercase">1. Discover</h3>
                <p className="text-xl leading-relaxed font-serif italic">
                    Use <strong>Magic Assist</strong> to build vivid, absurd stories that bridge English to Portuguese effortlessly.
                </p>
            </div>
            
            <div className="bg-card p-10 border-8 border-black ink-shadow-sm rounded-[2.5rem] space-y-6 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="bg-accent h-20 w-20 rounded-2xl border-4 border-black flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                    <Zap className="text-white h-10 w-10" />
                </div>
                <h3 className="font-headline text-xl tracking-tighter uppercase">2. Visualize</h3>
                <p className="text-xl leading-relaxed font-serif italic">
                    Summon <strong>AI Visions</strong> to cement the mnemonic into your visual cortex forever.
                </p>
            </div>

            <div className="bg-card p-10 border-8 border-black ink-shadow-sm rounded-[2.5rem] space-y-6 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="bg-success h-20 w-20 rounded-2xl border-4 border-black flex items-center justify-center -rotate-2 group-hover:rotate-0 transition-transform">
                    <Star className="text-white h-10 w-10" />
                </div>
                <h3 className="font-headline text-xl tracking-tighter uppercase">3. Master</h3>
                <p className="text-xl leading-relaxed font-serif italic">
                    Engage in <strong>Neural Sync Sessions</strong>. Spaced-repetition ensures you never forget a single card.
                </p>
            </div>
        </div>
      </section>

      {/* Main App Entry (The Drawer) */}
      <section id="drawer" className="scroll-mt-32 pt-12">
        <div className="flex items-center gap-6 mb-16 px-6 max-w-7xl mx-auto">
            <div className="h-2 bg-black flex-grow rounded-full opacity-20" />
            <div className="bg-black text-white font-headline text-[11px] px-8 py-3 rounded-full uppercase tracking-[0.2em] shadow-xl border-4 border-accent">
                Accessing Deck Drawer
            </div>
            <div className="h-2 bg-black flex-grow rounded-full opacity-20" />
        </div>
        <DeckDrawer />
      </section>

      {/* Footer Info */}
      <footer className="max-w-4xl mx-auto px-6 text-center space-y-10 pb-20 opacity-80">
          <div className="p-10 border-8 border-black border-dashed rounded-[3rem] bg-muted/20 backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:bg-muted/30">
            <Info className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h4 className="font-headline text-sm uppercase mb-6 tracking-widest">Linguistic Protocol</h4>
            <p className="text-2xl font-serif italic text-muted-foreground leading-relaxed font-black">
                "We don't study languages here. We inhabit them. Use logical building blocks and Magnetic Memory to build permanence."
            </p>
          </div>
          <p className="font-headline text-[9px] opacity-40 uppercase tracking-[0.5em] animate-pulse">
              V17.0 // Neural Engine Online // Optimized for High-Speed Memory
          </p>
      </footer>
    </div>
  );
}
