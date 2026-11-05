"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { SOCIAL_LOGIN_FLAG } from "@/lib/constants";

const MAX_AGE_MS = 2 * 60 * 1000;

export default function SocialLoginToast() {
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (!session) return;
        const startedAt = Number(sessionStorage.getItem(SOCIAL_LOGIN_FLAG));
        if (!startedAt) return;
        sessionStorage.removeItem(SOCIAL_LOGIN_FLAG);
        if (Date.now() - startedAt < MAX_AGE_MS) {
            toast.success(`Welcome, ${session.user.name}! You are now logged in.`);
        }
    }, [session]);

    return null;
}