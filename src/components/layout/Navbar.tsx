import { Suspense } from "react";
import { CalendarDays } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import AuthMenu from "./AuthMenu";
import Logo from "./Logo";
import NavLink from "./NavLink";

const UpcomingLabel = () => (
    <>
        <span className="sm:hidden">Events</span>
        <span className="hidden sm:inline">Upcoming Events</span>
    </>
);

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <nav
                aria-label="Main"
                className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6"
            >
                <div className="flex justify-start">
                    <Logo />
                </div>

                <div className="flex justify-center">
                    <Suspense
                        fallback={
                            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground sm:px-4">
                                <CalendarDays className="size-4" />
                                <UpcomingLabel />
                            </span>
                        }
                    >
                        <NavLink href="/events">
                            <UpcomingLabel />
                        </NavLink>
                    </Suspense>
                </div>

                <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <ThemeToggle />
                    <AuthMenu />
                </div>
            </nav>
        </header>
    );
}