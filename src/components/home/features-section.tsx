import { CalendarCheck, CalendarPlus, ClipboardList, Search } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
    {
        icon: Search,
        title: "Discover Events",
        text: "Browse upcoming events and filter them by type or location.",
    },
    {
        icon: CalendarCheck,
        title: "Join in One Click",
        text: "Log in and reserve your spot. You can never join the same event twice.",
    },
    {
        icon: CalendarPlus,
        title: "Host Your Own",
        text: "Create an event with a date, a place and a photo, then update it any time.",
    },
    {
        icon: ClipboardList,
        title: "Stay Organised",
        text: "Every event you have joined is listed in one place, sorted by date.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <SectionHeading
                eyebrow="Why KINDORA"
                title="Everything You Need To Take Part"
                description="From finding the right cause to keeping track of your commitments, we keep it simple."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map(({ icon: Icon, title, text }) => (
                    <div
                        key={title}
                        className="rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50"
                    >
                        <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <Icon className="size-6" />
                        </span>
                        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                            {text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}