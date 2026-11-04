import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CreateEventForm from "@/components/events/CreateEventForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { getToday } from "@/lib/format";

export const metadata: Metadata = { title: "Create Event" };

async function CreateEventGate() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login?callbackURL=%2Fcreate-event");
    }
    return <CreateEventForm minDate={getToday()} />;
}

export default function CreateEventPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <SectionHeading
                eyebrow="Host an event"
                title="Create an event"
                description="Fill in the details and your event will appear on the Upcoming Events page right away."
            />
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
                <Suspense fallback={<Skeleton className="h-[34rem] w-full" />}>
                    <CreateEventGate />
                </Suspense>
            </div>
        </div>
    );
}