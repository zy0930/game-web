"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";
import { ProtectedLink } from "@/components/auth";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import router from "next/router";

interface UserData {
  username: string;
  avatar?: string;
  isVerified?: boolean;
  cashBalance: number;
  chipsBalance: number;
  aPoints: number;
}

interface WelcomeCardProps {
  user: UserData;
  className?: string;
}

export function WelcomeCard({ user, className }: WelcomeCardProps) {
  const [imgError, setImgError] = useState(false);
  const { t } = useI18n();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-MY", { minimumFractionDigits: 2 });
  };

  const formatPoints = (amount: number) => {
    return amount.toLocaleString("en-MY");
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-4 overflow-hidden border shadow-lg",
        className
      )}
    >
      {/* Background Image with rounded corners */}
      <div className="absolute inset-1 z-0 overflow-hidden rounded-3xl">
        <Image
          src="/images/profile/profile_background.png"
          alt=""
          fill
          className="object-fill"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Welcome Title */}
        <h2 className="text-[#28323C] font-roboto-regular text-sm mb-3 flex items-baseline gap-1">
          {t("common.welcome")},
          <span className="text-base font-roboto-bold"> {user.username}</span>
          <button
            type="button"
            className="cursor-pointer ml-1 self-center"
            aria-label="Refresh cash"
          >
            <Image
              src="/images/profile/refresh_icon.png"
              alt="Refresh"
              width={12}
              height={12}
              className="object-contain w-5 h-5"
            />
          </button>
        </h2>

        {/* Main Content Row - all items same height */}
        <div className="flex items-stretch gap-2">
          {/* Avatar - matches full height of row */}
          <div className="w-[60px] aspect-square rounded-full overflow-hidden bg-zinc-600 shrink-0 border-2 border-white/20 self-center">
            {!imgError && user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.username}
                width={60}
                height={60}
                className="object-cover w-full h-full"
                onError={() => setImgError(true)}
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xl font-roboto-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Balance Grid - equal width columns */}
          <div className="flex-1 grid grid-rows-3 gap-0 py-1">
            {/* Cash */}
            <div className="flex items-center gap-1">
              <div
                className="w-[52px] rounded-full p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #07635A 0%, #0EC6B4 100%)",
                }}
              >
                <div
                  className="w-full rounded-full px-2 py-0.5 text-white text-[10px] font-roboto-bold text-center whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(180deg, #0EC6B4 0%, #07635A 100%)",
                  }}
                >
                  {t("wallet.cash")}
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-black font-roboto-bold text-xs">
                <span>MYR</span>
                <span>{formatCurrency(user.cashBalance)}</span>
              </div>
            </div>

            {/* Chips */}
            <div className="flex items-center gap-1">
              <div
                className="w-[52px] rounded-full p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #07635A 0%, #0EC6B4 100%)",
                }}
              >
                <div
                  className="w-full rounded-full px-2 py-0.5 text-white text-[10px] font-roboto-bold text-center whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(180deg, #0EC6B4 0%, #07635A 100%)",
                  }}
                >
                  {t("wallet.chips")}
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <Image
                  src="/images/profile/chip_dark.png"
                  alt="Chips"
                  width={14}
                  height={14}
                  className="object-contain"
                />
                <span className="text-black font-roboto-bold text-xs">
                  {formatCurrency(user.chipsBalance)}
                </span>
              </div>
            </div>

            {/* A-Points */}
            <div className="flex items-center gap-1">
              <div
                className="w-[52px] rounded-full p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #07635A 0%, #0EC6B4 100%)",
                }}
              >
                <div
                  className="w-full rounded-full px-2 py-0.5 text-white text-[10px] font-roboto-bold text-center whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(180deg, #0EC6B4 0%, #07635A 100%)",
                  }}
                >
                  {t("wallet.aPoint")}
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <Image
                  src="/images/profile/A1_point_icon.png"
                  alt="A-Points"
                  width={14}
                  height={14}
                  className="object-contain"
                />
                <span className="text-black font-roboto-bold text-xs">
                  {formatPoints(user.aPoints)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-0.5">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/profile/wallet_dark.png"
              alt="Restore"
              width={50}
              height={50}
              className="object-contain w-full h-full cursor-pointer"
              onClick={() => router.push("/restore")}
            />
            <span className="text-xs text-black font-roboto-bold mt-1">
              {t("Restore")}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/profile/coin_bag_dark.png"
              alt="Restore"
              width={50}
              height={50}
              className="object-contain w-full h-full cursor-pointer"
              onClick={() => router.push("/deposit")}
            />
            <span className="text-xs text-black font-roboto-bold mt-1">
              {t("wallet.deposit")}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
