import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailsSkeleton() {
    return (
        <div
            className="mx-auto max-w-7xl px-6 py-10 md:py-14"
            aria-hidden="true"
        >
            <Skeleton className="mb-6 h-9 w-40" />
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6">
                    <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
                    <Skeleton className="h-12 w-3/4" />
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
                <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
        </div>
    );
}