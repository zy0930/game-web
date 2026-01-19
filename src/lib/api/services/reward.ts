import { apiClient } from "../client";
import type {
  GetRewardsResponse,
  GetMyRewardsResponse,
  ClaimRewardRequest,
  ClaimRewardResponse,
} from "../types";

export const rewardApi = {
  /**
   * Get available rewards list
   * GET /api/mapireward/getrewards
   */
  async getRewards(): Promise<GetRewardsResponse> {
    return apiClient.get<GetRewardsResponse>("/api/mapireward/getrewards", {
      authenticated: true,
    });
  },

  /**
   * Get user's redeemed rewards history
   * GET /api/mapireward/getmyrewards
   */
  async getMyRewards(): Promise<GetMyRewardsResponse> {
    return apiClient.get<GetMyRewardsResponse>("/api/mapireward/getmyrewards", {
      authenticated: true,
    });
  },

  /**
   * Claim a reward
   * POST /api/mapireward/claimreward
   */
  async claimReward(data: ClaimRewardRequest): Promise<ClaimRewardResponse> {
    return apiClient.post<ClaimRewardResponse>("/api/mapireward/claimreward", data, {
      authenticated: true,
    });
  },
};
