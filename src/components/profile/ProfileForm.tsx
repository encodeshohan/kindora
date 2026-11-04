"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/format";
import { validateName, validatePhotoUrl } from "@/lib/validation";
import FormField from "@/components/auth/FormField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProfileUser = { name: string; email: string; image: string };
type ProfileErrors = { name?: string; image?: string };

export default function ProfileForm({ user }: { user: ProfileUser }) {
    const router = useRouter();
    const [saved, setSaved] = useState(user);
    const [form, setForm] = useState({ name: user.name, image: user.image });
    const [errors, setErrors] = useState<ProfileErrors>({});
    const [submitting, setSubmitting] = useState(false);

    const hasChanges =
        form.name.trim() !== saved.name || form.image.trim() !== saved.image;

    const update = (field: "name" | "image", value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleDiscard = () => {
        setForm({ name: saved.name, image: saved.image });
        setErrors({});
    };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: ProfileErrors = {};
        const nameError = validateName(form.name);
        const imageError = validatePhotoUrl(form.image);
        if (nameError) nextErrors.name = nameError;
        if (imageError) nextErrors.image = imageError;
        setErrors(nextErrors);
        const firstError = Object.values(nextErrors)[0];
        if (firstError) {
            toast.error(firstError);
            return;
        }

        const name = form.name.trim();
        const image = form.image.trim();

        setSubmitting(true);
        const { error } = await authClient.updateUser({ name, image });
        setSubmitting(false);

        if (error) {
            toast.error(error.message ?? "Could not update your profile");
            return;
        }

        setSaved((prev) => ({ ...prev, name, image }));
        setForm({ name, image });
        toast.success("Profile updated successfully");
        router.refresh();
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
            <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
                <Avatar className="size-24">
                    <AvatarImage
                        src={form.image.trim() || undefined}
                        alt={saved.name}
                        referrerPolicy="no-referrer"
                    />
                    <AvatarFallback className="text-2xl">
                        {getInitials(saved.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0 max-w-full">
                    <p className="truncate text-xl font-semibold">{saved.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                        {saved.email}
                    </p>
                </div>
                <p className="text-xs text-muted-foreground">
                    The photo above is a live preview of the URL you type.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6 rounded-2xl border bg-card p-6 sm:p-8"
            >
                <div>
                    <h2 className="text-xl font-semibold">Edit profile</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Your new name appears on events you create from now on. Events you
                        already created keep the name they were created with.
                    </p>
                </div>

                <FormField id="name" label="Full name" error={errors.name}>
                    <Input
                        id="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                </FormField>

                <FormField id="email" label="Email">
                    <Input id="email" value={saved.email} disabled readOnly />
                    <p className="text-xs text-muted-foreground">
                        Your email is used to sign in and can’t be changed here.
                    </p>
                </FormField>

                <FormField id="image" label="Photo URL" error={errors.image}>
                    <Input
                        id="image"
                        type="url"
                        autoComplete="photo"
                        placeholder="https://example.com/your-photo.jpg"
                        value={form.image}
                        onChange={(event) => update("image", event.target.value)}
                        aria-invalid={Boolean(errors.image)}
                        aria-describedby={errors.image ? "image-error" : undefined}
                    />
                </FormField>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    {hasChanges && (
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            disabled={submitting}
                            onClick={handleDiscard}
                        >
                            Discard changes
                        </Button>
                    )}
                    <Button
                        type="submit"
                        size="lg"
                        disabled={submitting || !hasChanges}
                    >
                        {submitting && <Loader2 className="animate-spin" />}
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    );
}