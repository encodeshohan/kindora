import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
    alwaysShowName = false,
}: {
    alwaysShowName?: boolean;
}) {
    return (
        <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="KINDORA home"
        >
            <Image
                src="/kindora-logo.png"
                alt=""
                width={160}
                height={40}
                priority
                className="h-9 w-auto"
            />
            <span
                className={cn(
                    "text-xl font-bold tracking-tight",
                    alwaysShowName ? "inline" : "hidden lg:inline",
                )}
            >
                KINDORA
            </span>
        </Link>
    );
}