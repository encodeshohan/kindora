import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import XLogo from "./XLogo";
import FacebookLogo from "./FacebookLogo";
import InstagramLogo from "./InstagramLogo";
import RedditLogo from "./RedditLogo";

const exploreLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Upcoming Events" },
];

const memberLinks = [
    { href: "/create-event", label: "Create Event" },
    { href: "/manage-events", label: "Manage Events" },
    { href: "/joined-events", label: "Joined Events" },
];

const socialLinks = [
    { href: "https://facebook.com", label: "KINDORA on Facebook", Icon: FacebookLogo },
    { href: "https://instagram.com", label: "KINDORA on Instagram", Icon: InstagramLogo },
    { href: "https://reddit.com", label: "KINDORA on Reddit", Icon: RedditLogo },
    { href: "https://x.com", label: "KINDORA on X", Icon: XLogo },
];

export default function Footer() {
    return (
        <footer className="relative mt-16 overflow-hidden border-t bg-card">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <Logo alwaysShowName />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        KINDORA connects neighbours with cleanups, plantations, donation
                        drives and other community events that make a lasting difference.
                    </p>
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="inline-flex size-10 items-center justify-center rounded-full border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider">
                        Explore
                    </h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {exploreLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider">
                        Get involved
                    </h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {memberLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider">
                        Contact
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <Mail className="size-4 text-primary" />
                            hello@kindora.example
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="size-4 text-primary" />
                            Dhaka, Bangladesh
                        </li>
                    </ul>
                </div>
            </div>

            <div className="relative border-t">
                <p className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-muted-foreground">
                    © 2026 KINDORA. Built for stronger communities.
                </p>
            </div>
        </footer>
    );
}