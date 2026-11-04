import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { formatEventDate } from "@/lib/format";
import type { IEvent } from "@/lib/types/event";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteEventDialog from "./DeleteEventDialog";
import EditEventDialog from "./EditEventDialog";

export default function ManageEventsList({
    events,
    today,
}: {
    events: IEvent[];
    today: string;
}) {
    return (
        <>
            <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Event</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="pr-4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell className="pl-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                                            <Image
                                                src={event.thumbnail}
                                                alt={event.title}
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <Link
                                            href={`/events/${event._id}`}
                                            className="line-clamp-2 max-w-[16rem] font-medium hover:text-primary"
                                        >
                                            {event.title}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{event.type}</Badge>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {formatEventDate(event.date)}
                                    {event.date < today && (
                                        <span className="ml-2 text-xs text-muted-foreground">
                                            Past
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="max-w-[12rem] truncate">
                                    {event.location}
                                </TableCell>
                                <TableCell className="pr-4">
                                    <div className="flex justify-end gap-2">
                                        <EditEventDialog event={event} minDate={today} />
                                        <DeleteEventDialog event={event} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ul className="space-y-4 md:hidden">
                {events.map((event) => (
                    <li
                        key={event._id}
                        className="overflow-hidden rounded-2xl border bg-card"
                    >
                        <div className="relative aspect-[16/9] w-full bg-muted">
                            <Image
                                src={event.thumbnail}
                                alt={event.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-3 p-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge>{event.type}</Badge>
                                {event.date < today && (
                                    <Badge variant="secondary">Past event</Badge>
                                )}
                            </div>
                            <Link
                                href={`/events/${event._id}`}
                                className="line-clamp-2 block text-lg font-semibold leading-snug hover:text-primary"
                            >
                                {event.title}
                            </Link>
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
                            <div className="flex gap-2">
                                <EditEventDialog event={event} minDate={today} />
                                <DeleteEventDialog event={event} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}