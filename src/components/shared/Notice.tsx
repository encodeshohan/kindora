import type { ReactNode } from "react";
import { CalendarX } from "lucide-react";

export default function Notice({
    title,
    text,
    children,
}: {
    title: string;
    text: string;
    children?: ReactNode;
}) {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border bg-card p-10 text-center">
            <CalendarX className="size-10 text-primary" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
            {children}
        </div>
    );
}