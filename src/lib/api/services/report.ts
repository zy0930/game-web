import { apiClient } from "../client";
import type {
  GameRecordSelectionsResponse,
  GameRecordsResponse,
  TurnoverGameSelectionsResponse,
  TurnoverReportResponse,
} from "../types";

export interface GetGameRecordsParams {
  StartDt: string;
  EndDt: string;
  Game: string;
  PageNumber?: number;
}

export interface GetTurnoverParams {
  StartDt: string;
  EndDt: string;
  Game: string;
  PageNumber?: number;
}

export const reportApi = {
  /**
   * Get game selections for game record filter
   * GET /api/mapireport/getgamerecordsgameselections
   */
  async getGameRecordSelections(): Promise<GameRecordSelectionsResponse> {
    return apiClient.get<GameRecordSelectionsResponse>(
      "/api/mapireport/getgamerecordsgameselections",
      { authenticated: true }
    );
  },

  /**
   * Get game records with filters
   * GET /api/mapireport/getgamerecords?StartDt=...&EndDt=...&Game=...&PageNumber=1
   */
  async getGameRecords(params: GetGameRecordsParams): Promise<GameRecordsResponse> {
    const queryParams = new URLSearchParams({
      StartDt: params.StartDt,
      EndDt: params.EndDt,
      Game: params.Game,
      PageNumber: String(params.PageNumber || 1),
    });

    return apiClient.get<GameRecordsResponse>(
      `/api/mapireport/getgamerecords?${queryParams.toString()}`,
      { authenticated: true }
    );
  },

  /**
   * Get game selections for turnover report filter
   * GET /api/mapireport/GetGameSelections
   */
  async getTurnoverGameSelections(): Promise<TurnoverGameSelectionsResponse> {
    return apiClient.get<TurnoverGameSelectionsResponse>(
      "/api/mapireport/GetGameSelections",
      { authenticated: true }
    );
  },

  /**
   * Get turnover records with filters
   * GET /api/mapireport/getturnover?StartDt=...&EndDt=...&Game=...&PageNumber=1
   */
  async getTurnover(params: GetTurnoverParams): Promise<TurnoverReportResponse> {
    const queryParams = new URLSearchParams({
      StartDt: params.StartDt,
      EndDt: params.EndDt,
      Game: params.Game,
      PageNumber: String(params.PageNumber || 1),
    });

    return apiClient.get<TurnoverReportResponse>(
      `/api/mapireport/getturnover?${queryParams.toString()}`,
      { authenticated: true }
    );
  },
};
