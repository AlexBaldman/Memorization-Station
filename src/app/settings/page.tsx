import { SettingsForm } from "@/components/features/settings-form";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <PageHeader
                    title="Settings"
                    description="Customize your learning experience. Adjust the AI style, manage providers, and tweak the interface to your liking."
                    className="mb-0"
                />
                <Button asChild variant="accent" className="h-16 border-4 border-black ink-shadow-sm rounded-2xl group shrink-0">
                    <Link href="/providers">
                        <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                        VIEW VISION GUIDE
                    </Link>
                </Button>
            </div>
            <SettingsForm />
        </div>
    )
}
