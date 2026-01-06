"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppDownloadBannerProps {
  className?: string;
}

export function AppDownloadBanner({ className }: AppDownloadBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [imgError, setImgError] = useState(false);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "bg-primary px-3 py-2 flex items-center justify-between gap-2",
        className
      )}
    >
      {/* Left: Logo and Text */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {imgError ? (
            <span className="text-xs font-bold text-white">
              A<span className="text-primary">1</span>
            </span>
          ) : (
            <Image
              src="/logo-icon.png"
              alt="A1"
              width={24}
              height={24}
              className="object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate">
            AONE APP
          </span>
          <span className="text-xs text-white/80 truncate">
            Download App Now!
          </span>
        </div>
      </div>

      {/* Center: Download Button */}
      <button
        onClick={() => {
          // TODO: Link to app store
          window.open("#download", "_blank");
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors flex-shrink-0"
      >
        DOWNLOAD NOW
      </button>

      {/* Right: Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="text-white/80 hover:text-white transition-colors flex-shrink-0 p-1"
        aria-label="Close download banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
