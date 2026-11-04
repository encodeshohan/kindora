import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]" aria-hidden="true">
            <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8">
                <Skeleton className="size-24 rounded-full" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-52" />
            </div>
            <div className="space-y-5 rounded-2xl border bg-card p-8">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-32" />
            </div>
        </div>
    );
}