'use client';

import { useDeckStore } from '@/lib/store/useDeckStore';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Download, Upload, Trash2, Search, RotateCcw, LayoutGrid, SlidersHorizontal, Package, LayoutList, GripHorizontal } from 'lucide-react';
import { DeckCard } from './deck-card';
import { Input } from '@/components/ui/input';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


export function DeckManager({ deckId }: { deckId: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const { getDeck, getCardsInDeck, deleteDeck, importDeck, exportDeck, resetDeckProgress } = useDeckStore(state => ({
        getDeck: state.getDeck,
        getCardsInDeck: state.getCardsInDeck,
        deleteDeck: state.deleteDeck,
        importDeck: state.importDeck,
        exportDeck: state.exportDeck,
        resetDeckProgress: state.resetDeckProgress,
    }));
    const fileInputRef = useRef<HTMLInputElement>(null);

    const deck = getDeck(deckId);
    const allCards = useMemo(() => getCardsInDeck(deckId), [getCardsInDeck, deckId]);

    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
    
    const filteredCards = useMemo(() => {
        if (!searchTerm) return allCards;
        const lowercasedTerm = searchTerm.toLowerCase();
        return allCards.filter(card => 
            card.portuguese.toLowerCase().includes(lowercasedTerm) ||
            card.english.toLowerCase().includes(lowercasedTerm) ||
            card.mnemonic.toLowerCase().includes(lowercasedTerm)
        );
    }, [allCards, searchTerm]);

    const handleExport = () => {
        if (!deck) return;
        try {
            const jsonString = exportDeck(deckId);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${deck.name.replace(/\s+/g, '_')}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast({ title: "Archive Extracted", description: `"${deck.name}" has been exported as a neural JSON data stream.`});
        } catch (e: any) {
            console.error("Export Failed", e);
            toast({ variant: 'destructive', title: "Extraction Failed", description: e.message });
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = event.target?.result as string;
                    importDeck(json);
                    toast({ title: "Archive Integrated", description: "The external neural data has been successfully merged into your station." });
                } catch (e: any) {
                     console.error("Integration Failed", e);
                     toast({ variant: 'destructive', title: "Integration Failed", description: e.message });
                }
            };
            reader.onerror = () => {
                 toast({ variant: 'destructive', title: "Read Error", description: "Could not decode the neural data stream." });
            }
            reader.readAsText(file);
        }
        if(e.target) e.target.value = '';
    };

    const handleDeleteDeck = () => {
        if (!deck) return;
        deleteDeck(deckId);
        toast({ title: "Deck Purged", description: `The archival unit "${deck.name}" has been permanently removed.` });
        router.push('/');
    };

    const handleResetProgress = () => {
        resetDeckProgress(deckId);
        toast({ title: "Neural Paths Reset", description: `Spaced-repetition data for "${deck?.name}" has been cleared.` });
    };

    if (!deck) {
        return (
            <div className="flex flex-col items-center justify-center py-40 blueprint-bg h-full">
                <Package className="h-24 w-24 text-muted-foreground mb-6 opacity-20" />
                <PageHeader title="Archive Empty" description="The repository you are attempting to access is either empty or does not exist in the station database."/>
                <Button asChild size="lg" className="mt-8 border-4 border-black ink-shadow-lg">
                    <Link href="/">Return to Vault</Link>
                </Button>
            </div>
        );
    }
    
    return (
        <div className="pb-32 blueprint-bg min-h-screen p-4 md:p-8">
            <div className="flex flex-col xl:flex-row items-start justify-between gap-10 mb-12">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                        <Link href="/" className="p-3 border-2 border-black hover:bg-accent transition-colors rounded-xl bg-white shadow-sm active:translate-y-1">
                            <ArrowLeft className="h-7 w-7 text-black" />
                        </Link>
                        <span className="font-headline text-[10px] text-primary uppercase tracking-[0.2em]">Archival Management Console</span>
                    </div>
                    <div className="p-8 border-4 border-black ink-shadow-sm deck-header rounded-2xl">
                         <h1 className="text-2xl md:text-4xl lg:text-5xl font-headline tracking-tighter uppercase mb-2 break-words leading-tight">
                             {deck.name}
                         </h1>
                         <p className="text-xl font-serif italic opacity-80">{deck.description}</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-4 w-full xl:w-auto self-end">
                    <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" onClick={handleExport} className="h-16 border-4 border-black rounded-2xl ink-shadow-sm flex-1 font-headline text-[9px] px-8 bg-white text-black">
                            <Download className="mr-2 h-5 w-5" /> EXPORT
                        </Button>
                        <Button variant="outline" onClick={handleImportClick} className="h-16 border-4 border-black rounded-2xl ink-shadow-sm flex-1 font-headline text-[9px] px-8 bg-white text-black">
                            <Upload className="mr-2 h-5 w-5" /> IMPORT
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="secondary" className="h-16 border-4 border-black bg-yellow-400 text-black rounded-2xl ink-shadow-sm flex-1 font-headline text-[9px] px-8">
                                    <RotateCcw className="mr-2 h-5 w-5" /> RESET
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-4 border-black rounded-[2rem] shadow-2xl">
                                <AlertDialogHeader>
                                <AlertDialogTitle className="font-headline text-2xl tracking-tighter">RESET NEURAL PATHS?</AlertDialogTitle>
                                <AlertDialogDescription className="text-xl font-serif italic leading-relaxed">
                                    This will wipe all spaced-repetition data for "{deck.name}". Every card will return to a "New" state and be due immediately.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-10">
                                <AlertDialogCancel className="border-4 border-black h-14 font-headline text-[10px] rounded-xl">ABORT</AlertDialogCancel>
                                <AlertDialogAction onClick={handleResetProgress} className="border-4 border-black h-14 font-headline text-[10px] rounded-xl ink-shadow-sm">
                                    CONFIRM RESET
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="h-16 border-4 border-black rounded-2xl ink-shadow-sm flex-1 font-headline text-[9px] px-8">
                                    <Trash2 className="mr-2 h-5 w-5"/> DELETE
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-4 border-black rounded-[2rem] shadow-2xl">
                                <AlertDialogHeader>
                                <AlertDialogTitle className="font-headline text-2xl tracking-tighter text-destructive">INITIATE DECK PURGE?</AlertDialogTitle>
                                <AlertDialogDescription className="text-xl font-serif italic leading-relaxed">
                                    You are about to permanently destroy this deck and all {allCards.length} associated cards. This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-10">
                                <AlertDialogCancel className="border-4 border-black h-14 font-headline text-[10px] rounded-xl">CANCEL</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteDeck} variant="destructive" className="border-4 border-black h-14 font-headline text-[10px] rounded-xl ink-shadow-sm">
                                    PURGE ARCHIVE
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
                </div>
            </div>

            <div className="mb-12 flex flex-col lg:flex-row items-center justify-between gap-8 bg-card/60 p-6 border-4 border-black rounded-[2.5rem] ink-shadow-lg backdrop-blur-md">
                 <div className="flex items-center gap-4 w-full lg:max-w-xl">
                    <div className="relative flex-grow group">
                        <Input 
                            placeholder="Search archival data..." 
                            className="pl-14 border-4 border-black h-16 text-lg rounded-2xl bg-white focus-visible:ring-accent shadow-inner text-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Search className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="flex gap-2 border-4 border-black rounded-2xl p-1 bg-white shrink-0">
                        <Button 
                            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                            size="icon" 
                            className={cn("h-12 w-12 border-0 shadow-none", viewMode === 'grid' && "bg-primary text-white")}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="h-6 w-6" />
                        </Button>
                        <Button 
                            variant={viewMode === 'carousel' ? 'default' : 'ghost'} 
                            size="icon" 
                            className={cn("h-12 w-12 border-0 shadow-none", viewMode === 'carousel' && "bg-primary text-white")}
                            onClick={() => setViewMode('carousel')}
                        >
                            <GripHorizontal className="h-6 w-6" />
                        </Button>
                    </div>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <Button asChild size="lg" className="h-16 px-10 border-4 border-black bg-primary rounded-2xl ink-shadow-lg hover:-translate-y-1 transition-all group flex-1">
                        <Link href={`/practice?deckId=${deckId}`}>
                            <LayoutGrid className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                            <span className="font-headline text-xs">PRACTICE DUE</span>
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-16 px-10 border-4 border-black bg-white text-black rounded-2xl ink-shadow-lg hover:-translate-y-1 transition-all group flex-1">
                        <Link href="/create">
                            <PlusCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                            <span className="font-headline text-xs">NEW MEMORY</span>
                        </Link>
                    </Button>
                 </div>
            </div>
            
            {filteredCards.length > 0 ? (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                            {filteredCards.map(card => (
                                <div key={card.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${Math.random() * 200}ms` }}>
                                    <DeckCard card={card} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto px-4">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {filteredCards.map(card => (
                                        <CarouselItem key={card.id} className="p-4 flex items-center justify-center">
                                            <div className="w-full max-w-[320px]">
                                                <DeckCard card={card} />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="hidden md:block">
                                    <CarouselPrevious className="h-16 w-16 border-4 border-black shadow-lg" />
                                    <CarouselNext className="h-16 w-16 border-4 border-black shadow-lg" />
                                </div>
                                <div className="mt-8 flex justify-center gap-2 md:hidden">
                                     <span className="font-headline text-[10px] uppercase text-muted-foreground bg-white/50 px-4 py-2 rounded-full border-2 border-black italic">
                                         Swipe to explore archive
                                     </span>
                                </div>
                            </Carousel>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-32 border-8 border-dashed border-black/10 rounded-[3rem] bg-muted/5 flex flex-col items-center justify-center">
                    <Search className="h-20 w-20 text-muted-foreground/20 mb-6" />
                    <h3 className="text-3xl font-headline text-muted-foreground tracking-tighter">ARCHIVAL VOID</h3>
                    <p className="text-muted-foreground mt-4 font-serif italic text-xl max-w-md">
                        {searchTerm ? `No neural entries match the query "${searchTerm}".` : "This repository currently holds no memory cartridges."}
                    </p>
                    {searchTerm && (
                        <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4 font-headline text-[10px] text-primary underline">
                            Clear Frequency Search
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
