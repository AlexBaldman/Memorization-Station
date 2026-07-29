'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { imageProviders } from '@/lib/image-providers';
import { Switch } from '../ui/switch';
import { Key, Globe, Layout, BrainCircuit, Gamepad2 } from 'lucide-react';

const settingsFormSchema = z.object({
  stylePreset: z.string().min(10, 'Style preset must be at least 10 characters.'),
  imageProvider: z.string(),
  showPronunciation: z.boolean(),
  defaultPracticeMode: z.enum(['classic', 'visual', 'bridge']),
  apiKey: z.string().optional(),
  apiBaseUrl: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SettingsForm() {
  const { toast } = useToast();
  const { 
    stylePreset, 
    imageProvider, 
    showPronunciation,
    defaultPracticeMode,
    providerSettings,
    setStylePreset, 
    setImageProvider,
    setShowPronunciation,
    setDefaultPracticeMode,
    setProviderSettings
  } = useSettingsStore();
  
  const currentProviderSettings = providerSettings[imageProvider] || {};

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
        stylePreset,
        imageProvider,
        showPronunciation,
        defaultPracticeMode,
        apiKey: currentProviderSettings.apiKey || '',
        apiBaseUrl: currentProviderSettings.apiBaseUrl || '',
    },
  });

  const selectedProviderId = form.watch('imageProvider');
  const selectedProvider = imageProviders[selectedProviderId];

  function onSubmit(data: SettingsFormValues) {
    setStylePreset(data.stylePreset);
    setImageProvider(data.imageProvider);
    setShowPronunciation(data.showPronunciation);
    setDefaultPracticeMode(data.defaultPracticeMode);
    
    // Save provider specific settings
    setProviderSettings(data.imageProvider, {
        apiKey: data.apiKey,
        apiBaseUrl: data.apiBaseUrl,
    });

    toast({
      title: 'Neural Matrix Updated',
      description: 'Your settings have been successfully committed to the station.',
    });
  }

  const handleProviderChange = (val: string) => {
      const settings = providerSettings[val] || {};
      form.setValue('imageProvider', val);
      form.setValue('apiKey', settings.apiKey || '');
      form.setValue('apiBaseUrl', settings.apiBaseUrl || '');
  };

  return (
    <UICard className="max-w-3xl mx-auto border-4 border-black ink-shadow-lg rounded-[2.5rem] overflow-hidden bg-card">
        <CardHeader className="bg-primary p-8 border-b-4 border-black relative">
            <div className="absolute inset-0 blueprint-bg opacity-10" />
            <CardTitle className="font-headline text-2xl text-white text-shadow flex items-center gap-4 relative z-10 uppercase tracking-tighter">
                <BrainCircuit className="h-8 w-8" /> 
                System Configuration
            </CardTitle>
        </CardHeader>
      <CardContent className="p-10 space-y-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* Interface Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <Layout className="h-5 w-5 text-primary" />
                    <h3 className="font-headline text-[10px] uppercase tracking-widest text-muted-foreground">Interface Control</h3>
                </div>
                
                <FormField
                control={form.control}
                name="showPronunciation"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-2xl border-4 border-black p-6 bg-muted/20 ink-shadow-sm">
                    <div className="space-y-1">
                        <FormLabel className="text-sm font-headline uppercase">Phonetic Matrix</FormLabel>
                        <FormDescription className="text-xs font-serif italic">
                        Show pronunciation guides during practice.
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                        />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="defaultPracticeMode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-sm font-headline uppercase mb-3 block">Primary Engagement Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="border-4 border-black h-16 text-lg rounded-2xl ink-shadow-sm bg-white font-bold">
                            <SelectValue placeholder="Select a mode" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-4 border-black rounded-xl">
                            <SelectItem value="classic" className="font-medium py-3 uppercase text-[10px] font-headline">Classic (Mnemonic Focus)</SelectItem>
                            <SelectItem value="visual" className="font-medium py-3 uppercase text-[10px] font-headline">Visual (Image Association)</SelectItem>
                            <SelectItem value="bridge" className="font-medium py-3 uppercase text-[10px] font-headline">Bridge (Direct Translation)</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription className="italic mt-2">
                        Sets the initial game type for your practice sessions.
                    </FormDescription>
                    </FormItem>
                )}
                />
            </div>

            {/* AI Generation Section */}
            <div className="space-y-6 pt-10 border-t-4 border-black border-double">
                <div className="flex items-center gap-3 mb-4">
                    <Gamepad2 className="h-5 w-5 text-accent" />
                    <h3 className="font-headline text-[10px] uppercase tracking-widest text-muted-foreground">Neural Engine (AI)</h3>
                </div>

                <FormField
                control={form.control}
                name="stylePreset"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-sm font-headline uppercase mb-3 block">Artist Soul (Style Preset)</FormLabel>
                    <FormControl>
                        <Textarea
                        rows={3}
                        className="font-code text-base border-4 border-black rounded-2xl bg-white"
                        placeholder="e.g., comic book style, vibrant colors..."
                        {...field}
                        />
                    </FormControl>
                    <FormDescription className="italic">
                        Defines the visual reality of your generated cards.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="imageProvider"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-sm font-headline uppercase mb-3 block">Image Generation Provider</FormLabel>
                    <Select onValueChange={handleProviderChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger className="border-4 border-black h-14 text-base rounded-xl bg-white">
                            <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-4 border-black rounded-xl">
                            {Object.values(imageProviders).map(p => (
                                <SelectItem key={p.id} value={p.id} className="text-base font-medium">{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />

                {selectedProvider?.requiresKey && (
                    <div className="space-y-4 p-6 bg-accent/5 rounded-2xl border-4 border-black border-dashed animate-in slide-in-from-top-4 duration-300">
                        <FormField
                            control={form.control}
                            name="apiKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 font-headline text-[10px] uppercase">
                                        <Key className="h-4 w-4" /> Provider Key
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password" 
                                            placeholder={`Paste ${selectedProvider.name} key`} 
                                            className="border-4 border-black h-12 bg-white rounded-xl"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="apiBaseUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 font-headline text-[10px] uppercase">
                                        <Globe className="h-4 w-4" /> API Endpoint / Proxy
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="https://api.example.com/v1" 
                                            className="border-4 border-black h-12 bg-white rounded-xl"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-10 border-t-4 border-black">
              <Button type="submit" size="lg" className="h-20 px-12 font-headline text-xs bg-accent text-white hover:bg-accent/90 border-4 border-black ink-shadow-lg rounded-2xl hover:-translate-y-1 transition-all">
                COMMIT TO STATION
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </UICard>
  );
}
