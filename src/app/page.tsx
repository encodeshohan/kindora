import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-light tracking-tight md:text-5xl">
          KINDORA
        </h1>
        <ThemeToggle />
      </div>
      <Card className="mt-8 max-w-sm">
        <CardHeader>
          <CardTitle>Theme check</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Primary button</Button>
        </CardContent>
      </Card>
    </main>
  );
}