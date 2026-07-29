'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useRef } from 'react';

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
import { RefreshCw, Bot, ImageIcon, Loader2, Plus, Sparkles, Search, Wand2, Palette, Clock, Upload } from 'lucide-react';
import Image from 'next/image';
import { getProvider } from '@/lib/image-providers';
import { setImage } from '@/lib/data/image-cache';
import { NewDeckDialog } from './new-deck-dialog';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NeuralSketch } from './neural-sketch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const tenseSchema = z.object({
  eu: z.string(),
  voce: z.string(),
  nos: z.string(),
  eles: z.string(),
});

const conjugationMatrixSchema = z.object({
  present: tenseSchema,
  past: tenseSchema,
  future: tenseSchema,
});

const cardFormSchema = z.object({
  portuguese: z.string().min(1, 'Portuguese word is required.'),
  english: z.string().min(1, 'English translation is required.'),
  pronunciation: z.string().optional(),
  mnemonic: z.string().min(10, 'Mnemonic story must be at least 10 characters.'),
  deckId: z.string().min(1, 'Please select a deck.'),
  imagePrompt: z.string().optional(),
  imageKey: z.string().optional(),
  conjugations: conjugationMatrixSchema.optional(),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

export function CardCreator() {
  const router = useRouter();
  const { toast } = useToast();
  const { decks, addCard } = useDeckStore();
  const { stylePreset, imageProvider: providerId, providerSettings } = useSettingsStore();
  
  const [isPending, startTransition] = useTransition();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isNewDeckDialogOpen, setIsNewDeckDialogOpen] = useState(false);
  const [isSketchDialogOpen, setIsSketchDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      portuguese: '',
      english: '',
      pronunciation: '',
      mnemonic: '',
      deckId: decks[0]?.id || '',
      imagePrompt: '',
      imageKey: '',
      conjugations: undefined,
    },
  });

  const handleMagicAssist = async (specificText?: string) => {
    const text = specificText || form.getValues('portuguese') || form.getValues('english');
    if (!text || text.length < 2) {
      toast({ variant: 'destructive', title: "Input Required", description: "Type a word first!" });
      return;
    }

    startTransition(async () => {
      const { suggestions, error } = await getCardSuggestionsAction(text);
      if (error) {
        toast({ variant: 'destructive', title: "Assist Failed", description: error });
      } else if (suggestions) {
        form.setValue('portuguese', suggestions.portuguese);
        form.setValue('english', suggestions.english);
        form.setValue('pronunciation', suggestions.pronunciation);
        form.setValue('mnemonic', suggestions.mnemonic);
        if (suggestions.conjugations) {
            form.setValue('conjugations', suggestions.conjugations);
        }
        toast({ title: "Neural Link Synchronized!", description: "Card details and patterns populated." });
      }
    });
  };

  const handleRemixMnemonic = async () => {
    const mnemonic = form.getValues('mnemonic');
    if (!mnemonic) return;

    startTransition(async () => {
      const { remixedMnemonic, error } = await getRemixedMnemonic(
        mnemonic, 
        form.getValues('portuguese'), 
        form.getValues('english')
      );
      if (error) {
        toast({ variant: 'destructive', title: "Remix Failed", description: error });
      } else if (remixedMnemonic) {
        form.setValue('mnemonic', remixedMnemonic);
        toast({ title: "Story Remixed!", description: "Logic enhanced." });
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
        toast({ title: "Visual Prompt Ready!" });
      }
    });
  };

  const handleScavengePlaceholder = () => {
    const word = form.getValues('portuguese') || form.getValues('english') || 'placeholder';
    const seed = word.length + Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/seed/${seed}/512/512`;
    setGeneratedImage(url);
    form.setValue('imageKey', ''); 
    toast({ title: "Placeholder Scavenged!", description: `Found visual anchor for "${word}".` });
  };

  const handleSketchSave = async (blob: Blob) => {
    const key = `sketch-${Date.now()}`;
    await setImage(key, blob);
    form.setValue('imageKey', key);
    setGeneratedImage(URL.createObjectURL(blob));
    setIsSketchDialogOpen(false);
    toast({ title: "Neural Sketch Archived!" });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const key = `upload-${Date.now()}`;
        await setImage(key, file);
        form.setValue('imageKey', key);
        setGeneratedImage(URL.createObjectURL(file));
        toast({ title: "Neural Link Uploaded!" });
    }
  };

  const onSubmit = (data: CardFormValues) => {
    addCard(data);
    toast({
      title: 'Card Saved!',
      description: `"${data.portuguese}" added to your Drawer.`,
    });
    router.push('/');
  };
  
  const handleGenerateImage = async () => {
    const imagePrompt = form.getValues('imagePrompt');
    if (!imagePrompt) {
        toast({ variant: 'destructive', title: "Missing Directive" });
        return;
    }

    const provider = getProvider(providerId);
    if (!provider) return;

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
            toast({ title: "Vision Manifested!" });
        } else if (result.imageUrl) {
            setGeneratedImage(result.imageUrl);
        }
    } catch(error: any) {
        toast({ variant: 'destructive', title: "Manifestation Failed", description: error.message });
    } finally {
        setIsGeneratingImage(false);
    }
  }


  return (
    <>
      <NewDeckDialog
        open={isNewDeckDialogOpen}
        onOpenChange={setIsNewDeckDialogOpen}
        onDeckCreated={(deckId) => {
          form.setValue('deckId', deckId);
          setIsNewDeckDialogOpen(false);
          toast({ title: "New Deck Created" });
        }}
      />
      <UICard className="border-4 border-black shadow-[8px_8px_0px_black] overflow-hidden rounded-[2rem]">
        <CardContent className="p-0">
          <div className="bg-primary/10 p-4 border-b-4 border-black flex items-center justify-between">
              <h2 className="font-headline text-lg text-primary uppercase">Card Creator</h2>
              <Button 
                type="button" 
                variant="accent" 
                className="h-10 px-4 hover:scale-105 transition-transform"
                onClick={() => handleMagicAssist()}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                <span className="font-headline text-[10px]">MAGIC ASSIST</span>
              </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="portuguese" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-headline uppercase tracking-tighter text-muted-foreground">Portuguese Original</FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input 
                            placeholder="e.g., 'falar'" 
                            {...field} 
                            className="text-base border-2 border-black pr-10 h-12 focus-visible:ring-primary bg-[hsl(var(--input))] dark:bg-muted/20" 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1 top-1 h-10 w-10 hover:bg-primary/20 text-primary transition-colors"
                          onClick={() => handleMagicAssist(field.value)}
                          disabled={isPending}
                        >
                           <Sparkles className={cn("h-5 w-5", isPending && "animate-spin")} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="english" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-headline uppercase tracking-tighter text-muted-foreground">English Translation</FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input 
                            placeholder="e.g., 'to speak'" 
                            {...field} 
                            className="text-base border-2 border-black pr-10 h-12 focus-visible:ring-accent bg-[hsl(var(--input))] dark:bg-muted/20" 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1 top-1 h-10 w-10 hover:bg-accent/20 text-accent transition-colors"
                          onClick={() => handleMagicAssist(field.value)}
                          disabled={isPending}
                        >
                           <Sparkles className={cn("h-5 w-5", isPending && "animate-spin")} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="pronunciation" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-headline uppercase tracking-tighter text-muted-foreground">Phonetic Matrix</FormLabel>
                      <FormControl><Input placeholder="e.g., 'fa-lar'" {...field} className="text-base border-2 border-black h-12 font-code bg-[hsl(var(--input))] dark:bg-muted/20" /></FormControl>
                      <FormMessage />
                    </FormItem>
                )} />

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="conjugations" className="border-2 border-black rounded-xl px-4 bg-muted/5">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="font-headline text-[8px] uppercase">Conjugation Hub (Verbs Only)</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2 pb-6">
                            {(['present', 'past', 'future'] as const).map(tense => (
                                <div key={tense} className="space-y-2">
                                    <h4 className="text-[8px] font-headline uppercase text-muted-foreground">{tense} Tense</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['eu', 'voce', 'nos', 'eles'] as const).map(person => (
                                            <FormField 
                                                key={`${tense}-${person}`}
                                                control={form.control} 
                                                name={`conjugations.${tense}.${person}` as any} 
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input 
                                                                {...field} 
                                                                placeholder={person.toUpperCase()} 
                                                                className="h-10 text-xs border-black bg-white" 
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <FormField control={form.control} name="deckId" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-headline uppercase tracking-tighter text-muted-foreground">Deck Drawer Assignment</FormLabel>
                    <div className="flex gap-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base border-2 border-black h-12 font-bold bg-white dark:bg-card">
                            <SelectValue placeholder="Select a deck" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-2 border-black rounded-xl">
                          {decks.map(deck => (
                            <SelectItem key={deck.id} value={deck.id} className="font-medium py-3 uppercase text-[10px]">{deck.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" variant="outline" size="icon" className="h-12 w-12 border-2 border-black flex-shrink-0 ink-shadow-sm" onClick={() => setIsNewDeckDialogOpen(true)}>
                        <Plus className="h-6 w-6" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="space-y-6">
                  <FormField control={form.control} name="mnemonic" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-1">
                        <FormLabel className="text-[10px] font-headline uppercase tracking-tighter text-muted-foreground">Memory Strategy</FormLabel>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-[10px] font-bold text-accent hover:bg-accent/10"
                          onClick={handleRemixMnemonic}
                          disabled={isPending}
                        >
                          {isPending ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-1 h-3 w-3" />}
                          REMIX
                        </Button>
                      </div>
                      <FormControl><Textarea placeholder="Construct a vivid, absurd, spatial story..." {...field} rows={4} className="text-lg border-2 border-black italic font-serif bg-[hsl(var(--input))] dark:bg-muted/10 leading-relaxed rounded-2xl" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="space-y-4 pt-4 border-t-2 border-black/10">
                    <FormField control={form.control} name="imagePrompt" render={({ field }) => (
                        <FormItem>
                        <div className="flex items-center justify-between mb-1">
                            <FormLabel className="text-[10px] font-headline uppercase text-muted-foreground">Visual Directive</FormLabel>
                            <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-[10px] font-bold hover:bg-primary/10"
                            onClick={handleGeneratePrompt}
                            disabled={isPending}
                            >
                            {isPending ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Bot className="mr-1 h-3 w-3" />}
                            DESCRIBE
                            </Button>
                        </div>
                        <FormControl><Textarea placeholder="Technical specs..." {...field} rows={2} className="font-code text-[10px] border-2 border-black bg-muted/30 rounded-xl" /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2">
                            <Button type="button" variant="secondary" className="h-14 border-2 border-black shadow-[4px_4px_0_black] rounded-xl font-headline text-[8px] p-1" onClick={handleGenerateImage} disabled={isGeneratingImage}>
                                {isGeneratingImage ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5"/>}
                                <span className="hidden sm:inline ml-1">AI VISION</span>
                            </Button>
                            <Dialog open={isSketchDialogOpen} onOpenChange={setIsSketchDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="outline" className="h-14 border-2 border-black shadow-[4px_4px_0_black] rounded-xl font-headline text-[8px] bg-white dark:bg-card p-1">
                                        <Palette className="h-5 w-5" /> 
                                        <span className="hidden sm:inline ml-1">SKETCH</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl w-[95vw] border-8 border-black shadow-2xl rounded-[3rem] p-0 overflow-hidden">
                                    <DialogHeader className="p-6 bg-primary border-b-4 border-black">
                                        <DialogTitle className="text-white uppercase font-headline">Neural Sketch Station</DialogTitle>
                                    </DialogHeader>
                                    <div className="p-4 bg-muted/20">
                                        <NeuralSketch onSave={handleSketchSave} />
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button type="button" variant="outline" className="h-14 border-2 border-black shadow-[4px_4px_0_black] rounded-xl font-headline text-[8px] bg-white dark:bg-card p-1" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="h-5 w-5" /> 
                                <span className="hidden sm:inline ml-1">UPLOAD</span>
                            </Button>
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                            <Button type="button" variant="outline" className="h-14 border-2 border-black shadow-[4px_4px_0_black] rounded-xl font-headline text-[8px] bg-white dark:bg-card p-1" onClick={handleScavengePlaceholder}>
                                <Search className="h-5 w-5" /> 
                                <span className="hidden sm:inline ml-1">SCAVENGE</span>
                            </Button>
                        </div>
                        <div className="aspect-square w-full rounded-3xl border-4 border-black overflow-hidden bg-secondary/5 flex items-center justify-center relative shadow-inner">
                            {isGeneratingImage ? (
                                <div className="flex flex-col items-center gap-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" strokeWidth={3} />
                                    <p className="font-headline text-[8px] animate-pulse tracking-widest uppercase">Syncing Vision...</p>
                                </div>
                            ) : generatedImage ? (
                                <Image src={generatedImage} alt="Preview" fill className="object-cover" unoptimized={true} />
                            ) : (
                                <div className="text-center p-10 opacity-20">
                                    <Sparkles className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
                                    <p className="text-muted-foreground font-headline text-[8px] uppercase tracking-widest">No Signal</p>
                                </div>
                            )}
                        </div>
                    </div>
                  </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end pt-6 border-t-4 border-black">
                  <Button type="submit" size="lg" className="h-20 px-16 font-headline text-xs bg-primary text-primary-foreground border-4 border-black shadow-[8px_8px_0_black] hover:-translate-y-2 hover:shadow-[12px_12px_0_black] hover:bg-accent transition-all rounded-2xl">
                      SAVE CARD
                  </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </UICard>
    </>
  );
}
