"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";
import { useLoginModal } from "@/providers/login-modal-provider";

interface GuestWelcomeCardProps {
  className?: string;
}

export function GuestWelcomeCard({ className }: GuestWelcomeCardProps) {
  const { t } = useI18n();
  const { openLoginModal } = useLoginModal();

  return (
    <div className={cn("flex gap-3", className)}>
      <button
        onClick={openLoginModal}
        className="flex-1 py-3 text-center font-semibold text-zinc-700 bg-white border-2 border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
      >
        {t("auth.login")}
      </button>
      <Link
        href="/register"
        className="flex-1 py-3 text-center font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
      >
        {t("auth.register")}
      </Link>
    </div>
  );
}
