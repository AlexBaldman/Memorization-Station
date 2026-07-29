
'use client';

import { useDeckStore } from '@/lib/store/useDeckStore';
import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { useStatsStore } from '@/lib/store/useStatsStore';
import { useEffect, useState, type ReactNode } from 'react';

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkHydration = () => {
      if (!mounted) return;

      try {
        const deckHydrated = useDeckStore.persist.hasHydrated();
        const settingsHydrated = useSettingsStore.persist.hasHydrated();
        const statsHydrated = useStatsStore.persist.hasHydrated();

        if (deckHydrated && settingsHydrated && statsHydrated) {
          setIsHydrated(true);
        } else {
          setTimeout(checkHydration, 50);
        }
      } catch (err) {
        console.error("Hydration Error:", err);
        // Force hydration on catch to prevent bricked UI
        setIsHydrated(true);
      }
    };

    checkHydration();

    // Safety Timeout: Force load after 2.5 seconds no matter what
    const safetyTimeout = setTimeout(() => {
      if (mounted) setIsHydrated(true);
    }, 2500);

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
    };
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
