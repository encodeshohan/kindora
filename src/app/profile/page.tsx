import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import SectionHeading from "@/components/shared/SectionHeading";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "Profile" };

async function ProfileContent() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login?callbackURL=%2Fprofile");
    }

    const { user } = session;
    return (
        <ProfileForm
            user={{ name: user.name, email: user.email, image: user.image ?? "" }}
        />
    );
}

export default function ProfilePage() {
    return (
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <SectionHeading
                eyebrow="Your account"
                title="Your profile"
                description="Keep your name and photo up to date so neighbours know who is hosting."
            />
            <Suspense fallback={<ProfileSkeleton />}>
                <ProfileContent />
            </Suspense>
        </div>
    );
}