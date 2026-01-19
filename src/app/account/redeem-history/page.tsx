"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";
import { useMyRewards } from "@/hooks";
import { cn } from "@/lib/utils";

export default function RedeemHistoryPage() {
  const { isAuthenticated } = useAuth();

  // Fetch my rewards history
  const { data: myRewardsData, isLoading } = useMyRewards({
    enabled: isAuthenticated,
  });

  const rewards = myRewardsData?.Rewards ?? [];

  const formatPoints = (points: number) => {
    return points.toLocaleString("en-US");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        return "bg-primary text-white";
      case "progress":
      case "pending":
      case "processing":
        return "bg-amber-500 text-white";
      case "failed":
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-zinc-500 text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        return "Success";
      case "progress":
      case "pending":
      case "processing":
        return "Progress";
      case "failed":
        return "Failed";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Redeem History" backHref="/account/redeem-gift" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            Please login to access this page
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Redeem History" backHref="/account/redeem-gift" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header variant="subpage" title="Redeem History" backHref="/account/redeem-gift" />

      {/* Rewards History List */}
      <main className="flex-1 overflow-auto">
        {rewards.length > 0 ? (
          <div className="divide-y divide-zinc-200">
            {rewards.map((reward) => (
              <div
                key={reward.Id}
                className="px-4 py-4 flex items-start justify-between"
              >
                {/* Left: Reward Info */}
                <div className="flex-1">
                  <h3 className="text-base font-roboto-medium text-zinc-800">
                    {reward.Name}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    {formatDate(reward.CreatedDate)}
                  </p>
                </div>

                {/* Right: Points & Status */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-roboto-medium text-zinc-800">
                      - {formatPoints(reward.Price)}
                    </span>
                    <Image
                      src="/images/icon/A1_point_icon.png"
                      alt="A-Point"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={cn(
                      "px-3 py-1 text-xs font-roboto-medium rounded-full",
                      getStatusColor(reward.Status)
                    )}
                  >
                    {getStatusLabel(reward.Status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
            <p>No redemption history</p>
          </div>
        )}
      </main>
    </div>
  );
}
