import type { IEvent } from "@/lib/types/event";
import EventCard from "./EventCard";

export default function EventsGrid({ events }: { events: IEvent[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    );
}