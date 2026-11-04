import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { IEvent } from "@/lib/types/event";
import { formatEventDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EventCard({ event }: { event: IEvent }) {
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
                <Button
                    size="lg"
                    className="mt-auto w-full"
                    render={<Link href={`/events/${event._id}`} />}
                    nativeButton={false}
                >
                    View Event
                </Button>
            </CardContent>
        </Card>
    );
}