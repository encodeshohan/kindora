"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { validateEmail } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            toast.error(emailError);
            return;
        }
        setError("");
        setEmail("");
        toast.success("You're subscribed! We'll tell you about new events.");
    };

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="relative overflow-hidden rounded-3xl border bg-card p-8 md:p-14">
                <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/15 blur-3xl" />
                <div className="relative grid items-center gap-8 lg:grid-cols-2">
                    <div className="space-y-3">
                        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <Mail className="size-6" />
                        </span>
                        <h2 className="text-4xl font-light tracking-tight md:text-5xl">
                            Never miss an event
                        </h2>
                        <p className="text-muted-foreground">
                            Get a short note when new community events are announced near you.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-2">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Input
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                aria-label="Email address"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setError("");
                                }}
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? "newsletter-error" : undefined}
                                className="h-9 sm:flex-1"
                            />
                            <Button type="submit" size="lg">
                                Subscribe
                            </Button>
                        </div>
                        {error && (
                            <p id="newsletter-error" role="alert" className="text-sm text-destructive">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}