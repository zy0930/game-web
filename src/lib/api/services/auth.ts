import { apiClient } from "../client";
import type {
  GetUplineResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types";

export const authApi = {
  /**
   * Get upline/referral info by referral code
   * POST /api/mapiuser/Register_GetUpline
   */
  async getUpline(referralCode: string): Promise<GetUplineResponse> {
    return apiClient.post<GetUplineResponse>("/api/mapiuser/Register_GetUpline", {
      Id: referralCode,
    }, {
      authenticated: false,
    });
  },

  /**
   * Register a new user
   * POST /api/mapiuser/Register
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>("/api/mapiuser/Register", data, {
      authenticated: false,
    });
  },
};
