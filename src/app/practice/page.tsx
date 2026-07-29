import { PracticeSession } from "@/components/features/practice-session";
import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";

export default function PracticePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const deckId = typeof searchParams.deckId === 'string' ? searchParams.deckId : undefined;

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
