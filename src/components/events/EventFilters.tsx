"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { EVENT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ALL_TYPES = "all";

const typeItems = [
    { value: ALL_TYPES, label: "All types" },
    ...EVENT_TYPES.map((type) => ({ value: type, label: type })),
];

type Filters = { search: string; type: string; location: string };

function FiltersForm({ initial }: { initial: Filters }) {
    const router = useRouter();
    const [search, setSearch] = useState(initial.search);
    const [type, setType] = useState(initial.type);
    const [location, setLocation] = useState(initial.location);

    const hasActiveFilters = Boolean(
        initial.search || initial.location || initial.type !== ALL_TYPES,
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (type !== ALL_TYPES) params.set("type", type);
        if (location.trim()) params.set("location", location.trim());
        const queryString = params.toString();
        router.push(queryString ? `/events?${queryString}` : "/events");
    };

    const handleReset = () => {
        setSearch("");
        setType(ALL_TYPES);
        setLocation("");
        router.push("/events");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-2xl border bg-card p-4 md:grid-cols-[2fr_1fr_1fr_auto] md:items-start"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="search">Search by title</Label>
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="search"
                        type="search"
                        placeholder="Beach cleanup, tree planting..."
                        maxLength={100}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="type">Event type</Label>
                <div className="flex">
                    <Select
                        value={type}
                        onValueChange={(value) => setType(value ?? ALL_TYPES)}
                        items={typeItems}
                    >
                        <SelectTrigger id="type" className="w-full flex-1">
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                            {typeItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    placeholder="City or area"
                    maxLength={100}
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label aria-hidden="true" className="invisible hidden md:block">
                    Actions
                </Label>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Search />
                        Search
                    </Button>
                    {hasActiveFilters && (
                        <Button type="button" variant="ghost" onClick={handleReset}>
                            <X />
                            Reset
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default function EventFilters() {
    const searchParams = useSearchParams();
    const rawType = searchParams.get("type") ?? ALL_TYPES;

    const initial: Filters = {
        search: searchParams.get("search") ?? "",
        type: typeItems.some((item) => item.value === rawType) ? rawType : ALL_TYPES,
        location: searchParams.get("location") ?? "",
    };

    // The key remounts the form when the URL changes, so the fields always match the URL.
    return <FiltersForm key={searchParams.toString()} initial={initial} />;
}