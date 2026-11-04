"use client";

import { startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
    const router = useRouter();

    const handleRetry = () => {
        startTransition(() => {
            router.refresh();
            reset();
        });
    };

    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-6 py-16 text-center">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <TriangleAlert className="size-8" />
            </span>
            <h1 className="text-4xl font-light tracking-tight md:text-5xl">
                Something went wrong
            </h1>
            <p className="text-muted-foreground">
                An unexpected error stopped this page from loading. You can try again,
                or head back to the home page.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" onClick={handleRetry}>
                    <RotateCcw />
                    Try again
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    render={<Link href="/" />}
                    nativeButton={false}
                >
                    Back to home
                </Button>
            </div>
        </div>
    );
}