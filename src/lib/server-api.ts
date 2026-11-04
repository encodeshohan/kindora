import { API_URL } from "@/lib/api";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { IEvent, IJoinedEvent } from "@/lib/types/event";

// Server components use the session's token, so this file must never be imported by a client component.
async function authorizedGet<T>(path: string): Promise<T> {
    const token = await getTokenFromServer();
    if (!token) {
        throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_URL}${path}`, {
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

export const getJoinedEvents = () =>
    authorizedGet<IJoinedEvent[]>("/joined-events");


export const getMyEvents = () => authorizedGet<IEvent[]>("/my-events");