'use client';

import type { Card as CardType } from '@/lib/domain/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getImage } from '@/lib/data/image-cache';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash2, Edit, Copy, Image as ImageIcon, Maximize2, Sparkles, Zap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useDeckStore } from '@/lib/store/useDeckStore';
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
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CardEditor } from './card-editor';

export function DeckCard({ card }: { card: CardType }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const { deleteCard, addCard } = useDeckStore(state => ({
        deleteCard: state.deleteCard,
        addCard: state.addCard,
    }));
    const { toast } = useToast();

    useEffect(() => {
        let objectUrl: string | null = null;
        let isCancelled = false;
        
        setImageUrl(null);
        setIsLoading(true);

        if (card.imageUrl) {
            setImageUrl(card.imageUrl);
            setIsLoading(false);
        } else if (card.imageKey) {
            getImage(card.imageKey).then(blob => {
                if (!isCancelled && blob) {
                    objectUrl = URL.createObjectURL(blob);
                    setImageUrl(objectUrl);
                }
            }).finally(() => {
                if (!isCancelled) setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }

        return () => {
            isCancelled = true;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [card.imageKey, card.imageUrl]);

    const handleDelete = () => {
        deleteCard(card.id);
        toast({ title: "Archival Purge Complete", description: `"${card.portuguese}" has been removed.` });
    };

    const handleDuplicate = () => {
        const { id, createdAt, lastReviewed, ...rest } = card;
        addCard({ ...rest, portuguese: `${rest.portuguese} (Clone)` });
        toast({ title: "Neural Clone Manifested" });
    };

    return (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            {/* TCG Collectible Card Aesthetic */}
            <Card className="flex flex-col overflow-hidden group border-8 border-black relative transition-all duration-300 hover:scale-[1.05] hover:-rotate-1 ink-shadow-lg rounded-[2rem] bg-card h-full">
                {/* Interval Badge (Power Level) */}
                <div className="absolute top-4 right-4 z-20 flex flex-col items-center justify-center bg-accent text-accent-foreground px-3 py-1 border-4 border-black font-code text-[10px] font-black ink-shadow-sm rotate-6 group-hover:rotate-0 transition-transform">
                    <span className="text-[6px] uppercase opacity-70">INT</span>
                    {card.interval}D
                </div>

                <CardHeader className="p-4 flex-row items-center justify-between border-b-4 border-black bg-primary/10 min-h-[80px]">
                    <div className="flex flex-col gap-1 overflow-hidden flex-1">
                        <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-primary animate-pulse" />
                            <span className="text-[7px] font-headline text-muted-foreground uppercase tracking-widest">Neural Cartridge</span>
                        </div>
                        <CardTitle className="font-headline text-[10px] md:text-[12px] text-primary leading-tight break-words uppercase">
                            {card.portuguese}
                        </CardTitle>
                    </div>
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 hover:bg-transparent border-2 border-black rounded-lg transition-transform active:scale-90">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-4 border-black shadow-[10px_10px_0px_black] rounded-xl bg-background">
                                <DialogTrigger asChild>
                                    <DropdownMenuItem className="p-4 cursor-pointer">
                                        <Edit className="mr-3 h-4 w-4" />
                                        <span className="font-headline text-[9px]">REVISE CARD</span>
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuItem onSelect={handleDuplicate} className="p-4 cursor-pointer">
                                    <Copy className="mr-3 h-4 w-4" />
                                    <span className="font-headline text-[9px]">MANIFEST CLONE</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-black/10 h-1" />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-4 text-destructive cursor-pointer">
                                            <Trash2 className="mr-3 h-4 w-4" />
                                            <span className="font-headline text-[9px]">PURGE ARCHIVE</span>
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="border-4 border-black shadow-[15px_15px_0px_black] rounded-[2rem]">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="font-headline text-2xl uppercase">Destroy Card?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-xl font-serif italic text-muted-foreground">
                                                This action is permanent. Neural bridge will be destroyed.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="mt-10 gap-4">
                                            <AlertDialogCancel className="border-4 border-black h-14 font-headline text-[10px]">ABORT</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete} variant="destructive" className="border-4 border-black h-14 font-headline text-[10px]">PURGE NOW</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                
                <DialogTrigger asChild>
                    <CardContent className="p-4 flex-grow cursor-pointer relative group/content bg-muted/5">
                        {/* Illustration Window */}
                        <div className="aspect-[4/5] w-full bg-secondary/5 border-4 border-black flex items-center justify-center overflow-hidden rounded-xl shadow-inner transition-all duration-500 group-hover/content:shadow-xl relative">
                            {isLoading ? (
                                <Skeleton className="w-full h-full" />
                            ) : imageUrl ? (
                                <Image 
                                    src={imageUrl} 
                                    alt={card.mnemonic} 
                                    width={400} 
                                    height={500} 
                                    className="object-cover w-full h-full transition-all duration-700 group-hover/content:scale-110" 
                                    unoptimized={true}
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 opacity-20 group-hover/content:opacity-40 transition-opacity">
                                    <ImageIcon className="w-16 h-16" />
                                    <span className="font-headline text-[8px] uppercase">No Vision Signal</span>
                                </div>
                            )}
                            {/* Rare Card Shine/Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover/content:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    </CardContent>
                </DialogTrigger>

                <CardFooter className="p-4 border-t-4 border-black bg-muted/20 flex flex-col items-center justify-center gap-2 min-h-[90px]">
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-black px-4 py-2 w-full rounded-lg ink-shadow-sm transform -rotate-1 group-hover:rotate-0 transition-transform">
                        <div className="flex items-center gap-1 text-muted-foreground opacity-50 mb-0.5 justify-center">
                            <Sparkles className="h-2 w-2" />
                            <span className="font-headline text-[5px] uppercase tracking-widest">Move: Translation</span>
                        </div>
                        <p className="font-serif text-sm text-card-foreground font-black italic leading-tight text-center">
                            {card.english}
                        </p>
                    </div>
                    {/* Flavor Text / Mnemonic Snippet */}
                    <div className="w-full text-center px-2">
                        <p className="font-serif text-[8px] text-muted-foreground italic line-clamp-2 leading-tight">
                            {card.mnemonic}
                        </p>
                    </div>
                </CardFooter>
            </Card>

            <DialogContent className="max-w-6xl w-[98vw] h-[95vh] md:h-[90vh] overflow-hidden p-0 border-8 border-black shadow-2xl bg-background rounded-[3rem] dialog-zoom">
                <DialogHeader className="sr-only">
                    <DialogTitle>Edit Card: {card.portuguese}</DialogTitle>
                    <DialogDescription>Modify the card details, mnemonics, and visual signal.</DialogDescription>
                </DialogHeader>
                <div className="h-full overflow-y-auto">
                    <CardEditor cardId={card.id} onComplete={() => setIsDetailOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
