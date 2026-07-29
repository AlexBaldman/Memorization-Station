'use client';

import { useSettingsStore } from '@/lib/store/useSettingsStore';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const { theme, setTheme } = useSettingsStore();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button onClick={toggleTheme} variant="ghost" size="icon" className="h-12 w-12 hover:bg-transparent relative" aria-label="Toggle theme">
            {/* Sun: Deep red with a dark contrast glow in light theme */}
            <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-destructive drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] sun-glow" />
            
            {/* Moon: Neon yellow with a yellow glow in dark theme */}
            <Moon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#ffff00] moon-glow" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
