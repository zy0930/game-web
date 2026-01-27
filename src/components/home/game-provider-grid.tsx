"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameProvider {
  id: string;
  name: string;
  image: string;
  href?: string;
  isHot?: boolean;
  isNew?: boolean;
  badge?: string;
}

interface GameProviderGridProps {
  providers: GameProvider[];
  className?: string;
  onSelect?: (provider: GameProvider) => void;
  loadingId?: string | null;
}

export function GameProviderGrid({
  providers,
  className,
  onSelect,
  loadingId = null,
}: GameProviderGridProps) {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setImgErrors((prev) => new Set(prev).add(id));
  };

  const renderCardContent = (provider: GameProvider) => (
    <>
      {/* Background Image */}
      {!imgErrors.has(provider.id) ? (
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          className="object-cover cursor-pointer"
          onError={() => handleImageError(provider.id)}
          unoptimized
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
          <span className="text-white text-xs font-roboto-medium text-center px-2">
            {provider.name}
          </span>
        </div>
      )}

      {/* Hot Badge */}
      {provider.isHot && (
        <span
          className="absolute top-0 right-0 text-center px-1.5 py-px text-white text-[9px] font-roboto-medium rounded-l-full"
          style={{
            background: "linear-gradient(180deg, #F9D85A 0%, #FA6625 100%)",
          }}
        >
          Hot
        </span>
      )}

      {/* New Badge */}
      {provider.isNew && (
        <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-roboto-bold rounded">
          New
        </span>
      )}

      {/* Custom Badge */}
      {provider.badge && !provider.isHot && !provider.isNew && (
        <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-primary text-white text-[10px] font-roboto-bold rounded">
          {provider.badge}
        </span>
      )}

      {/* Loading Overlay */}
      {loadingId === provider.id && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}
    </>
  );

  return (
    <div className={cn("grid gap-1 max-[380px]:grid-cols-3 grid-cols-4", className)}>
      {providers.map((provider) =>
        onSelect ? (
          <button
            key={provider.id}
            type="button"
            onClick={() => onSelect(provider)}
            className={cn(
              "relative aspect-8/10 overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50",
              provider.isHot ? "rounded-l-lg rounded-b-lg" : "rounded-lg"
            )}
            disabled={loadingId === provider.id}
          >
            {renderCardContent(provider)}
          </button>
        ) : (
          <Link
            key={provider.id}
            href={provider.href || "#"}
            className={cn(
              "relative aspect-square overflow-hidden group",
              provider.isHot ? "rounded-l-xl" : "rounded-xl"
            )}
          >
            {renderCardContent(provider)}
          </Link>
        )
      )}
    </div>
  );
}
