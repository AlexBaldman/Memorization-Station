import type { Metadata, Viewport } from 'next';
import { Source_Code_Pro, Press_Start_2P, Lora, Permanent_Marker, Luckiest_Guy } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { AppStateProvider } from '@/lib/store/app-state-provider';
import { ThemeProvider } from '@/components/theme-provider';

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

const fontHeadline = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headline',
});

const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

const fontHandwritten = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-handwritten',
});

const fontBubble = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bubble',
});

export const viewport: Viewport = {
  themeColor: '#FF7F50', // Light Coral base
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Memorization Station',
  description: 'A mnemonic-first Portuguese flashcard app.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MemStation',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={cn(
          'font-code antialiased select-none',
          fontCode.variable,
          fontHeadline.variable,
          fontSerif.variable,
          fontHandwritten.variable,
          fontBubble.variable
        )}
      >
        <AppStateProvider>
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col bg-background safe-area-padding">
              <SiteHeader />
              <main className="flex-1 p-4 md:p-8 pb-safe">{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
