import React from "react";

export const Center = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};
