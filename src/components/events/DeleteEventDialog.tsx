"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IEvent } from "@/lib/types/event";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteEventDialog({ event }: { event: IEvent }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const token = await getTokenFromClient();
            if (!token) {
                toast.error("Your session has expired. Please log in again.");
                return;
            }

            const response = await fetch(`${API_URL}/events/${event._id}`, {
                method: "DELETE",
                headers: { authorization: `Bearer ${token}` },
            });
            const data: { message?: string } = await response
                .json()
                .catch(() => ({}));

            if (!response.ok) {
                toast.error(data.message ?? "Could not delete the event");
                if (response.status === 404) {
                    setOpen(false);
                    router.refresh();
                }
                return;
            }

            toast.success("Event deleted successfully");
            setOpen(false);
            router.refresh();
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
                <Trash2 />
                Delete
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this event?</AlertDialogTitle>
                        <AlertDialogDescription>
                            “{event.title}” will be removed for good, and everyone who joined
                            it will lose it from their list. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <Button
                            variant="destructive"
                            disabled={deleting}
                            onClick={handleDelete}
                        >
                            {deleting && <Loader2 className="animate-spin" />}
                            Delete event
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}