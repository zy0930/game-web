"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

interface SearchResultCardProps {
  username: string;
  avatar: string;
  onAdd?: () => void;
  isAdding?: boolean;
  isRequested?: boolean;
  className?: string;
}

export function SearchResultCard({
  username,
  avatar,
  onAdd,
  isAdding = false,
  isRequested = false,
  className,
}: SearchResultCardProps) {
  const [imgError, setImgError] = useState(false);
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-[#D4F1F0] rounded-4xl py-4 px-6",
        className
      )}
    >
      <div className="flex items-center gap-5">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-200 shrink-0">
          {!imgError ? (
            <Image
              src={avatar}
              alt={username}
              width={48}
              height={48}
              unoptimized
              className="w-full h-auto object-cover shadow-lg"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#28323C] font-roboto-bold text-lg">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-zinc-800 font-roboto-medium">{username}</span>
      </div>

      {isRequested ? (
        <div className="px-4 py-2 bg-primary text-white text-sm font-roboto-regular rounded-full">
          {t("contact.requested")}
        </div>
      ) : (
        <button
          onClick={onAdd}
          disabled={isAdding}
          className="flex items-center gap-3 px-4 py-2 bg-[#28323C] text-white text-sm font-roboto-regular rounded-full cursor-pointer"
        >
          <Image
            src="/images/icon/add_contact_icon.png"
            alt="AON1E add friend"
            width={24}
            height={24}
            unoptimized
            className="h-6 w-auto object-contain cursor-pointer"
          />
          <span>{t("contact.add")}</span>
        </button>
      )}
    </div>
  );
}
