import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ManageEventsList from "@/components/events/ManageEventsList";
import ManageEventsSkeleton from "@/components/events/ManageEventsSkeleton";
import Notice from "@/components/shared/Notice";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getToday } from "@/lib/format";
import { getMyEvents } from "@/lib/server-api";
import type { IEvent } from "@/lib/types/event";

export const metadata: Metadata = { title: "Manage Events" };

async function ManageEventsContent() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login?callbackURL=%2Fmanage-events");
    }

    let events: IEvent[];

    try {
        events = await getMyEvents();
    } catch {
        return (
            <Notice
                title="We couldn’t load your events"
                text="Something went wrong on our side. Please refresh in a moment."
            />
        );
    }

    if (events.length === 0) {
        return (
            <Notice
                title="You haven’t created any events yet"
                text="Host your first event and it will show up here for you to manage."
            >
                <Button render={<Link href="/create-event" />} nativeButton={false}>
                    Create an event
                </Button>
            </Notice>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                    You are hosting {events.length}{" "}
                    {events.length === 1 ? "event" : "events"}
                </p>
                <Button render={<Link href="/create-event" />} nativeButton={false}>
                    Create event
                </Button>
            </div>
            <ManageEventsList events={events} today={getToday()} />
        </div>
    );
}

export default function ManageEventsPage() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <SectionHeading
                eyebrow="Your events"
                title="Manage events"
                description="Update the details of the events you host, or remove the ones you no longer need."
            />
            <Suspense fallback={<ManageEventsSkeleton />}>
                <ManageEventsContent />
            </Suspense>
        </div>
    );
}