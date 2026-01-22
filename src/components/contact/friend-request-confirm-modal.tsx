"use client";

import { useEffect } from "react";
import { useI18n } from "@/providers/i18n-provider";

interface FriendRequestConfirmModalProps {
  isOpen: boolean;
  type: "reject" | "cancel";
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function FriendRequestConfirmModal({
  isOpen,
  type,
  onConfirm,
  onClose,
  isLoading = false,
}: FriendRequestConfirmModalProps) {
  const { t } = useI18n();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isReject = type === "reject";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Message */}
        <p className="text-center text-[#28323C] font-roboto-medium text-base mb-6">
          {isReject ? t("contact.confirmReject") : t("contact.confirmCancel")}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 bg-[#28323C] text-white font-roboto-bold text-sm rounded-lg cursor-pointer disabled:opacity-50"
          >
            {isReject ? t("common.cancel").toUpperCase() : t("contact.no")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-red-500 text-white font-roboto-bold text-sm rounded-lg cursor-pointer disabled:opacity-50"
          >
            {isReject ? t("contact.reject") : t("contact.yes")}
          </button>
        </div>
      </div>
    </div>
  );
}
