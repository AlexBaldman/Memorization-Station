import { CardEditor } from '@/components/features/card-editor';
import { Suspense } from 'react';

export default async function EditCardPage({ params }: { params: Promise<{ cardId: string }> }) {
    const { cardId } = await params;
    
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-96">
                <div className="animate-pulse font-headline text-muted-foreground">Initializing Brain Scan...</div>
            </div>
        }>
            <CardEditor cardId={cardId} />
        </Suspense>
    )
}
