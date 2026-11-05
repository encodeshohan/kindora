import type { Metadata } from "next";
import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Log in to join events and manage your own."
        >
            <Suspense fallback={<Skeleton className="h-80 w-full" />}>
                <LoginForm />
            </Suspense>
        </AuthLayout>
    );
}