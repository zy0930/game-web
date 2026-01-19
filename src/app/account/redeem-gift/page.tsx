"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";
import { useRewards, useClaimReward } from "@/hooks";

export default function RedeemGiftPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  // Fetch rewards
  const { data: rewardsData, isLoading } = useRewards({
    enabled: isAuthenticated,
  });

  // Claim mutation
  const claimReward = useClaimReward();

  const userPoints = rewardsData?.Point ?? 0;
  const pendingCount = rewardsData?.RewardPendingCount ?? 0;
  const rewards = rewardsData?.Rewards ?? [];

  const formatPoints = (points: number) => {
    return points.toLocaleString("en-US");
  };

  const handleClaim = async (rewardId: string, price: number) => {
    if (userPoints < price) {
      setShowInsufficientModal(true);
      return;
    }

    setClaimingId(rewardId);
    try {
      const response = await claimReward.mutateAsync({ Id: rewardId });
      if (response.Code === 0) {
        // Success - could show success modal or navigate to history
        router.push("/account/redeem-history");
      } else {
        alert(response.Message || "Failed to claim reward");
      }
    } catch (error) {
      console.error("Failed to claim reward:", error);
    } finally {
      setClaimingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Redeem Gift" backHref="/account" />
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
        <Header variant="subpage" title="Redeem Gift" backHref="/account" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      {/* Header */}
      <Header variant="subpage" title="Redeem Gift" backHref="/account" />

      {/* Banner */}
      <div className="relative w-full aspect-430/200">
        <Image
          src="/images/redeem_gift_banner.png"
          alt="Redeem Gift"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* Points Balance Card */}
      <div className="mx-6 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-between">
          <span className="text-zinc-700 font-roboto-medium">
            A-Point Balance:
          </span>
          <div className="flex items-center gap-2">
            <Image
              src="/images/icon/A1_point_icon.png"
              alt="A-Point"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-lg font-roboto-bold text-zinc-800">
              {formatPoints(userPoints)}
            </span>
          </div>
        </div>
      </div>

      {/* Redeem History Button */}
      <div className="px-4 mt-4 text-center flex items-center gap-2 justify-center cursor-pointer">
        <span className="text-zinc-400 text-sm">Redeem History</span>
        <ChevronRight className="w-5 h-5 text-zinc-400" />
      </div>

      {/* Rewards Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.Id}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              {/* Reward Image */}
              <div className="relative aspect-square bg-linear-to-b from-[#E8F8F6] to-white p-4">
                <Image
                  src={reward.Image}
                  alt={reward.Name}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>

              {/* Reward Info */}
              <div className="p-3">
                <h3 className="text-sm font-roboto-medium text-zinc-800 line-clamp-2 min-h-[40px]">
                  {reward.Name}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <Image
                    src="/images/icon/A1_point_icon.png"
                    alt="A-Point"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span className="text-sm font-roboto-bold text-zinc-700">
                    {formatPoints(reward.Price)}
                  </span>
                </div>

                {/* Claim Button */}
                <button
                  onClick={() => handleClaim(reward.Id, reward.Price)}
                  disabled={claimingId === reward.Id}
                  className="w-full mt-3 py-2 bg-primary text-white text-sm font-roboto-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {claimingId === reward.Id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Claim"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {rewards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
            <p>No rewards available</p>
          </div>
        )}
      </div>

      {/* Insufficient Points Modal */}
      {showInsufficientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowInsufficientModal(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-roboto-semibold text-zinc-800 mb-2">
              Insufficient A-Point
            </h3>
            <p className="text-zinc-600 mb-6">
              A-Point is not sufficient to claim this gift.
            </p>
            <button
              onClick={() => setShowInsufficientModal(false)}
              className="w-full py-3 bg-primary text-white font-roboto-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
