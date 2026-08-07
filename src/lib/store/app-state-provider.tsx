
'use client';

import { useDeckStore } from '@/lib/store/useDeckStore';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useStatsStore } from '@/lib/store/useStatsStore';
import { useEffect, useState, type ReactNode } from 'react';

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // With synchronous localStorage, Zustand hydrates immediately on the client.
    // We just need to wait for the first client-side mount to avoid SSR mismatches.
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background blueprint-bg">
        <div className="flex flex-col items-center gap-6">
          <div className="h-20 w-20 border-8 border-black border-t-primary rounded-full animate-spin ink-shadow-sm" />
          <p className="font-headline text-[10px] animate-pulse tracking-widest text-primary uppercase">ARCHIVAL SYNC IN PROGRESS...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
