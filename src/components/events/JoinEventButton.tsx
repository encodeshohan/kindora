"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function JoinEventButton({ eventId }: { eventId: string }) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const isLoggedIn = Boolean(session);

    const [joinedState, setJoinedState] = useState<boolean | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) return;
        let cancelled = false;

        const loadStatus = async () => {
            let joined = false;
            try {
                const token = await getTokenFromClient();
                if (token) {
                    const response = await fetch(
                        `${API_URL}/events/${eventId}/join-status`,
                        { headers: { authorization: `Bearer ${token}` } },
                    );
                    if (response.ok) {
                        const data: { joined: boolean } = await response.json();
                        joined = data.joined;
                    }
                }
            } catch {
                // Fall back to showing the Join button; the server rejects duplicate joins.
            }
            if (!cancelled) setJoinedState(joined);
        };

        loadStatus();
        return () => {
            cancelled = true;
        };
    }, [isLoggedIn, eventId]);

    const callServer = async (method: "POST" | "DELETE") => {
        const token = await getTokenFromClient();
        if (!token) {
            toast.error("Your session has expired. Please log in again.");
            return null;
        }
        const response = await fetch(`${API_URL}/events/${eventId}/join`, {
            method,
            headers: { authorization: `Bearer ${token}` },
        });
        const data: { message?: string } = await response.json().catch(() => ({}));
        return { response, message: data.message };
    };

    const handleJoin = async () => {
        if (!isLoggedIn) {
            toast.info("Please log in to join this event");
            router.push(
                `/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`,
            );
            return;
        }

        setSubmitting(true);
        try {
            const result = await callServer("POST");
            if (!result) return;
            if (result.response.status === 409) {
                setJoinedState(true);
                toast.info(result.message ?? "You have already joined this event");
                return;
            }
            if (!result.response.ok) {
                toast.error(result.message ?? "Could not join the event");
                return;
            }
            setJoinedState(true);
            toast.success("You have joined this event!");
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleLeave = async () => {
        setSubmitting(true);
        try {
            const result = await callServer("DELETE");
            if (!result) return;
            if (!result.response.ok) {
                toast.error(result.message ?? "Could not leave the event");
                return;
            }
            setJoinedState(false);
            toast.success("You have left the event");
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isPending || (isLoggedIn && joinedState === null)) {
        return <Skeleton className="h-9 w-full" />;
    }

    if (isLoggedIn && joinedState) {
        return (
            <div className="space-y-3">
                <p className="flex items-center justify-center gap-2 rounded-lg bg-primary/15 px-3 py-2 text-sm font-medium text-primary">
                    <CircleCheck className="size-4" />
                    You have joined this event
                </p>
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                    onClick={handleLeave}
                >
                    {submitting && <Loader2 className="animate-spin" />}
                    Leave event
                </Button>
            </div>
        );
    }

    return (
        <Button
            size="lg"
            className="w-full"
            disabled={submitting}
            onClick={handleJoin}
        >
            {submitting && <Loader2 className="animate-spin" />}
            Join Event
        </Button>
    );
}