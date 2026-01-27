"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

interface FriendRequestItemProps {
  username: string;
  avatar: string;
  type: "incoming" | "outgoing";
  onApprove?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function FriendRequestItem({
  username,
  avatar,
  type,
  onApprove,
  onReject,
  onCancel,
  className,
}: FriendRequestItemProps) {
  const [imgError, setImgError] = useState(false);
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "flex items-center justify-between py-4 px-6 bg-white",
        className
      )}
    >
      <div className="flex items-center gap-5 bg-white">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-white shrink-0">
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
            <div className="w-full h-full flex items-center justify-center text-[#28323C] font-roboto-regular text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-[#28323C] font-roboto-regular text-sm">
          {username}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {type === "incoming" ? (
          <>
            <button
              onClick={onReject}
              className="flex items-center gap-3 px-4 py-2.5 text-white text-sm font-roboto-regular rounded-lg cursor-pointer bg-red-500"
            >
              {t("contact.reject")}
            </button>
            <button
              onClick={onApprove}
              className="flex items-center gap-3 px-4 py-2.5 text-white text-sm font-roboto-regular rounded-lg cursor-pointer bg-primary"
            >
              {t("contact.approve")}
            </button>
          </>
        ) : (
          <button
            onClick={onCancel}
            className="flex items-center gap-3 px-4 py-2.5 text-white text-sm font-roboto-regular rounded-lg cursor-pointer bg-red-500"
          >
            {t("contact.cancel")}
          </button>
        )}
      </div>
    </div>
  );
}
