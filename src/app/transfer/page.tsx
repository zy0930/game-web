"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, KeyRound, Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";
import { useTransferInfo, usePostTransfer } from "@/hooks/use-contact";

export default function TransferPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Get target ID from query param
  const targetId = searchParams.get("id") || "";

  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [imgError, setImgError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch transfer info
  const { data: transferInfo, isLoading, error } = useTransferInfo(targetId, {
    enabled: isAuthenticated && !!targetId,
  });

  // Transfer mutation
  const postTransfer = usePostTransfer();

  const handleTransfer = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!targetId || !amount || !pin) return;

    try {
      const response = await postTransfer.mutateAsync({
        Id: targetId,
        Amount: parseFloat(amount),
        Pin: pin,
      });

      if (response.Code === 0) {
        setShowConfirm(false);
        setShowSuccess(true);
      } else {
        // Show error message from API
        alert(response.Message || "Transfer failed");
        setShowConfirm(false);
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setShowConfirm(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push("/account/contact");
  };

  const formattedAmount = amount ? parseFloat(amount).toFixed(2) : "0.00";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Transfer" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            Please login to access this page
          </p>
        </div>
      </div>
    );
  }

  if (!targetId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Transfer" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            No recipient selected. Please select a contact to transfer to.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Transfer" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !transferInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Transfer" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-red-500 text-center">
            Failed to load transfer information
          </p>
        </div>
      </div>
    );
  }

  const displayName = transferInfo.Name || transferInfo.Username;
  const availableCash = transferInfo.AvailableCash ?? 0;
  const currency = transferInfo.Currency || "MYR";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header variant="subpage" title="Transfer" backHref="/account/contact" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Contact Avatar & Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-200 mb-4">
            {!imgError && transferInfo.Image ? (
              <Image
                src={transferInfo.Image}
                alt={displayName}
                width={96}
                height={96}
                unoptimized
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 font-roboto-bold text-2xl">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-xl font-roboto-semibold text-zinc-800 mb-1">{displayName}</h2>
          <span className="text-sm text-zinc-500">UID: {transferInfo.Username}</span>
        </div>

        {/* Amount Field */}
        <div className="mb-2">
          <div className="flex items-center gap-3 px-4 py-3 border border-zinc-300 rounded-lg bg-white">
            <CreditCard className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="number"
              placeholder="Min. MYR 10/ Max. MYR 30,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 focus:outline-none text-zinc-800 placeholder:text-zinc-400"
            />
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            Available Balance: <span className="text-primary font-roboto-medium">{currency} {availableCash.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </p>
        </div>

        {/* PIN Field */}
        <div className="mb-6">
          <div className="flex items-center gap-3 px-4 py-3 border border-zinc-300 rounded-lg bg-white">
            <KeyRound className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
              className="flex-1 focus:outline-none text-zinc-800 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          disabled={!amount || !pin || postTransfer.isPending}
          className="w-full py-4 bg-primary text-white font-roboto-bold text-base rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          TRANSFER
        </button>
      </main>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !postTransfer.isPending && setShowConfirm(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-full max-w-sm">
            <p className="text-center text-zinc-800 mb-6">
              Confirm transfer <span className="text-primary font-roboto-medium">{currency} {formattedAmount}</span> to your friend <span className="text-primary font-roboto-medium">{displayName}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={postTransfer.isPending}
                className="flex-1 py-3 bg-dark text-white font-roboto-medium rounded-lg hover:bg-dark/90 transition-colors disabled:opacity-50"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirm}
                disabled={postTransfer.isPending}
                className="flex-1 py-3 bg-primary text-white font-roboto-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {postTransfer.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleSuccessClose}
          />
          <div className="relative bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-roboto-semibold text-zinc-800 mb-2">Transfer Successful!</h3>
            <p className="text-zinc-600 mb-6">
              {currency} {formattedAmount} has been transferred to {displayName}.
            </p>
            <button
              onClick={handleSuccessClose}
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
