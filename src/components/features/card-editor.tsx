'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDeckStore } from '@/lib/store/useDeckStore';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { getGeneratedImagePromptAction, getRemixedMnemonic, getCardSuggestionsAction } from '@/app/_actions/generation';
import { RefreshCw, Bot, ImageIcon, Loader2, Save, Search, Wand2, X, LayoutGrid, Info, Sparkles, BookOpen, Quote, Palette } from 'lucide-react';
import Image from 'next/image';
import { getProvider } from '@/lib/image-providers';
import { setImage, getImage } from '@/lib/data/image-cache';
import { PageHeader } from '../page-header';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NeuralSketch } from './neural-sketch';

const cardFormSchema = z.object({
  id: z.string(),
  portuguese: z.string().min(1, 'Portuguese word is required.'),
  english: z.string().min(1, 'English translation is required.'),
  pronunciation: z.string().optional(),
  mnemonic: z.string().min(10, 'Mnemonic story must be at least 10 characters.'),
  deckId: z.string().min(1, 'Please select a deck.'),
  imagePrompt: z.string().optional(),
  imageKey: z.string().optional(),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

export function CardEditor({ cardId, onComplete }: { cardId: string, onComplete?: () => void }) {
  const router = useRouter();
  const { toast } = useToast();
  const { getCard, updateCard, decks } = useDeckStore();
  const { stylePreset, imageProvider: providerId, providerSettings } = useSettingsStore();

  const card = getCard(cardId);

  const [isPending, startTransition] = useTransition();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isSketchDialogOpen, setIsSketchDialogOpen] = useState(false);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: card || {
        id: '',
        portuguese: '',
        english: '',
        pronunciation: '',
        mnemonic: '',
        deckId: '',
        imagePrompt: '',
        imageKey: '',
    },
  });

  useEffect(() => {
    if (card) {
      form.reset(card);
      if (card.imageKey) {
        getImage(card.imageKey).then(blob => {
            if(blob) {
                const objectUrl = URL.createObjectURL(blob);
                setGeneratedImage(objectUrl);
            }
        })
      } else if(card.imageUrl) {
        setGeneratedImage(card.imageUrl);
      }
    }
  }, [card, form]);

  const handleMagicAssist = async (specificText?: string) => {
    const text = specificText || form.getValues('portuguese') || form.getValues('english');
    if (!text || text.length < 2) {
      toast({ variant: 'destructive', title: "Input Required", description: "Enter a word first!" });
      return;
    }
    startTransition(async () => {
      const { suggestions, error } = await getCardSuggestionsAction(text);
      if (error) {
        toast({ variant: 'destructive', title: "Sync Failed", description: error });
      } else if (suggestions) {
        form.setValue('portuguese', suggestions.portuguese);
        form.setValue('english', suggestions.english);
        form.setValue('pronunciation', suggestions.pronunciation);
        form.setValue('mnemonic', suggestions.mnemonic);
        toast({ title: "Neural Link Re-established", description: "Archival data refreshed." });
      }
    });
  };

  const handleRemixMnemonic = async () => {
    const mnemonic = form.getValues('mnemonic');
    if (!mnemonic) return;
    startTransition(async () => {
      const { remixedMnemonic, error } = await getRemixedMnemonic(mnemonic, form.getValues('portuguese'), form.getValues('english'));
      if (error) {
        toast({ variant: 'destructive', title: "Remix Failed", description: error });
      } else if (remixedMnemonic) {
        form.setValue('mnemonic', remixedMnemonic);
        toast({ title: "Memory Story Remixed", description: "Narrative bridge updated." });
      }
    });
  };

  const handleGeneratePrompt = async () => {
    const mnemonic = form.getValues('mnemonic');
    if (!mnemonic) return;
    startTransition(async () => {
      const { imagePrompt, error } = await getGeneratedImagePromptAction(mnemonic, stylePreset);
      if (error) {
        toast({ variant: 'destructive', title: "Prompt Failed", description: error });
      } else if (imagePrompt) {
        form.setValue('imagePrompt', imagePrompt);
        toast({ title: "Directive Updated", description: "Ready to regenerate visual signal." });
      }
    });
  };

  const handleScavengePlaceholder = () => {
    const word = form.getValues('portuguese') || form.getValues('english') || 'placeholder';
    const seed = word.length + Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/seed/${seed}/512/512`;
    setGeneratedImage(url);
    form.setValue('imageKey', '');
    toast({ title: "Vision Scavenged!", description: `Updated visual link for "${word}".` });
  };

  const handleSketchSave = async (blob: Blob) => {
    const key = `sketch-${Date.now()}`;
    await setImage(key, blob);
    form.setValue('imageKey', key);
    setGeneratedImage(URL.createObjectURL(blob));
    setIsSketchDialogOpen(false);
    toast({ title: "Sketch Integrated!" });
  };

  const onSubmit = (data: CardFormValues) => {
    if (!card) return;
    updateCard({ ...card, ...data });
    toast({
      title: 'Drawer Updated',
      description: `"${data.portuguese}" saved to archive.`,
    });
    if (onComplete) {
        onComplete();
    } else {
        router.push(`/deck/${data.deckId}`);
    }
  };
  
  const handleGenerateImage = async () => {
    const imagePrompt = form.getValues('imagePrompt');
    if (!imagePrompt) {
        toast({ variant: 'destructive', title: "No Directive", description: "Generate visual specs first." });
        return;
    }

    const provider = getProvider(providerId);
    if (!provider) {
        toast({ variant: 'destructive', title: "Visual Engine Out", description: "Selected provider unavailable." });
        return;
    }

    const settings = providerSettings[providerId] || {};
    const validationErrors = provider.validate(settings);
    if (validationErrors.length > 0) {
        toast({ variant: 'destructive', title: "Setup Required", description: validationErrors[0] });
        return;
    }
    
    setIsGeneratingImage(true);
    setGeneratedImage(null);

    try {
        const result = await provider.generateImage({
            prompt: imagePrompt,
            stylePreset,
            size: { width: 512, height: 512 },
            apiKey: settings.apiKey,
            apiBaseUrl: settings.apiBaseUrl,
        });

        if (result.blob) {
            await setImage(result.cacheKey, result.blob);
            form.setValue('imageKey', result.cacheKey);
            
            const objectUrl = URL.createObjectURL(result.blob);
            setGeneratedImage(objectUrl);
            
            toast({ title: "Vision Materialized", description: "Stored for offline sync." });
        } else if (result.imageUrl) {
            setGeneratedImage(result.imageUrl);
            toast({ title: "Remote Vision Set", description: "Signal live." });
        }
    } catch(error: any) {
        toast({ variant: 'destructive', title: "Generation Failed", description: error.message });
    } finally {
        setIsGeneratingImage(false);
    }
  }

  if (!card) {
      return (
          <div className="text-center py-20 flex flex-col items-center justify-center h-full blueprint-bg">
            <X className="h-24 w-24 text-destructive mb-6 animate-pulse" />
            <PageHeader title="Memory Purged" description="The target card is no longer in the station database." />
            <Button asChild size="lg" className="mt-12 border-4 border-black ink-shadow-lg">
                <Link href="/">Return to Drawer</Link>
            </Button>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full blueprint-bg p-4 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-6">
            <div className="bg-primary p-4 rounded-2xl border-4 border-black ink-shadow-sm transform -rotate-3">
                <LayoutGrid className="text-white h-8 w-8" />
            </div>
            <div className="space-y-1">
                <span className="text-[10px] font-headline text-primary uppercase tracking-[0.2em]">Archival Revision Stage</span>
                <h1 className="text-3xl md:text-5xl font-headline tracking-tighter text-shadow uppercase">{card.portuguese}</h1>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Button 
                type="button" 
                variant="accent" 
                className="border-4 border-black hidden md:flex h-14 hover:scale-105"
                onClick={() => handleMagicAssist()}
                disabled={isPending}
            >
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                <span className="font-headline text-[10px]">MAGIC ASSIST</span>
            </Button>
            {onComplete && (
                <Button variant="ghost" size="icon" onClick={onComplete} className="h-14 w-14 border-4 border-black hover:bg-destructive hover:text-white transition-colors">
                    <X className="h-8 w-8" />
                </Button>
            )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-10">
          <Tabs defaultValue="front" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-16 border-4 border-black p-0 overflow-hidden mb-10 rounded-2xl ink-shadow-sm">
                <TabsTrigger value="front" className="h-full font-headline text-[10px] sm:text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-r-4 border-black transition-all">
                    FRONT: MNEMONIC ARCHIVE
                </TabsTrigger>
                <TabsTrigger value="back" className="h-full font-headline text-[10px] sm:text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none transition-all">
                    BACK: LINGUISTIC TARGET
                </TabsTrigger>
            </TabsList>

            <TabsContent value="front" className="mt-0 focus-visible:ring-0 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <UICard noHover className="border-4 border-black ink-shadow-lg bg-card/60 backdrop-blur-xl rounded-[2rem]">
                            <CardContent className="p-8 space-y-8">
                                <div className="flex items-center gap-3 text-primary">
                                    <Quote className="h-6 w-6" />
                                    <h3 className="font-headline text-xs uppercase tracking-widest">Cognitive Blueprint</h3>
                                </div>
                                <FormField control={form.control} name="mnemonic" render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between mb-3">
                                            <FormLabel className="text-[10px] font-headline text-muted-foreground uppercase">Memory Narrative</FormLabel>
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 text-[10px] text-accent font-bold hover:bg-accent/10"
                                                onClick={handleRemixMnemonic}
                                                disabled={isPending}
                                            >
                                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                                                REMIX STORY
                                            </Button>
                                        </div>
                                        <FormControl><Textarea {...field} rows={8} className="text-xl border-4 border-black italic font-serif leading-relaxed rounded-2xl bg-white/50" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="p-6 bg-primary/5 border-4 border-black border-dashed rounded-2xl flex items-start gap-4">
                                    <Info className="h-6 w-6 text-primary shrink-0" />
                                    <div className="space-y-1">
                                        <p className="font-headline text-[8px] uppercase">Magnetic Memory Protocol</p>
                                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                                            "Make the story VIVID, ABSURD, and ACTION-ORIENTED. Imagine it happening in a specific bizarre location."
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </UICard>

                        <FormField control={form.control} name="deckId" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-headline text-xs uppercase text-muted-foreground mb-3 block">Repository Assignment</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-16 text-lg border-4 border-black bg-white rounded-2xl ink-shadow-sm font-bold">
                                            <SelectValue placeholder="Select a repository" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border-4 border-black rounded-xl">
                                        {decks.map(deck => (
                                            <SelectItem key={deck.id} value={deck.id} className="font-medium py-3">{deck.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <div className="space-y-8">
                        <UICard noHover className="border-4 border-black ink-shadow-lg overflow-hidden rounded-[2.5rem]">
                            <CardContent className="p-0">
                                <div className="aspect-square w-full bg-secondary/5 flex items-center justify-center relative shadow-inner group">
                                    {isGeneratingImage ? (
                                        <div className="flex flex-col items-center gap-6">
                                            <Loader2 className="h-16 w-16 animate-spin text-primary" strokeWidth={3} />
                                            <p className="font-headline text-xs animate-pulse tracking-widest uppercase">Projecting Archival Vision...</p>
                                        </div>
                                    ) : generatedImage ? (
                                        <Image src={generatedImage} alt="Preview" fill className="object-cover" unoptimized={generatedImage.startsWith('blob:')} />
                                    ) : (
                                        <div className="text-center p-12 opacity-30">
                                            <ImageIcon className="h-24 w-24 mx-auto mb-6" />
                                            <p className="font-headline text-xs uppercase tracking-tighter">No Visual Signal</p>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 border-t-4 border-black bg-muted/20 space-y-6">
                                    <FormField control={form.control} name="imagePrompt" render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between mb-3">
                                                <FormLabel className="font-headline text-[9px] text-muted-foreground uppercase">Artist Specs</FormLabel>
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-7 text-[9px] font-bold hover:bg-primary/10"
                                                    onClick={handleGeneratePrompt}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                                                    DESCRIBE
                                                </Button>
                                            </div>
                                            <FormControl><Textarea {...field} rows={3} className="font-code text-xs border-4 border-black bg-white rounded-xl" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button type="button" variant="secondary" className="h-16 border-4 border-black ink-shadow-sm font-headline text-[8px] rounded-xl p-1" onClick={handleGenerateImage} disabled={isGeneratingImage}>
                                            <ImageIcon className="h-4 w-4"/> AI SUMMON
                                        </Button>
                                        <Dialog open={isSketchDialogOpen} onOpenChange={setIsSketchDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button type="button" variant="outline" className="h-16 border-4 border-black ink-shadow-sm bg-white font-headline text-[8px] rounded-xl p-1">
                                                    <Palette className="h-4 w-4" /> SKETCH
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-3xl w-[95vw] border-8 border-black shadow-2xl rounded-[3rem] p-0 overflow-hidden">
                                                <DialogHeader className="p-6 bg-primary border-b-4 border-black">
                                                    <DialogTitle className="text-white uppercase font-headline">Revision Sketch Station</DialogTitle>
                                                </DialogHeader>
                                                <div className="p-4 bg-muted/20">
                                                    <NeuralSketch onSave={handleSketchSave} />
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <Button type="button" variant="outline" className="h-16 border-4 border-black ink-shadow-sm bg-white font-headline text-[8px] rounded-xl p-1" onClick={handleScavengePlaceholder}>
                                            <Search className="h-4 w-4" /> SCAVENGE
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </UICard>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="back" className="mt-0 focus-visible:ring-0 outline-none">
                <div className="max-w-3xl mx-auto space-y-10">
                    <UICard noHover className="border-4 border-black ink-shadow-lg overflow-hidden bg-primary/5 rounded-[2.5rem]">
                        <div className="bg-primary p-8 border-b-4 border-black relative overflow-hidden">
                             <div className="absolute inset-0 blueprint-bg opacity-20" />
                             <h2 className="font-headline text-3xl text-white text-shadow relative z-10">ARCHIVAL TARGETS</h2>
                        </div>
                        <CardContent className="p-10 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <FormField control={form.control} name="portuguese" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-headline text-xs uppercase text-primary mb-3 block">Portuguese Original</FormLabel>
                                        <div className="relative group">
                                          <FormControl>
                                            <Input {...field} className="h-20 text-3xl font-bold border-4 border-black ink-shadow-sm rounded-2xl px-6 bg-white pr-14" />
                                          </FormControl>
                                          <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon" 
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 text-primary hover:bg-primary/20"
                                            onClick={() => handleMagicAssist(field.value)}
                                            disabled={isPending}
                                          >
                                            <Sparkles className={cn("h-6 w-6", isPending && "animate-spin")} />
                                          </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="english" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-headline text-xs uppercase text-accent mb-3 block">English Translation</FormLabel>
                                        <div className="relative group">
                                          <FormControl>
                                            <Input {...field} className="h-20 text-3xl font-bold border-4 border-black ink-shadow-sm rounded-2xl px-6 bg-white pr-14" />
                                          </FormControl>
                                          <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon" 
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 text-accent hover:bg-accent/20"
                                            onClick={() => handleMagicAssist(field.value)}
                                            disabled={isPending}
                                          >
                                            <Sparkles className={cn("h-6 w-6", isPending && "animate-spin")} />
                                          </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name="pronunciation" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-headline text-xs uppercase text-muted-foreground mb-3 block">Phonetic Matrix Key</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g. /fa-lar/" className="h-16 text-xl border-4 border-black font-code bg-white rounded-2xl px-6" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                    </UICard>

                    <div className="bg-yellow-400 p-8 border-4 border-black ink-shadow-sm flex items-center gap-6 rounded-[2rem] transform rotate-1">
                        <Quote className="h-10 w-10 text-black shrink-0" />
                        <div className="space-y-2">
                            <p className="font-headline text-[10px] uppercase">Linguistic Scaffolding</p>
                            <p className="text-sm italic font-serif leading-relaxed font-bold">"Never struggle to remember; let the logic and vivid absurdity build the memory for you."</p>
                        </div>
                    </div>
                </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-end gap-6 py-10 border-t-8 border-black border-double">
              <Button type="button" variant="outline" size="lg" className="h-20 px-10 font-headline text-[10px] border-4 border-black bg-white ink-shadow-sm rounded-2xl hover:bg-destructive hover:text-white transition-colors" asChild onClick={onComplete}>
                  {onComplete ? <span>ABORT DRAWER EDITS</span> : <Link href={`/deck/${card.deckId}`}>ABORT REVISION</Link>}
              </Button>
              <Button type="submit" size="lg" className="h-20 px-14 font-headline text-xs bg-primary text-primary-foreground border-4 border-black ink-shadow-lg rounded-2xl hover:-translate-y-2 hover:bg-accent transition-all group">
                <Save className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform"/>
                COMMIT TO DRAWER
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}