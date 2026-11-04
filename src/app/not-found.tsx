import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-6 py-16 text-center">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Compass className="size-8" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Error 404
            </p>
            <h1 className="text-4xl font-light tracking-tight md:text-5xl">
                We can’t find that page
            </h1>
            <p className="text-muted-foreground">
                The page may have moved, or the event may have been removed by its
                host. Let’s get you back on track.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" render={<Link href="/" />} nativeButton={false}>
                    Back to home
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    render={<Link href="/events" />}
                    nativeButton={false}
                >
                    Browse events
                </Button>
            </div>
        </div>
    );
}