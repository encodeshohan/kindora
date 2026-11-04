"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    CalendarCheck,
    CalendarPlus,
    ClipboardList,
    LogOut,
    UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("") || "U";

export default function AuthMenu() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        const { error } = await authClient.signOut();
        if (error) {
            toast.error(error.message ?? "Logout failed. Please try again.");
            return;
        }
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return <Skeleton className="size-9 rounded-full" />;
    }

    if (!session) {
        return (
            <Button size="lg" render={<Link href="/login" />} nativeButton={false}>
                Login
            </Button>
        );
    }

    const { user } = session;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button
                        type="button"
                        title={user.name}
                        aria-label={`Account menu for ${user.name}`}
                        className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                }
            >
                <Avatar className="size-9">
                    <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                    />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <div className="px-2 py-1.5">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/profile" />}>
                    <UserRound />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/create-event" />}>
                    <CalendarPlus />
                    Create Event
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/manage-events" />}>
                    <ClipboardList />
                    Manage Events
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/joined-events" />}>
                    <CalendarCheck />
                    Joined Events
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}