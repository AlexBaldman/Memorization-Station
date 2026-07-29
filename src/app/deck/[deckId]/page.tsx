import { DeckManager } from "@/components/features/deck-manager";
import { Suspense } from "react";

export default async function DeckManagerPage({ params }: { params: Promise<{ deckId: string }> }) {
    const { deckId } = await params;

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-96">
                <div className="animate-pulse font-headline text-muted-foreground">Loading Vault...</div>
            </div>
        }>
            <DeckManager deckId={deckId} />
        </Suspense>
    )
}
