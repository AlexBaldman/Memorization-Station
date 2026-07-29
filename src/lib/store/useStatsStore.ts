import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StatsState {
  v: number;
  totalReviews: number;
  correctCount: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  recordPractice: (gotIt: boolean) => void;
  getAccuracy: () => number;
  getRank: () => string;
}

const initialState = {
  v: 2,
  totalReviews: 0,
  correctCount: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      ...initialState,
      recordPractice: (gotIt: boolean) => {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        set((state) => {
          const newTotalReviews = state.totalReviews + 1;
          const newCorrectCount = state.correctCount + (gotIt ? 1 : 0);
          
          let newCurrentStreak = state.currentStreak;
          if (gotIt) {
            newCurrentStreak += 1;
          } else {
            newCurrentStreak = 0;
          }

          const newLongestStreak = Math.max(state.longestStreak, newCurrentStreak);

          return {
            totalReviews: newTotalReviews,
            correctCount: newCorrectCount,
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastPracticeDate: today,
          };
        });
      },
      getAccuracy: () => {
        const { totalReviews, correctCount } = get();
        if (totalReviews === 0) return 0;
        return Math.round((correctCount / totalReviews) * 100);
      },
      getRank: () => {
        const accuracy = get().getAccuracy();
        const total = get().totalReviews;
        
        if (total < 10) return "Archival Intern";
        if (accuracy > 95) return "Neural Champion";
        if (accuracy > 85) return "Memory Master";
        if (accuracy > 70) return "Linguistic Tech";
        return "Neural Trainee";
      }
    }),
    {
      name: 'memorization-station-stats',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState: any, version: number) => {
        return {
          ...initialState,
          ...(persistedState as any),
        };
      },
    }
  )
);
