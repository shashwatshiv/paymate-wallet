"use client";

import { Button } from "@repo/ui/button";

export default function QuickActions() {
  return (
    <div className="space-y-4">
      <Button
        onClick={() => (window.location.href = "/transfer")}
        className="w-full"
        size="lg"
      >
        Add Money
      </Button>
      <Button
        onClick={() => (window.location.href = "/p2p")}
        variant="outline"
        className="w-full"
        size="lg"
      >
        Send Money
      </Button>
    </div>
  );
}
