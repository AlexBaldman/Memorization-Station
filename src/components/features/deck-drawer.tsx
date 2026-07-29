'use client';

import { useDeckStore } from '@/lib/store/useDeckStore';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, BrainCircuit, CalendarClock, Plus, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';

export function DeckDrawer() {
  const { decks, getCardsInDeck, getDueCards, getDeckMastery } = useDeckStore(state => ({
    decks: state.decks,
    getCardsInDeck: state.getCardsInDeck,
    getDueCards: state.getDueCards,
    getDeckMastery: state.getDeckMastery,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <PageHeader
            title="Deck Drawer"
            description="Manage your repositories of logic. Every card is a neural anchor."
            className="mb-0 flex-1"
        />
        <Button asChild size="lg" variant="default" className="h-20 px-10 border-4 border-black ink-shadow-lg rounded-2xl shrink-0">
            <Link href="/create">
                <Plus className="mr-3 h-6 w-6" /> 
                CREATE CARDS
            </Link>
        </Button>
      </div>

      {decks.length === 0 ? (
        <Card noHover className="border-8 border-dashed border-black/10 bg-muted/5 shadow-none py-32 text-center rounded-[3rem]">
            <CardHeader className="space-y-6">
                <div className="bg-muted h-32 w-32 rounded-full border-4 border-black mx-auto flex items-center justify-center opacity-20">
                    <Book className="h-16 w-16" />
                </div>
                <CardTitle className="text-muted-foreground text-4xl font-headline tracking-tighter uppercase">DRAWER IS EMPTY</CardTitle>
                <CardDescription className="text-2xl font-serif italic max-w-md mx-auto">No decks detected in the station archive.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center mt-10">
                <Button asChild size="lg" className="h-20 px-12 border-4 border-black bg-primary rounded-2xl ink-shadow-lg text-xs">
                    <Link href="/create">CREATE INITIAL CARDS</Link>
                </Button>
            </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => {
            const cardsInDeck = getCardsInDeck(deck.id);
            const dueCards = getDueCards(deck.id);
            const totalCards = cardsInDeck.length;
            const mastery = getDeckMastery(deck.id);

            return (
              <Card key={deck.id} className="flex flex-col group border-4 border-black bg-card overflow-hidden rounded-[2.5rem] ink-shadow-lg transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_black]">
                <CardHeader className="deck-header h-52 flex flex-col justify-center p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                      <Zap className="h-20 w-20" />
                  </div>
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[8px] font-headline opacity-60 uppercase tracking-[0.3em] font-black">NEURAL REPOSITORY</span>
                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <CardTitle className="font-headline text-lg sm:text-xl tracking-tighter leading-tight break-words relative z-10 uppercase">
                    {deck.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-3 font-serif italic text-sm text-inherit opacity-80 relative z-10">
                    {deck.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-6 p-8 bg-muted/5 blueprint-bg">
                    <div className="flex items-center justify-between text-[10px] font-code">
                        <div className="flex items-center gap-3">
                            <Book className="h-5 w-5 text-primary" />
                            <span className="font-black">{totalCards} {totalCards === 1 ? 'CARD' : 'CARDS'}</span>
                        </div>
                        <span className="text-muted-foreground opacity-30 font-black">ID: {deck.id.slice(-8).toUpperCase()}</span>
                    </div>
                    
                    <div className="p-6 rounded-[1.5rem] border-4 border-black bg-white dark:bg-black/30 space-y-6 shadow-inner relative overflow-hidden">
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <CalendarClock className="h-5 w-5 text-orange-500" />
                                <span className="text-[10px] font-headline text-muted-foreground uppercase font-black">DUE FOR SYNC</span>
                            </div>
                            <span className={cn("font-code font-black text-2xl", dueCards.length > 0 ? "text-orange-500" : "text-success")}>{dueCards.length}</span>
                        </div>
                        <div className="space-y-3 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <BrainCircuit className="h-5 w-5 text-primary" />
                                    <span className="text-[10px] font-headline text-muted-foreground uppercase tracking-tighter font-black">MASTERY</span>
                                </div>
                                <span className="font-code font-black text-xl text-primary">{mastery}%</span>
                            </div>
                            <Progress value={mastery} className="h-4 border-2 border-black bg-muted/30 rounded-full overflow-hidden" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-8 border-t-4 border-black bg-muted/10 flex gap-4">
                  <Button asChild variant="default" className="flex-1 font-headline text-[10px] h-14 border-4 border-black ink-shadow-sm transition-all rounded-xl font-black uppercase">
                    <Link href={`/deck/${deck.id}`}>MANAGE</Link>
                  </Button>
                  <Button asChild className="flex-1 font-headline text-[10px] h-14 border-4 border-black bg-primary ink-shadow-sm transition-all rounded-xl font-black uppercase">
                    <Link href={`/practice?deckId=${deck.id}`}>PRACTICE</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}