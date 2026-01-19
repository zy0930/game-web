"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rewardApi } from "@/lib/api";
import type { ClaimRewardRequest } from "@/lib/api/types";

// Query keys
export const rewardKeys = {
  all: ["reward"] as const,
  rewards: () => [...rewardKeys.all, "list"] as const,
  myRewards: () => [...rewardKeys.all, "my-rewards"] as const,
};

/**
 * Hook to get available rewards list
 */
export function useRewards(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: rewardKeys.rewards(),
    queryFn: async () => {
      return rewardApi.getRewards();
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to get user's redeemed rewards history
 */
export function useMyRewards(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: rewardKeys.myRewards(),
    queryFn: async () => {
      return rewardApi.getMyRewards();
    },
    staleTime: 30 * 1000, // 30 seconds
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to claim a reward
 */
export function useClaimReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ClaimRewardRequest) => {
      return rewardApi.claimReward(data);
    },
    onSuccess: () => {
      // Invalidate both rewards (to update point balance) and my rewards
      queryClient.invalidateQueries({ queryKey: rewardKeys.rewards() });
      queryClient.invalidateQueries({ queryKey: rewardKeys.myRewards() });
    },
  });
}
