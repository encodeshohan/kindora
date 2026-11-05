import type { ReactNode } from "react";

export default function SectionHeading({
    eyebrow,
    title,
    description,
    as: Heading = "h2",
}: {
    eyebrow: string;
    title: ReactNode;
    description?: string;
    as?: "h1" | "h2";
}) {
    return (
        <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                {eyebrow}
            </p>
            <Heading className="text-4xl font-light tracking-tight md:text-5xl">
                {title}
            </Heading>
            {description && (
                <p className="mt-4 text-muted-foreground">{description}</p>
            )}
        </div>
    );
}