import Link from "next/link";
import { Suspense } from "react";
import { CalendarX } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import EventsGrid from "@/components/events/EventsGrid";
import EventsGridSkeleton from "@/components/events/EventsGridSkeleton";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/lib/api";
import type { IEvent } from "@/lib/types/event";

function Notice({ title, text }: { title: string; text: string }) {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border bg-card p-10 text-center">
            <CalendarX className="size-10 text-primary" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
        </div>
    );
}

async function RecentEventsList() {
    let events: IEvent[];

    try {
        events = await getEvents({ limit: 6 });
    } catch {
        return (
            <Notice
                title="We couldn't load events"
                text="Something went wrong on our side. Please refresh in a moment."
            />
        );
    }

    if (events.length === 0) {
        return (
            <Notice
                title="No upcoming events yet"
                text="Be the first to host one and bring your community together."
            />
        );
    }

    return <EventsGrid events={events} />;
}

export default function RecentEvents() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <SectionHeading
                eyebrow="Happening soon"
                title="Upcoming events"
                description="The next events on the calendar. Pick one and show up."
            />

            <Suspense fallback={<EventsGridSkeleton />}>
                <RecentEventsList />
            </Suspense>

            <div className="mt-12 text-center">
                <Button
                    size="lg"
                    variant="outline"
                    render={<Link href="/events" />}
                    nativeButton={false}
                >
                    View all events
                </Button>
            </div>
        </section>
    );
}
