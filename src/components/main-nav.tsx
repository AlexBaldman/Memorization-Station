'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookCopy, PlusCircle, Settings, Sparkles, Dices, LayoutGrid } from 'lucide-react';

const navItems = [
  { href: '/', label: 'DRAWER', icon: BookCopy },
  { href: '/roll', label: 'ROLL//99', icon: Dices },
  { href: '/pao', label: 'PAO MATRIX', icon: LayoutGrid },
  { href: '/create', label: 'CREATOR', icon: PlusCircle },
  { href: '/practice', label: 'TRAIN', icon: Sparkles },
  { href: '/settings', label: 'CONFIG', icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center w-full">
      <nav className="flex w-full flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                'flex items-center gap-4 rounded-2xl px-6 py-6 text-xl font-headline transition-all group border-4 border-black relative',
                isActive
                    ? 'bg-black text-[hsl(var(--menu-text))] shadow-[8px_8px_0px_hsl(var(--menu-text))] scale-105 z-10'
                    : 'bg-white text-black shadow-[4px_4px_0px_black] hover:bg-black/5 hover:translate-x-1 active:translate-y-1'
                )}
            >
                <item.icon className={cn("h-8 w-8 transition-transform group-hover:rotate-12", isActive ? "text-[hsl(var(--menu-text))]" : "text-black")} />
                <span className="tracking-tighter">{item.label}</span>
                {isActive && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-[hsl(var(--menu-text))] animate-pulse" />
                )}
            </Link>
          )
        })}
      </nav>
      <div className="mt-12 pt-8 border-t-4 border-black/20 w-full text-center">
        <p className="text-[9px] font-headline text-[hsl(var(--menu-text))] uppercase tracking-[0.3em] leading-relaxed drop-shadow-sm font-bold opacity-80">
            Memorization Station<br/>
            BRAIN-HACKING ENGAGED
        </p>
      </div>
    </div>
  );
}
