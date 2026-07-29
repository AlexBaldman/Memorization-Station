import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppSettings, PracticeMode } from '@/lib/domain/types';

interface SettingsState extends AppSettings {
  setTheme: (theme: 'dark' | 'light') => void;
  setStylePreset: (preset: string) => void;
  setShowPronunciation: (show: boolean) => void;
  setImageProvider: (id: string) => void;
  setDefaultPracticeMode: (mode: PracticeMode) => void;
  setProviderSettings: (id: string, settings: any) => void;
}

const initialState: AppSettings = {
  v: 12,
  theme: 'dark',
  stylePreset: 'Mad Magazine, R. Crumb style, cross-hatched, satirical, underground comix, exaggerated features, bold ink lines',
  showPronunciation: true,
  imageProvider: 'gemini-server',
  defaultPracticeMode: 'classic',
  providerSettings: {},
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      setStylePreset: (preset) => set({ stylePreset: preset }),
      setShowPronunciation: (show) => set({ showPronunciation: show }),
      setImageProvider: (id) => set({ imageProvider: id }),
      setDefaultPracticeMode: (mode) => set({ defaultPracticeMode: mode }),
      setProviderSettings: (id, settings) =>
        set((state) => ({
          providerSettings: {
            ...state.providerSettings,
            [id]: settings,
          },
        })),
    }),
    {
      name: 'memorization-station-settings-v12',
      storage: createJSONStorage(() => localStorage),
      version: 12,
      migrate: (persistedState: any, version: number) => {
        if (!persistedState || version < 12) {
          return { ...initialState };
        }
        return persistedState as SettingsState;
      },
    }
  )
);
