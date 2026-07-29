import { CardCreator } from "@/components/features/card-creator";
import { PageHeader } from "@/components/page-header";

export default function CreateCardPage() {
    return (
        <div>
            <PageHeader
                title="Card Creator"
                description="Craft a new flashcard with a memorable story. The more absurd, the better!"
            />
            <CardCreator />
        </div>
    )
}
