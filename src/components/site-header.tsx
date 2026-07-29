'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MainNav } from '@/components/main-nav';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Zap } from 'lucide-react';

const NavMenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path className="stroke-current" d="M4 8H28" strokeWidth="4" strokeLinecap="round" />
    <path className="stroke-current opacity-80" d="M4 16H28" strokeWidth="4" strokeLinecap="round" />
    <path className="stroke-current opacity-60" d="M4 24H28" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export function SiteHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full site-header-custom backdrop-blur-md border-b-8 border-black shadow-2xl transition-colors duration-500"
    )}>
      <div className="container relative flex h-20 sm:h-32 items-center px-4 max-w-7xl mx-auto">
        {/* Left Side: Neural Brain Cloud Logo */}
        <div className="flex-1 basis-0 flex items-center justify-start">
          <Link href="/" className="flex items-center group relative">
            <div className="relative h-14 w-14 sm:h-20 sm:w-20 overflow-visible rounded-full border-4 border-black ink-shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 active:scale-95 bg-sky-300 flex items-center justify-center shadow-inner">
              <div className="relative flex items-center justify-center">
                <span className="text-4xl sm:text-5xl drop-shadow-md">🧠</span>
                <Zap 
                  className="absolute bottom-[-14px] sm:bottom-[-20px] left-1/2 -translate-x-1/2 h-8 w-8 sm:h-10 sm:w-10 text-[#d4ff00] fill-[#d4ff00] animate-pulse drop-shadow-[0_0_12px_rgba(212,255,0,1)] z-10" 
                  strokeWidth={4}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Hand-Drawn Bubble Letter Title */}
        <div className="flex-shrink-0 flex justify-center items-center px-4 overflow-visible">
          <Link href="/" className="group flex justify-center overflow-visible">
            <h1 className="bubble-text text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 active:scale-95">
              Memorization Station
            </h1>
          </Link>
        </div>

        {/* Right Side: Navigation controls */}
        <div className="flex-1 basis-0 flex items-center justify-end gap-2 sm:gap-6">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn(
                    "h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 hover:bg-transparent transition-all group",
                    "text-[#d4ff00] dark:text-primary hover:scale-110 active:scale-95 p-2 sm:p-2.5",
                    "drop-shadow-[0_0_10px_rgba(212,255,0,0.8)] dark:drop-shadow-[0_0_12px_rgba(160,255,192,0.8)]"
                  )}>
                    <NavMenuIcon className="h-full w-full transition-transform duration-300 group-hover:scale-110" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent 
                side="top" 
                className={cn(
                  "z-[70] w-full md:w-[450px] md:ml-auto border-l-8 border-b-8 border-black p-0 shadow-[20px_20px_0px_black]",
                  "animate-in slide-in-from-top-full duration-500 ease-in-out menu-gradient"
                )}
              >
                <div className="h-full w-full pt-24 px-8 pb-16 flex flex-col overflow-y-auto">
                    <SheetHeader className="mb-16 text-center shrink-0">
                        <SheetTitle asChild>
                            <div className="flex flex-col items-center gap-6">
                                <div className="h-24 w-24 relative rounded-full border-6 border-black bg-sky-300 flex items-center justify-center shadow-2xl animate-bounce-subtle">
                                  <div className="relative flex items-center justify-center">
                                    <span className="text-6xl drop-shadow-xl">🧠</span>
                                    <Zap 
                                      className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 h-12 w-12 text-[#d4ff00] fill-[#d4ff00] drop-shadow-[0_0_15px_rgba(212,255,0,1)]" 
                                      strokeWidth={4}
                                    />
                                  </div>
                                </div>
                                <span className="font-handwritten text-5xl text-[hsl(var(--menu-text))] drop-shadow-[4px_4px_0_black] uppercase tracking-tighter">Neural Menu</span>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full" onClick={() => setIsSheetOpen(false)}>
                        <MainNav />
                    </div>
                    <div className="mt-12 pt-10 border-t-4 border-black/20 text-center">
                        <p className="font-headline text-[10px] opacity-40 uppercase tracking-[0.5em] leading-loose">Archival Security Protocol Active<br/>Station Offline Mode Enabled</p>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
