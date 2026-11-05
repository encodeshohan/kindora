import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import EventFilters from "@/components/events/EventFilters";
import EventsGrid from "@/components/events/EventsGrid";
import EventsGridSkeleton from "@/components/events/EventsGridSkeleton";
import Notice from "@/components/shared/Notice";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvents } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";
import type { EventType } from "@/lib/constants";
import type { IEvent } from "@/lib/types/event";

export const metadata: Metadata = { title: "Upcoming Events" };

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

const isEventType = (value: string | undefined): value is EventType =>
    EVENT_TYPES.some((type) => type === value);

async function EventsResults({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const search = first(params.search)?.trim() || undefined;
    const location = first(params.location)?.trim() || undefined;
    const rawType = first(params.type);
    const type = isEventType(rawType) ? rawType : undefined;
    const hasFilters = Boolean(search || location || type);

    let events: IEvent[];

    try {
        events = await getEvents({ search, type, location });
    } catch {
        return (
            <Notice
                title="We couldn’t load events"
                text="Something went wrong on our side. Please refresh in a moment."
            />
        );
    }

    if (events.length === 0) {
        return hasFilters ? (
            <Notice
                title="No events match your search"
                text="Try a different title, type or location."
            >
                <Button
                    variant="outline"
                    render={<Link href="/events" />}
                    nativeButton={false}
                >
                    Clear filters
                </Button>
            </Notice>
        ) : (
            <Notice
                title="No upcoming events yet"
                text="Be the first to host one and bring your community together."
            >
                <Button render={<Link href="/create-event" />} nativeButton={false}>
                    Host an event
                </Button>
            </Notice>
        );
    }

    return (
        <>
            <p className="mb-6 text-sm text-muted-foreground">
                {events.length} upcoming {events.length === 1 ? "event" : "events"}
            </p>
            <EventsGrid events={events} />
        </>
    );
}

export default function EventsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    return (
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <SectionHeading
                eyebrow="Find your cause"
                title="Upcoming Events"
                description="Only events that have not happened yet are shown. Search by title, type or location."
            />

            <div className="space-y-8">
                <Suspense fallback={<Skeleton className="h-28 w-full rounded-2xl" />}>
                    <EventFilters />
                </Suspense>

                <Suspense fallback={<EventsGridSkeleton />}>
                    <EventsResults searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}