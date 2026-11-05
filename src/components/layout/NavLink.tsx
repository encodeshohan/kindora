"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavLink({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}) {
    const pathname = usePathname();
    const active = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium outline-none transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-4",
                active
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary",
            )}
        >
            <CalendarDays className="size-4 shrink-0" />
            <span>{children}</span>
            {active && (
                <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-primary"
                />
            )}
        </Link>
    );
}