"use client";

import { Button } from "@repo/ui/button";
const CTA = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
      <Button
        onClick={() => (window.location.href = "/auth/signup")}
        size="lg"
        className="px-8 py-4 text-lg"
      >
        Get Started
      </Button>
      <Button
        onClick={() => (window.location.href = "/auth/signin")}
        variant="outline"
        size="lg"
        className="px-8 py-4 text-lg"
      >
        Sign In
      </Button>
    </div>
  );
};

export default CTA;
