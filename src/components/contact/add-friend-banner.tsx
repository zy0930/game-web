"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

interface AddFriendBannerProps {
  requestCount?: number;
  onClick?: () => void;
  className?: string;
}

export function AddFriendBanner({
  requestCount = 0,
  onClick,
  className,
}: AddFriendBannerProps) {
  const { t } = useI18n();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between bg-primary px-4 py-3 cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/images/icon/add_contact_icon.png"
          alt="Add Friend"
          width={24}
          height={24}
          unoptimized
          className="w-6 h-6 object-contain"
        />
        <span className="text-white font-roboto-medium">{t("contact.addNewFriend")}</span>
      </div>
      <div className="flex items-center gap-2">
        {requestCount > 0 && (
          <span className="mr-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center bg-[linear-gradient(180deg,#E42A2A_0%,#AD1D1D_100%)]">
            {requestCount}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-white" />
      </div>
    </button>
  );
}
