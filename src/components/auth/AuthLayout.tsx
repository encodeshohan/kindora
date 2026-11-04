import type { ReactNode } from "react";
import { CalendarCheck, CalendarPlus, Users } from "lucide-react";

const benefits = [
    {
        icon: Users,
        title: "Join your neighbours",
        text: "Find cleanups, plantations and donation drives close to home.",
    },
    {
        icon: CalendarPlus,
        title: "Create your own events",
        text: "Rally people around a cause you care about in a few minutes.",
    },
    {
        icon: CalendarCheck,
        title: "Keep track of everything",
        text: "See every event you have joined, sorted by date.",
    },
];

export default function AuthLayout({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: ReactNode;
}) {
    return (
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
            <aside className="relative hidden overflow-hidden rounded-3xl border bg-card p-10 lg:block">
                <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="relative space-y-8">
                    <h2 className="text-4xl font-light tracking-tight">
                        Make a difference,{" "}
                        <span className="font-semibold text-primary">one event</span> at a
                        time.
                    </h2>
                    <ul className="space-y-5">
                        {benefits.map(({ icon: Icon, title: benefitTitle, text }) => (
                            <li key={benefitTitle} className="flex gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                    <Icon className="size-5" />
                                </span>
                                <div>
                                    <p className="font-medium">{benefitTitle}</p>
                                    <p className="text-sm text-muted-foreground">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <section className="mx-auto w-full max-w-md">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>
                <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                    {children}
                </div>
            </section>
        </div>
    );
}