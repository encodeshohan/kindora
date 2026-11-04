"use client";

import "./globals.css";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <html lang="en" className="dark">
            <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
                <div className="max-w-md space-y-5 text-center">
                    <h1 className="text-4xl font-light tracking-tight">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        KINDORA ran into an unexpected problem. Please try again.
                    </p>
                    <Button size="lg" onClick={reset}>
                        Try again
                    </Button>
                </div>
            </body>
        </html>
    );
}