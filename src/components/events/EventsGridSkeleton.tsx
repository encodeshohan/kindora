import { Skeleton } from "@/components/ui/skeleton";

export default function EventsGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-hidden="true"
        >
            {Array.from({ length: count }, (_, index) => (
                <div key={index} className="overflow-hidden rounded-xl border bg-card">
                    <Skeleton className="aspect-[16/10] w-full rounded-none" />
                    <div className="space-y-4 p-5">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}