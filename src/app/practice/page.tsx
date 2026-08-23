import { PracticeSession } from "@/components/features/practice-session";
import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";

export default async function PracticePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const deckId = typeof params.deckId === 'string' ? params.deckId : undefined;

    return (
        <div>
            <PageHeader
                title="Practice Session"
                description="Time to train your brain! Review your due cards to build those neural pathways."
            />
            <Suspense fallback={<div>Loading practice session...</div>}>
                <PracticeSession deckId={deckId} />
            </Suspense>
        </div>
    )
}
