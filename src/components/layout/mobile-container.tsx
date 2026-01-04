"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-muted flex justify-center">
      <div
        id="mobile-container"
        className={cn(
          "w-full max-w-[430px] min-h-screen bg-background shadow-xl relative",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
