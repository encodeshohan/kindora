"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IJoinedEvent } from "@/lib/types/event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JoinedEventCard({
    event,
    isPast,
}: {
    event: IJoinedEvent;
    isPast: boolean;
}) {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);

    const handleLeave = async () => {
        setLeaving(true);
        try {
            const token = await getTokenFromClient();
            if (!token) {
                toast.error("Your session has expired. Please log in again.");
                return;
            }
            const response = await fetch(`${API_URL}/events/${event.eventId}/join`, {
                method: "DELETE",
                headers: { authorization: `Bearer ${token}` },
            });
            const data: { message?: string } = await response
                .json()
                .catch(() => ({}));

            if (!response.ok) {
                toast.error(data.message ?? "Could not leave the event");
                return;
            }
            toast.success("You have left the event");
            router.refresh();
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setLeaving(false);
        }
    };

    return (
        <Card className="group h-full gap-0 overflow-hidden py-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3">{event.type}</Badge>
                {isPast && (
                    <Badge variant="secondary" className="absolute right-3 top-3">
                        Past event
                    </Badge>
                )}
            </div>
            <CardContent className="flex flex-1 flex-col gap-4 p-5">
                <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
                    {event.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-primary" />
                        <span className="line-clamp-1">{event.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CalendarDays className="size-4 shrink-0 text-primary" />
                        {formatEventDate(event.date)}
                    </li>
                </ul>
                <div className="mt-auto flex gap-2">
                    <Button
                        size="lg"
                        className="flex-1"
                        render={<Link href={`/events/${event.eventId}`} />}
                        nativeButton={false}
                    >
                        View Event
                    </Button>
                    {!isPast && (
                        <Button
                            size="lg"
                            variant="outline"
                            disabled={leaving}
                            onClick={handleLeave}
                        >
                            {leaving && <Loader2 className="animate-spin" />}
                            Leave
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}