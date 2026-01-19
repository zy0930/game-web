"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Header } from "@/components/layout";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

// Mock game options
const gameOptions = ["ALL", "EVOLUTIONGAMING", "VBOSSGD", "PPSLOT", "PGSOFT"];

// Mock data - set to empty array to test empty state
const mockTurnoverRecords = [
  { date: "2026 Dec 01", time: "12:11", game: "EVOLUTIONGAMING", rollover: 1, winLose: -1 },
  { date: "2026 Dec 01", time: "10:11", game: "VBOSSGD", rollover: 300, winLose: 300 },
  { date: "2026 Dec 01", time: "12:11", game: "EVOLUTIONGAMING", rollover: 0.3, winLose: -1.5 },
  { date: "2026 Dec 01", time: "10:11", game: "VBOSSGD", rollover: 0, winLose: 0 },
  { date: "2026 Dec 01", time: "12:11", game: "EVOLUTIONGAMING", rollover: 0.3, winLose: -1 },
  { date: "2026 Dec 01", time: "10:11", game: "VBOSSGD", rollover: 0.5, winLose: 600 },
  { date: "2026 Dec 01", time: "12:11", game: "EVOLUTIONGAMING", rollover: 100, winLose: -200 },
];

const mockSummary = {
  totalRollover: 502.90,
  totalWinLose: 606.50,
};

export default function TurnoverReportPage() {
  const { t } = useI18n();
  const [startDate, setStartDate] = useState("2025-11-24 23:59");
  const [endDate, setEndDate] = useState("2025-11-24 00:00");
  const [selectedGame, setSelectedGame] = useState("ALL");
  const [showGameDropdown, setShowGameDropdown] = useState(false);
  const [records] = useState(mockTurnoverRecords);

  const handleSearch = () => {
    // TODO: API call to fetch turnover records
    console.log("Searching:", { startDate, endDate, selectedGame });
  };

  const hasRecords = records.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header variant="subpage" title={t("report.turnoverReport")} backHref="/report" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Filters */}
        <div className="p-4 space-y-3">
          {/* Start Date */}
          <div className="flex items-center gap-3 px-4 py-3 border border-zinc-200 rounded-lg bg-white">
            <Image
              src="/images/report/calendar_icon.png"
              alt="calendar"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
              unoptimized
            />
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start date"
              className="flex-1 focus:outline-none text-zinc-800 text-sm"
            />
          </div>

          {/* End Date */}
          <div className="flex items-center gap-3 px-4 py-3 border border-zinc-200 rounded-lg bg-white">
            <Image
              src="/images/report/calendar_icon.png"
              alt="calendar"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
              unoptimized
            />
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End date"
              className="flex-1 focus:outline-none text-zinc-800 text-sm"
            />
          </div>

          {/* Game Dropdown and Search */}
          <div className="flex items-center gap-3">
            {/* Game Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowGameDropdown(!showGameDropdown)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 border border-zinc-200 rounded-lg bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-[10px] font-roboto-bold">G</span>
                  </div>
                  <span className="text-zinc-800 text-sm">{selectedGame}</span>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-zinc-400 transition-transform", showGameDropdown && "rotate-180")} />
              </button>

              {showGameDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-10">
                  {gameOptions.map((game) => (
                    <button
                      key={game}
                      onClick={() => {
                        setSelectedGame(game);
                        setShowGameDropdown(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50 transition-colors",
                        selectedGame === game ? "text-primary font-roboto-medium" : "text-zinc-700"
                      )}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-primary text-white text-sm font-roboto-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("common.search")}
            </button>
          </div>
        </div>

        {hasRecords ? (
          <>
            {/* Summary Card */}
            <div className="mx-4 mb-4 bg-primary rounded-xl p-4">
              <div className="flex">
                <div className="flex-1 text-center border-r border-white/20">
                  <p className="text-white/80 text-xs mb-1">{t("report.totalRollover")}</p>
                  <p className="text-white font-roboto-bold">MYR {mockSummary.totalRollover.toFixed(2)}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-white/80 text-xs mb-1">{t("report.totalWinLose")}</p>
                  <p className="text-white font-roboto-bold">MYR {mockSummary.totalWinLose.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-zinc-100 text-zinc-500 text-xs font-roboto-medium">
              <div>{t("report.date")}</div>
              <div>{t("report.game")}</div>
              <div className="text-right">{t("report.rollover")}</div>
              <div className="text-right">{t("report.winLose")}</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-zinc-100">
              {records.map((record, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 px-4 py-3 text-xs">
                  <div className="text-zinc-600">
                    <div>{record.date}</div>
                    <div className="text-zinc-400">{record.time}</div>
                  </div>
                  <div className="text-zinc-800 flex items-center text-[10px]">{record.game}</div>
                  <div className="text-zinc-800 text-right flex items-center justify-end">{record.rollover}</div>
                  <div className={cn(
                    "text-right flex items-center justify-end font-roboto-medium",
                    record.winLose >= 0 ? "text-primary" : "text-red-500"
                  )}>
                    {record.winLose}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="relative mb-4">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-300"
              >
                {/* Clipboard shape */}
                <rect x="15" y="15" width="50" height="55" rx="4" fill="currentColor" />
                {/* Clipboard top */}
                <rect x="25" y="10" width="30" height="12" rx="2" fill="#9CA3AF" />
                {/* Lines on clipboard */}
                <rect x="22" y="35" width="36" height="4" rx="1" fill="#9CA3AF" />
                <rect x="22" y="45" width="28" height="4" rx="1" fill="#9CA3AF" />
                <rect x="22" y="55" width="32" height="4" rx="1" fill="#9CA3AF" />
                {/* X circle */}
                <circle cx="52" cy="52" r="16" fill="#6B7280" />
                <path
                  d="M46 46L58 58M58 46L46 58"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-sm text-zinc-400">
              {t("report.noHistory")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
