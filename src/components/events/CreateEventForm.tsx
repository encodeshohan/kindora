"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { EventFormValues } from "@/lib/types/event";
import { validateEventForm } from "@/lib/validation";
import type { EventFormErrors } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import EventFormFields from "./EventFormFields";

const initialValues: EventFormValues = {
    title: "",
    description: "",
    type: "",
    thumbnail: "",
    location: "",
    date: "",
};

export default function CreateEventForm({ minDate }: { minDate: string }) {
    const router = useRouter();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<EventFormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    const update = (field: keyof EventFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validateEventForm(values, minDate);
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

            const response = await fetch(`${API_URL}/events`, {
                method: "POST",
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
                toast.error(data.message ?? "Could not create the event");
                return;
            }

            toast.success("Event created successfully!");
            setValues(initialValues);
            router.push("/events");
            router.refresh();
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
            <EventFormFields
                idPrefix="create"
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
                    render={<Link href="/events" />}
                    nativeButton={false}
                >
                    Cancel
                </Button>
                <Button type="submit" size="lg" disabled={submitting}>
                    {submitting && <Loader2 className="animate-spin" />}
                    Create event
                </Button>
            </div>
        </form>
    );
}