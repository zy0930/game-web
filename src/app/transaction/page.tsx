"use client";

import { useState } from "react";
import { Header, BottomNav } from "@/components/layout";
import { Dropdown } from "@/components/ui/dropdown";
import { Copy, Check } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";

type TransactionStatus = "progress" | "failed" | "success";

interface Transaction {
  id: string;
  date: string;
  time: string;
  transId: string;
  amount: number;
  status: TransactionStatus;
}

const transactions: Transaction[] = [
  { id: "1", date: "2025 Nov 24", time: "08:15", transId: "DP56789012", amount: 5000.00, status: "progress" },
  { id: "2", date: "2025 Nov 23", time: "08:11", transId: "DP34567890", amount: 5000.00, status: "failed" },
  { id: "3", date: "2025 Nov 22", time: "15:50", transId: "DP23456789", amount: 1000.00, status: "success" },
  { id: "4", date: "2025 Nov 21", time: "12:42", transId: "DP67890123", amount: 50.00, status: "success" },
  { id: "5", date: "2025 Nov 20", time: "08:11", transId: "DP45678901", amount: 5000.00, status: "failed" },
  { id: "6", date: "2025 Nov 19", time: "15:50", transId: "DP87654321", amount: 1000.00, status: "success" },
  { id: "7", date: "2025 Nov 18", time: "12:42", transId: "DP78901234", amount: 50.00, status: "success" },
  { id: "8", date: "2025 Nov 17", time: "15:50", transId: "DP12345678", amount: 1000.00, status: "success" },
];

// Generate last 12 months dynamically from current date
function getLast12Months() {
  const months: { value: string; label: string; month: string; year: number }[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    months.push({
      value: `${monthName}-${year}`,
      label: `${monthName}-${year}`,
      month: monthName,
      year: year,
    });
  }

  return months;
}

export default function TransactionPage() {
  const monthOptions = getLast12Months();
  const [selectedType, setSelectedType] = useState("deposit");
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useI18n();

  const transactionTypeOptions = [
    { value: "deposit", label: t("transaction.deposit") },
    { value: "withdrawal", label: t("transaction.withdrawal") },
    { value: "transfer", label: t("transaction.transfer") },
    { value: "bonus", label: t("transaction.bonus") },
  ];

  const statusConfig: Record<TransactionStatus, { labelKey: string; className: string }> = {
    progress: { labelKey: "common.progress", className: "bg-primary text-white" },
    failed: { labelKey: "common.failed", className: "bg-red-500 text-white" },
    success: { labelKey: "common.success", className: "bg-primary text-white" },
  };

  const selectedMonthData = monthOptions.find((m) => m.value === selectedMonth);

  const handleCopy = async (transId: string) => {
    await navigator.clipboard.writeText(transId);
    setCopiedId(transId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-MY", { minimumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header variant="logo" />

      {/* Filters */}
      <div className="px-4 py-3 flex gap-3">
        <Dropdown
          options={transactionTypeOptions}
          value={selectedType}
          onChange={setSelectedType}
          className="flex-1"
        />
        <Dropdown
          options={monthOptions}
          value={selectedMonth}
          onChange={setSelectedMonth}
          className="flex-1"
        />
      </div>

      {/* Month Banner */}
      <div className="mx-4 h-20 rounded-lg bg-gradient-to-r from-zinc-700 to-zinc-600 flex items-end p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <span className="text-[80px] font-bold text-white/20 absolute -right-4 -top-4">AON1E</span>
        </div>
        <p className="text-white text-xl italic font-semibold">
          {selectedMonthData?.month} <span className="text-sm font-normal not-italic">{selectedMonthData?.year}</span>
        </p>
      </div>

      {/* Transaction Table */}
      <div className="flex-1 mt-4 overflow-auto">
        {/* Table Header */}
        <div className="sticky top-0 bg-zinc-700 px-4 py-3 grid grid-cols-[80px_1fr_90px_80px] gap-2 text-xs text-white font-medium">
          <span>{t("common.date")}</span>
          <span>{t("common.transId")}</span>
          <span className="text-center">{t("common.amount")}<br />(MYR)</span>
          <span className="text-center">{t("common.status")}</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-zinc-100">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="px-4 py-3 grid grid-cols-[80px_1fr_90px_80px] gap-2 items-center text-sm"
            >
              {/* Date */}
              <div className="text-zinc-600 text-xs leading-tight">
                <div>{tx.date}</div>
                <div>{tx.time}</div>
              </div>

              {/* Trans ID with Copy */}
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-700 text-xs font-mono">{tx.transId}</span>
                <button
                  onClick={() => handleCopy(tx.transId)}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {copiedId === tx.transId ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Amount */}
              <div className="text-center text-zinc-700 text-sm">
                {formatAmount(tx.amount)}
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[tx.status].className}`}
                >
                  {t(statusConfig[tx.status].labelKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
