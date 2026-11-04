import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2" aria-label="KINDORA home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HeartHandshake className="size-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">KINDORA</span>
        </Link>
    );
}