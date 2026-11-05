import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
    ArrowLeft,
    CalendarDays,
    CalendarX,
    MapPin,
    Tag,
    Users,
} from "lucide-react";
import EventDetailsSkeleton from "@/components/events/EventDetailsSkeleton";
import JoinEventButton from "@/components/events/JoinEventButton";
import Notice from "@/components/shared/Notice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/api";
import type { IEvent } from "@/lib/types/event";
import { formatEventDate, getInitials, getToday } from "@/lib/format";

export const metadata: Metadata = { title: "Event Details" };

async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let event: IEvent | null;

    try {
        event = await getEventById(id);
    } catch {
        return (
            <div className="mx-auto max-w-7xl px-6 py-16">
                <Notice
                    title="We couldn't load this event"
                    text="Something went wrong on our side. Please refresh in a moment."
                />
            </div>
        );
    }

    if (!event) {
        notFound();
    }

    const isPast = event.date < getToday();
    const joinedCount = event.joinedCount ?? 0;

    const facts = [
        { icon: CalendarDays, label: "Date", value: formatEventDate(event.date) },
        { icon: MapPin, label: "Location", value: event.location },
        { icon: Tag, label: "Event type", value: event.type },
    ];

    return (
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
            <Button
                variant="ghost"
                className="mb-6"
                render={<Link href="/events" />}
                nativeButton={false}
            >
                <ArrowLeft />
                Back to Events
            </Button>

            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <article className="min-w-0 space-y-6">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                        <Image
                            src={event.thumbnail}
                            alt={event.title}
                            fill
                            sizes="(min-width: 1024px) 66vw, 100vw"
                            className="object-cover"
                        />
                        <Badge className="absolute left-4 top-4">{event.type}</Badge>
                    </div>
                    <h1 className="break-words text-4xl font-light tracking-tight md:text-5xl">
                        {event.title}
                    </h1>
                    <div>
                        <h2 className="mb-3 text-xl font-semibold">About this event</h2>
                        <p className="whitespace-pre-line break-words text-justify leading-relaxed text-muted-foreground">
                            {event.description}
                        </p>
                    </div>
                </article>

                <aside className="lg:sticky lg:top-24 lg:self-start">
                    <div className="space-y-6 rounded-2xl border bg-card p-6">
                        <h2 className="text-xl font-semibold">Event details</h2>
                        <ul className="space-y-4">
                            {facts.map(({ icon: Icon, label, value }) => (
                                <li key={label} className="flex items-start gap-3">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                        <Icon className="size-5" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                            {label}
                                        </p>
                                        <p className="break-words font-medium">{value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-3 border-t pt-5">
                            <Avatar className="size-10">
                                <AvatarImage
                                    src={event.creatorPhoto || undefined}
                                    alt={event.creatorName}
                                    referrerPolicy="no-referrer"
                                />
                                <AvatarFallback>{getInitials(event.creatorName)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                    Hosted by
                                </p>
                                <p className="truncate font-medium">
                                    {event.creatorName || "A KINDORA member"}
                                </p>
                            </div>
                        </div>

                        {isPast ? (
                            <div className="space-y-3">
                                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="size-4 text-primary" />
                                    <span className="font-semibold text-foreground">
                                        {joinedCount}
                                    </span>
                                    {joinedCount === 1 ? "person joined" : "people joined"}
                                </p>
                                <p className="flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
                                    <CalendarX className="size-4" />
                                    This event has already taken place
                                </p>
                            </div>
                        ) : (
                            <JoinEventButton
                                eventId={event._id}
                                initialCount={joinedCount}
                            />
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default function EventDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<EventDetailsSkeleton />}>
            <EventDetails params={params} />
        </Suspense>
    );
}