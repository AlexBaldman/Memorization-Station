import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12 relative overflow-hidden", className)}>
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2/3 bg-accent/20 rounded-full blur-sm" />
      <h1 className="font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary leading-tight uppercase tracking-tighter drop-shadow-[2px_2px_0_hsl(var(--accent))] md:drop-shadow-[4px_4px_0_hsl(var(--accent))] break-words">
        {title}
      </h1>
      {description && (
        <div className="relative mt-4 md:mt-6 max-w-4xl">
            <p className="text-base md:text-2xl text-muted-foreground font-serif italic leading-relaxed pl-2 border-l-4 border-primary/20">
                {description}
            </p>
        </div>
      )}
    </div>
  );
}
