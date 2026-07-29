import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Key, Zap, ShieldCheck, Cpu, Globe, Infinity } from 'lucide-react';
import Link from 'next/link';

export default function ProvidersGuidePage() {
    return (
        <div className="max-w-5xl mx-auto pb-20 blueprint-bg p-4 md:p-8">
            <div className="mb-12">
                <Link href="/settings" className="text-xs font-headline text-primary hover:underline mb-4 block">← BACK TO SYSTEM CONFIG</Link>
                <PageHeader 
                    title="Neural Vision Guide" 
                    description="Expand your Station's visual capabilities. Integrate free and premium AI engines to manifest your mnemonics."
                />
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Free Provider: Pollinations */}
                <Card className="border-4 border-black ink-shadow-lg rounded-[2.5rem] overflow-hidden bg-card">
                    <CardHeader className="bg-primary/10 p-8 border-b-4 border-black flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="font-headline text-xl text-primary uppercase">Pollinations AI</CardTitle>
                            <CardDescription className="font-serif italic text-lg">The Free Standard</CardDescription>
                        </div>
                        <div className="bg-success text-white px-4 py-2 rounded-full font-headline text-[8px] border-2 border-black">NO KEY REQUIRED</div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-xl font-serif italic leading-relaxed">
                            A high-speed, community-driven visual engine. It is the default provider for the Station because it requires zero configuration.
                        </p>
                        <div className="flex items-center gap-4 bg-muted/20 p-6 rounded-2xl border-4 border-black border-dashed">
                            <Infinity className="h-8 w-8 text-primary shrink-0" />
                            <p className="text-sm">Unlimited generation for archival use. Perfect for initial deck population.</p>
                        </div>
                        <Button asChild variant="outline" className="border-2 border-black">
                            <a href="https://pollinations.ai/" target="_blank" rel="noopener noreferrer">
                                Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>

                {/* Premium Provider: Hugging Face */}
                <Card className="border-4 border-black ink-shadow-lg rounded-[2.5rem] overflow-hidden bg-card">
                    <CardHeader className="bg-accent/10 p-8 border-b-4 border-black flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="font-headline text-xl text-accent uppercase">Hugging Face</CardTitle>
                            <CardDescription className="font-serif italic text-lg">Pro-Grade Models (Flux, SDXL)</CardDescription>
                        </div>
                        <Key className="h-8 w-8 text-accent" />
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-4">
                            <h4 className="font-headline text-xs uppercase text-primary">Setup Instructions:</h4>
                            <ol className="list-decimal list-inside space-y-4 font-serif text-lg pl-2">
                                <li>Create a free account at <a href="https://huggingface.co/join" target="_blank" className="text-accent underline font-bold">HuggingFace.co</a>.</li>
                                <li>Navigate to your <strong>Settings -&gt; Access Tokens</strong>.</li>
                                <li>Generate a new <strong>Read</strong> token.</li>
                                <li>Paste the token into the <strong>Provider Key</strong> field in the Station Settings.</li>
                            </ol>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-muted/10 border-2 border-black rounded-2xl space-y-2">
                                <Cpu className="h-6 w-6 text-primary" />
                                <h5 className="font-headline text-[10px] uppercase">Flux.1 [dev]</h5>
                                <p className="text-xs italic">The current state-of-the-art for prompt adherence and realistic detail.</p>
                            </div>
                            <div className="p-6 bg-muted/10 border-2 border-black rounded-2xl space-y-2">
                                <Zap className="h-6 w-6 text-orange-500" />
                                <h5 className="font-headline text-[10px] uppercase">SDXL Turbo</h5>
                                <p className="text-xs italic">Ultra-fast generation for rapid-fire card creation.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Premium Provider: OpenAI */}
                <Card className="border-4 border-black ink-shadow-lg rounded-[2.5rem] overflow-hidden bg-card">
                    <CardHeader className="bg-primary/10 p-8 border-b-4 border-black flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="font-headline text-xl text-primary uppercase">OpenAI (DALL-E 3)</CardTitle>
                            <CardDescription className="font-serif italic text-lg">Highest Visual Consistency</CardDescription>
                        </div>
                        <Globe className="h-8 w-8 text-primary" />
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-xl font-serif italic leading-relaxed">
                            Requires an active OpenAI API key with credit. Known for its incredible ability to follow complex mnemonic instructions.
                        </p>
                        <div className="bg-yellow-400/20 p-6 rounded-2xl border-4 border-black border-dashed flex items-start gap-4">
                            <ShieldCheck className="h-6 w-6 text-yellow-600 shrink-0" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold">Privacy Note:</p>
                                <p className="text-xs italic">The Station does not store your keys on any server. They remain strictly in your local neural browser cache.</p>
                            </div>
                        </div>
                        <Button asChild variant="outline" className="border-2 border-black">
                            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                                Get OpenAI Key <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-16 p-10 border-8 border-black border-double bg-primary text-white rounded-[3rem] text-center space-y-6">
                <Zap className="h-12 w-12 mx-auto animate-pulse" />
                <h3 className="font-headline text-2xl uppercase tracking-widest">Neural Recommendation</h3>
                <p className="text-xl font-serif italic leading-relaxed max-w-2xl mx-auto">
                    "Start with <strong>Pollinations</strong> for speed. Move to <strong>Hugging Face</strong> for high-fidelity visions. Always <strong>Upload</strong> your personal masterpieces to ensure archival permanence."
                </p>
            </div>
        </div>
    );
}
