"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
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
                "rounded-md px-2 py-2 text-sm font-medium transition-colors hover:text-primary sm:px-3",
                active ? "text-primary" : "text-muted-foreground",
            )}
        >
            {children}
        </Link>
    );
}