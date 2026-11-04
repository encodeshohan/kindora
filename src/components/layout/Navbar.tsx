import { Suspense } from "react";
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
                className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6"
            >
                <Logo />
                <div className="flex items-center gap-1 sm:gap-2">
                    <Suspense
                        fallback={
                            <span className="px-2 py-2 text-sm font-medium text-muted-foreground sm:px-3">
                                <UpcomingLabel />
                            </span>
                        }
                    >
                        <NavLink href="/events">
                            <UpcomingLabel />
                        </NavLink>
                    </Suspense>
                    <ThemeToggle />
                    <AuthMenu />
                </div>
            </nav>
        </header>
    );
}