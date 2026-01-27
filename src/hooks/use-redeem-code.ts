"use client";

import { useMutation } from "@tanstack/react-query";
import { bankApi } from "@/lib/api";
import type { RedeemCodeRequest } from "@/lib/api/types";

/**
 * Hook to submit a redeem code
 */
export function useRedeemCode() {
  return useMutation({
    mutationFn: async (data: RedeemCodeRequest) => {
      return bankApi.redeemCodeSubmit(data);
    },
  });
}
