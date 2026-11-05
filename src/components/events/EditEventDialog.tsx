"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { EventFormValues, IEvent } from "@/lib/types/event";
import { validateEventForm } from "@/lib/validation";
import type { EventFormErrors } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EventFormFields from "./EventFormFields";

const toFormValues = (event: IEvent): EventFormValues => ({
    title: event.title,
    description: event.description,
    type: event.type,
    thumbnail: event.thumbnail,
    location: event.location,
    date: event.date,
});

export default function EditEventDialog({
    event,
    minDate,
}: {
    event: IEvent;
    minDate: string;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(() => toFormValues(event));
    const [errors, setErrors] = useState<EventFormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    const handleOpenChange = (next: boolean) => {
        if (next) {
            setValues(toFormValues(event));
            setErrors({});
        }
        setOpen(next);
    };

    const update = (field: keyof EventFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (formEvent: SubmitEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        const nextErrors = validateEventForm(values, minDate, event.date);
        setErrors(nextErrors);
        const firstError = Object.values(nextErrors)[0];
        if (firstError) {
            toast.error(firstError);
            return;
        }

        setSubmitting(true);
        try {
            const token = await getTokenFromClient();
            if (!token) {
                toast.error("Your session has expired. Please log in again.");
                return;
            }

            const response = await fetch(`${API_URL}/events/${event._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: values.title.trim(),
                    description: values.description.trim(),
                    type: values.type,
                    thumbnail: values.thumbnail.trim(),
                    location: values.location.trim(),
                    date: values.date,
                }),
            });
            const data: { message?: string } = await response
                .json()
                .catch(() => ({}));

            if (!response.ok) {
                toast.error(data.message ?? "Could not update the event");
                if (response.status === 404) router.refresh();
                return;
            }

            toast.success("Event updated successfully");
            setOpen(false);
            router.refresh();
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenChange(true)}
            >
                <Pencil />
                Edit
            </Button>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Update Event</DialogTitle>
                        <DialogDescription>
                            Change the details below. People who joined will see the new
                            information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <EventFormFields
                            idPrefix={`edit-${event._id}`}
                            values={values}
                            errors={errors}
                            minDate={minDate}
                            onChange={update}
                        />
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" size="lg" disabled={submitting}>
                                {submitting && <Loader2 className="animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}