import { cn } from "@/lib/utils";
import React from "react";

interface DotBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function DotBackground({ children, className }: DotBackgroundProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]", // Darker dots for black background
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-darkBackground [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}