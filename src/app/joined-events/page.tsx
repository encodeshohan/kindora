import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import EventsGridSkeleton from "@/components/events/EventsGridSkeleton";
import JoinedEventCard from "@/components/events/JoinedEventCard";
import Notice from "@/components/shared/Notice";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getToday } from "@/lib/format";
import { getJoinedEvents } from "@/lib/server-api";
import type { IJoinedEvent } from "@/lib/types/event";

export const metadata: Metadata = { title: "Joined Events" };

function JoinedGrid({
    events,
    isPast,
}: {
    events: IJoinedEvent[];
    isPast: boolean;
}) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <JoinedEventCard key={event._id} event={event} isPast={isPast} />
            ))}
        </div>
    );
}

async function JoinedEventsContent() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login?callbackURL=%2Fjoined-events");
    }

    let joined: IJoinedEvent[];

    try {
        joined = await getJoinedEvents();
    } catch {
        return (
            <Notice
                title="We couldn't load your events"
                text="Something went wrong on our side. Please refresh in a moment."
            />
        );
    }

    if (joined.length === 0) {
        return (
            <Notice
                title="You haven't joined any events yet"
                text="Find an event you care about and join it with one click."
            >
                <Button render={<Link href="/events" />} nativeButton={false}>
                    Browse events
                </Button>
            </Notice>
        );
    }

    const today = getToday();
    // The API already sorts by event date (earliest first).
    const upcoming = joined.filter((event) => event.date >= today);
    const past = joined.filter((event) => event.date < today).reverse();

    return (
        <div className="space-y-12">
            {upcoming.length > 0 && (
                <section>
                    <h2 className="mb-6 text-2xl font-semibold">
                        Upcoming ({upcoming.length})
                    </h2>
                    <JoinedGrid events={upcoming} isPast={false} />
                </section>
            )}
            {past.length > 0 && (
                <section>
                    <h2 className="mb-6 text-2xl font-semibold">
                        Past events ({past.length})
                    </h2>
                    <JoinedGrid events={past} isPast />
                </section>
            )}
        </div>
    );
}

export default function JoinedEventsPage() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <SectionHeading
                eyebrow="Your calendar"
                title="Joined events"
                description="Every event you have signed up for, ordered by date."
            />
            <Suspense fallback={<EventsGridSkeleton count={3} />}>
                <JoinedEventsContent />
            </Suspense>
        </div>
    );
}