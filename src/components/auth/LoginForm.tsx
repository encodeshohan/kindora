"use client";

import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl, validateEmail } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import SocialButtons from "./SocialButtons";

const initialForm = { email: "", password: "" };
type FormFieldName = keyof typeof initialForm;
type FormErrors = Partial<Record<FormFieldName, string>>;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackURL"));
    const hasSocialError = Boolean(searchParams.get("error"));
    const { data: session } = authClient.useSession();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (hasSocialError) {
            toast.error("Social login failed. Please try again.");
        }
    }, [hasSocialError]);

    useEffect(() => {
        if (session) {
            router.replace(callbackUrl);
        }
    }, [session, callbackUrl, router]);

    const update = (field: FormFieldName, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): FormErrors => {
        const next: FormErrors = {};
        const emailError = validateEmail(form.email);
        if (emailError) next.email = emailError;
        if (!form.password) next.password = "Password is required";
        return next;
    };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        const firstError = Object.values(nextErrors)[0];
        if (firstError) {
            toast.error(firstError);
            return;
        }

        setSubmitting(true);
        const { error } = await authClient.signIn.email({
            email: form.email.trim(),
            password: form.password,
        });
        setSubmitting(false);

        if (error) {
            toast.error(error.message ?? "Invalid email or password");
            return;
        }
        toast.success("Welcome back! You are now logged in.");
        router.push(callbackUrl);
        router.refresh();
    };

    const registerHref =
        callbackUrl === "/"
            ? "/register"
            : `/register?callbackURL=${encodeURIComponent(callbackUrl)}`;

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

                <FormField id="password" label="Password" error={errors.password}>
                    <PasswordInput
                        id="password"
                        autoComplete="current-password"
                        placeholder="Your password"
                        value={form.password}
                        onChange={(event) => update("password", event.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                </FormField>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting && <Loader2 className="animate-spin" />}
                    Login
                </Button>
            </form>

            <SocialButtons callbackUrl={callbackUrl} />

            <p className="mt-6 text-center text-sm text-muted-foreground">
                New to KINDORA?{" "}
                <Link href={registerHref} className="font-medium text-primary hover:underline">
                    Create an account
                </Link>
            </p>
        </div>
    );
}