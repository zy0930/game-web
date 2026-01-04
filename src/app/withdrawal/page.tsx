"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { Plus, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

// Mock user data
const userData = {
  cashBalance: 126000.0,
  turnover: 0.0,
  turnoverTarget: 55.0,
};

// Bank accounts
const bankAccounts = [
  {
    id: "bankislam",
    name: "Bank Islam",
    icon: "BI",
    color: "bg-red-600",
    accountName: "Designer",
    accountNo: "14069010051044",
  },
];

export default function WithdrawalPage() {
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0]);
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const { t } = useI18n();

  const handleSubmit = () => {
    console.log({
      bank: selectedBank.id,
      amount,
      pin,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-MY", { minimumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      {/* Header */}
      <Header variant="subpage" title={t("withdrawal.title")} backHref="/deposit" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 py-4">
        {/* Bank Account Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-zinc-700 mb-2 block">
            {t("withdrawal.bankAccount")}<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {bankAccounts.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className="flex flex-col items-center"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all relative",
                    bank.color,
                    selectedBank.id === bank.id
                      ? "border-primary"
                      : "border-transparent"
                  )}
                >
                  <span className="text-white text-xs font-bold">{bank.icon}</span>
                  {selectedBank.id === bank.id && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-1",
                  selectedBank.id === bank.id ? "text-primary font-medium" : "text-zinc-500"
                )}>
                  {bank.name}
                </span>
              </button>
            ))}
            {/* Add Bank Button */}
            <button className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-lg border-2 border-dashed border-zinc-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Plus className="w-6 h-6 text-primary" />
              </div>
            </button>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="bg-white rounded-xl border border-zinc-200 p-4 mb-6">
          {/* Name Row */}
          <div className="flex items-center py-2 border-b border-zinc-100">
            <span className="text-sm text-zinc-500 w-24">{t("common.name")}</span>
            <span className="text-sm text-zinc-700">: {selectedBank.accountName}</span>
          </div>

          {/* Account No Row */}
          <div className="flex items-center py-2">
            <span className="text-sm text-zinc-500 w-24">{t("common.accountNo")}</span>
            <span className="text-sm text-zinc-700">: {selectedBank.accountNo}</span>
          </div>
        </div>

        {/* Enter Amount */}
        <div className="mb-2">
          <label className="text-sm font-medium text-zinc-700 mb-2 block">
            {t("withdrawal.enterAmount")}<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M9 9h6M9 15h6" />
              </svg>
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder={t("deposit.minMax")}
              className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-lg text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Available Balance */}
        <div className="mb-2">
          <span className="text-sm text-zinc-500">{t("withdrawal.availableBalance")}: </span>
          <span className="text-sm text-primary font-medium">MYR {formatCurrency(userData.cashBalance)}</span>
        </div>

        {/* Turnover / Target */}
        <div className="mb-6">
          <p className="text-sm text-zinc-500">{t("withdrawal.turnoverTarget")}</p>
          <p className="text-sm text-zinc-700">{formatCurrency(userData.turnover)} / {formatCurrency(userData.turnoverTarget)}</p>
        </div>

        {/* PIN Input */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="w-5 h-5 text-zinc-400" />
            </div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder={t("withdrawal.pin")}
              maxLength={6}
              className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-lg text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-zinc-700 mb-3">{t("deposit.importantNotice")}</h3>
          <div className="space-y-1 text-sm text-zinc-500 mb-4">
            <p>{t("withdrawal.minMaxLimit")}: MYR 50.00/50,000.00</p>
            <p>{t("withdrawal.dailyLimit")}: MYR 50,000.00</p>
            <p>{t("withdrawal.dailyCount")}: 10</p>
          </div>
          <div className="space-y-3 text-sm text-zinc-500">
            <p>1.{t("withdrawal.notice1")}</p>
            <p>2.{t("withdrawal.notice2")}</p>
            <p>3.{t("withdrawal.notice3")}</p>
            <p>4.{t("withdrawal.notice4")}</p>
          </div>
        </div>
      </main>

      {/* Submit Button - Sticky at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-200">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
        >
          {t("common.submit")}
        </button>
      </div>
    </div>
  );
}
