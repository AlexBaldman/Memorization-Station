'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeckStore } from '@/lib/store/useDeckStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const newDeckSchema = z.object({
  name: z.string().min(1, 'Deck name is required'),
  description: z.string().optional(),
});

type NewDeckValues = z.infer<typeof newDeckSchema>;

interface NewDeckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeckCreated: (deckId: string) => void;
}

export function NewDeckDialog({ open, onOpenChange, onDeckCreated }: NewDeckDialogProps) {
    const { addDeck } = useDeckStore();
    const form = useForm<NewDeckValues>({
        resolver: zodResolver(newDeckSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    });

    const onSubmit = (data: NewDeckValues) => {
        const newDeck = addDeck({ name: data.name, description: data.description || '' });
        onDeckCreated(newDeck.id);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-accent">Create New Deck</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deck Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Portuguese Verbs" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="What's this deck about?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create Deck</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
