"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactListItemProps {
  username: string;
  avatar: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function ContactListItem({
  username,
  avatar,
  onClick,
  className,
  disabled,
}: ContactListItemProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-5 py-3 px-4 bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 shrink-0">
        {!imgError ? (
          <Image
            src={avatar}
            alt={username}
            width={48}
            height={48}
            unoptimized
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 font-roboto-bold text-lg">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-[#28323C] font-roboto-regular text-sm">{username}</span>
    </button>
  );
}
