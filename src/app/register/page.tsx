import type { Metadata } from "next";
import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Create Your Account"
            subtitle="Join KINDORA and Start Making a Difference."
        >
            <Suspense fallback={<Skeleton className="h-[34rem] w-full" />}>
                <RegisterForm />
            </Suspense>
        </AuthLayout>
    );
}