import { Skeleton } from "@/components/ui/skeleton";

export default function ManageEventsSkeleton() {
    return (
        <div className="space-y-4" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border bg-card p-4"
                >
                    <Skeleton className="h-12 w-16 shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="hidden h-8 w-40 md:block" />
                </div>
            ))}
        </div>
    );
}