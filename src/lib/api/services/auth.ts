import { apiClient } from "../client";
import { API_CONFIG } from "../config";
import type {
  GetUplineResponse,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
} from "../types";

export const authApi = {
  /**
   * Login user and get access token
   * POST /token (form-urlencoded)
   */
  async login(
    username: string,
    password: string,
    options?: {
      fcmToken?: string;
      deviceId?: string;
    }
  ): Promise<LoginResponse> {
    return apiClient.postForm<LoginResponse>("/token", {
      username,
      password,
      grant_type: "password",
      fcm_token: options?.fcmToken || "",
      fcm_platform: API_CONFIG.platform,
      fcm_deviceid: options?.deviceId || "",
    }, {
      authenticated: false,
    });
  },

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
