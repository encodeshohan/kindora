"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
    getSafeCallbackUrl,
    validateEmail,
    validateName,
    validatePassword,
    validatePhotoUrl,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import SocialButtons from "./SocialButtons";

const initialForm = { name: "", email: "", photoURL: "", password: "" };
type FormFieldName = keyof typeof initialForm;
type FormErrors = Partial<Record<FormFieldName, string>>;

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackURL"));
    const { data: session } = authClient.useSession();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (session) {
            router.replace(callbackUrl);
        }
    }, [session, callbackUrl, router]);

    const update = (field: FormFieldName, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const passwordRules = [
        { label: "At least 6 characters", met: form.password.length >= 6 },
        { label: "One uppercase letter", met: /[A-Z]/.test(form.password) },
        { label: "One lowercase letter", met: /[a-z]/.test(form.password) },
    ];

    const validate = (): FormErrors => {
        const next: FormErrors = {};
        const nameError = validateName(form.name);
        const emailError = validateEmail(form.email);
        const photoError = validatePhotoUrl(form.photoURL);
        const passwordError = validatePassword(form.password);
        if (nameError) next.name = nameError;
        if (emailError) next.email = emailError;
        if (photoError) next.photoURL = photoError;
        if (passwordError) next.password = passwordError;
        return next;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        const firstError = Object.values(nextErrors)[0];
        if (firstError) {
            toast.error(firstError);
            return;
        }

        setSubmitting(true);
        const { error } = await authClient.signUp.email({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
            image: form.photoURL.trim(),
        });
        setSubmitting(false);

        if (error) {
            toast.error(error.message ?? "Could not create your account");
            return;
        }
        toast.success("Account created! Welcome to KINDORA.");
        router.push(callbackUrl);
        router.refresh();
    };

    const loginHref =
        callbackUrl === "/"
            ? "/login"
            : `/login?callbackURL=${encodeURIComponent(callbackUrl)}`;

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField id="name" label="Full name" error={errors.name}>
                    <Input
                        id="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                </FormField>

                <FormField id="email" label="Email" error={errors.email}>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                </FormField>

                <FormField id="photoURL" label="Photo URL" error={errors.photoURL}>
                    <Input
                        id="photoURL"
                        type="url"
                        autoComplete="photo"
                        placeholder="https://example.com/your-photo.jpg"
                        value={form.photoURL}
                        onChange={(event) => update("photoURL", event.target.value)}
                        aria-invalid={Boolean(errors.photoURL)}
                        aria-describedby={errors.photoURL ? "photoURL-error" : undefined}
                    />
                </FormField>

                <FormField id="password" label="Password" error={errors.password}>
                    <PasswordInput
                        id="password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={(event) => update("password", event.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <ul className="space-y-1 pt-1 text-xs">
                        {passwordRules.map((rule) => (
                            <li
                                key={rule.label}
                                className={cn(
                                    "flex items-center gap-1.5",
                                    rule.met ? "text-primary" : "text-muted-foreground",
                                )}
                            >
                                {rule.met ? (
                                    <Check className="size-3.5" />
                                ) : (
                                    <X className="size-3.5" />
                                )}
                                {rule.label}
                            </li>
                        ))}
                    </ul>
                </FormField>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting && <Loader2 className="animate-spin" />}
                    Create account
                </Button>
            </form>

            <SocialButtons callbackUrl={callbackUrl} />

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href={loginHref} className="font-medium text-primary hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}