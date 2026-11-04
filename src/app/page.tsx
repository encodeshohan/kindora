import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-light tracking-tight md:text-5xl">
        Home page coming soon
      </h1>
      <Card className="mt-8 max-w-sm">
        <CardHeader>
          <CardTitle>Layout check</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Primary button</Button>
        </CardContent>
      </Card>
    </div>
  );
}