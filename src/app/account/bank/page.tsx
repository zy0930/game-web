"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Header } from "@/components/layout";
import { useI18n } from "@/providers/i18n-provider";
import { useAuth } from "@/providers/auth-provider";
import { useUserBankAccounts } from "@/hooks/use-bank";

export default function BankAccountsPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useUserBankAccounts({
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title={t("account.bankAccount")} backHref="/withdrawal" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            {t("common.loginRequired")}
          </p>
        </div>
      </div>
    );
  }

  const bankAccounts = data?.Rows ?? [];
  const hasBankAccounts = bankAccounts.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="subpage" title={t("account.bankAccount")} backHref="/withdrawal" />

      <main className="flex-1 px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="h-20 rounded-xl bg-white animate-pulse border border-zinc-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <p className="text-sm text-red-500">{t("common.errorLoading")}</p>
          </div>
        ) : hasBankAccounts ? (
          // Bank accounts list
          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <div
                key={account.Id}
                className="bg-white rounded-xl border border-zinc-200 p-4"
              >
                <div className="flex items-center gap-3">
                  {/* Bank Logo */}
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center overflow-hidden shrink-0">
                    {account.BankImage ? (
                      <Image
                        src={account.BankImage}
                        alt={account.BankName}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                        unoptimized
                      />
                    ) : (
                      <span className="text-zinc-600 text-xs font-roboto-bold">
                        {account.BankName.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Bank Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-roboto-medium text-zinc-800">
                      {account.BankName}
                    </p>
                    <p className="text-sm text-zinc-700 font-roboto-medium">
                      {account.No}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {account.Name}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      // TODO: Implement delete functionality
                      console.log("Delete bank account:", account.Id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state - centered card with X icon
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            {/* Card with X icon */}
            <div className="relative mb-4">
              <svg
                width="80"
                height="60"
                viewBox="0 0 80 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-300"
              >
                {/* Card shape */}
                <rect x="5" y="10" width="70" height="45" rx="4" fill="currentColor" />
                <rect x="5" y="20" width="70" height="10" fill="#9CA3AF" />
                {/* X circle */}
                <circle cx="40" cy="32" r="15" fill="#6B7280" />
                <path
                  d="M35 27L45 37M45 27L35 37"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-sm text-zinc-400">
              {t("bank.noBanksAdded")}
            </p>
          </div>
        )}
      </main>

      {/* Add Bank Account Button - Sticky at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-100">
        <button
          type="button"
          onClick={() => router.push("/account/bank/add")}
          className="w-full py-4 bg-primary text-white font-roboto-semibold rounded-xl hover:bg-primary/90 transition-colors uppercase"
        >
          {t("account.addBankAccount")}
        </button>
      </div>
    </div>
  );
}
