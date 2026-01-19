"use client";

import { useState } from "react";
import { Ticket, Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";
import { useRedeemCode } from "@/hooks";

export default function RedeemCodePage() {
  const { isAuthenticated } = useAuth();

  const [redeemCode, setRedeemCode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Redeem code mutation
  const redeemCodeMutation = useRedeemCode();

  const handleConfirm = async () => {
    if (!redeemCode.trim()) {
      setMessage({ type: "error", text: "Please enter a redeem code" });
      return;
    }

    setMessage(null);

    try {
      const response = await redeemCodeMutation.mutateAsync({
        RedeemCode: redeemCode.trim(),
      });

      if (response.Code === 0) {
        setMessage({ type: "success", text: response.Message || "Code redeemed successfully!" });
        setRedeemCode("");
      } else {
        setMessage({ type: "error", text: response.Message || "Invalid redeem code" });
      }
    } catch (error) {
      console.error("Failed to redeem code:", error);
      setMessage({ type: "error", text: "Failed to redeem code. Please try again." });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Redeem Code" backHref="/account" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            Please login to access this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header variant="subpage" title="Redeem Code" backHref="/account" />

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Redeem Code Input */}
        <div className="mb-4">
          <div className="flex items-center gap-3 px-4 py-3 border border-zinc-300 rounded-lg bg-white">
            <Ticket className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              placeholder="Redeem Code"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              className="flex-1 focus:outline-none text-zinc-800 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={redeemCodeMutation.isPending}
          className="w-full py-4 bg-primary text-white font-roboto-bold text-base rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {redeemCodeMutation.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          CONFIRM
        </button>
      </main>
    </div>
  );
}
