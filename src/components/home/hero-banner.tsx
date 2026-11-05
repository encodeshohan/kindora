import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    HeartHandshake,
    HeartPulse,
    Recycle,
    Sprout,
    Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tiles = [
    { icon: Recycle, label: "Cleanups" },
    { icon: Sprout, label: "Plantations" },
    { icon: HeartHandshake, label: "Donations" },
    { icon: BookOpen, label: "Education" },
    { icon: HeartPulse, label: "Health Camps" },
    { icon: Utensils, label: "Food Drives" },
];

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -top-32 left-1/4 size-96 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:py-24 lg:grid-cols-2">
                <div className="space-y-8">
                    <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                        <Sprout className="size-4 text-primary" />
                        Community Events, Made Simple
                    </span>
                    <h1 className="text-5xl font-light tracking-tight md:text-6xl">
                        Small Acts,{" "}
                        <span className="font-semibold text-primary">Lasting Change</span>.
                    </h1>
                    <p className="max-w-lg text-lg text-muted-foreground text-justify">
                        Discover cleanups, plantations, donation drives and more happening
                        near you. Join in with one click, or host an event of your own.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button size="lg" render={<Link href="/events" />} nativeButton={false}>
                            Explore Events
                            <ArrowRight />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            render={<Link href="/create-event" />}
                            nativeButton={false}
                        >
                            Host an Event
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-6 [&>*:nth-child(even)]:translate-y-6">
                    {tiles.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-start gap-4 rounded-2xl border bg-card/80 p-6 backdrop-blur"
                        >
                            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <Icon className="size-6" />
                            </span>
                            <p className="font-medium">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}