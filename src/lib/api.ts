import type { IEvent } from "@/lib/types/event";

type EventQuery = {
    limit?: number;
    search?: string;
    type?: string;
    location?: string;
};

export const getEvents = async (params: EventQuery = {}): Promise<IEvent[]> => {
    const query = new URLSearchParams();
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.type) query.set("type", params.type);
    if (params.location) query.set("location", params.location);

    const queryString = query.toString();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events${queryString ? `?${queryString}` : ""}`,
        { cache: "no-store" },
    );

    if (!response.ok) {
        throw new Error("Failed to load events");
    }
    return response.json();
};