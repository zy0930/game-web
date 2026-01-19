"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";
import { useRebates } from "@/hooks";

// Define game categories for grouping
const SLOT_CODES = [
  "PPSLOT", "LKL365", "BNG", "JILI", "NEXTSPIN", "BTG", "BESOFT", "OCTOPLAY",
  "AFB", "MEGAH5", "918H5", "HACKSAW", "SPADEGAMING", "PEGASUS", "AP", "ACE333",
  "FACHAI", "SIMPLEPLAY", "VPOWER", "VPLUS", "JDB", "RELAX", "PLAYSTAR", "LIVE22",
  "HABANERO", "GFG", "CQ9", "KA", "JOKER", "EVONLC", "CLOTPLAY", "EVOBTG",
  "EVOREDTIGER", "EVONETENT", "MEGA", "LIONKING", "LEG", "PTSLOT", "MKY888",
  "KISS918", "FunHouse", "GP", "Arrow Edges", "Belatra Games", "Bgaming",
  "Leap Games", "Platipus", "RCT Gaming", "REELNRG", "SKYWIND", "Tom Horn",
  "SUPERLOTTO", "ONLYPLAY", "EVOPLAY", "YGG", "Play n Go", "SPINMATIC",
  "CZ888", "FASTSPIN"
];

const FISH_CODES = [
  "FACHAIFISH", "VPOWERFISH", "CQ9FISH", "JILIFISH", "SPADEGAMINGFISH",
  "JDBFISH", "FASTSPINFISH"
];

const LIVE_CODES = [
  "PRAGMATICLIVE", "EVOLUTIONGAMING", "BG", "AG", "SEXYGAMING", "DG",
  "KING855", "SAGAMING", "YEEBET", "WCASINO", "MT", "PTLIVE", "VIVO"
];

const SPORTS_CODES = ["IBC", "OBET"];

const LOTTERY_CODES = ["EKOR", "VBOSS", "VBOSSGD", "ABS", "BT28WIN", "RCB"];

type GameCategory = "SLOT" | "FISH" | "LIVE" | "SPORTS" | "LOTTERY" | "OTHER";

function getGameCategory(code: string): GameCategory {
  if (SLOT_CODES.includes(code)) return "SLOT";
  if (FISH_CODES.includes(code)) return "FISH";
  if (LIVE_CODES.includes(code)) return "LIVE";
  if (SPORTS_CODES.includes(code)) return "SPORTS";
  if (LOTTERY_CODES.includes(code)) return "LOTTERY";
  return "OTHER";
}

export default function RebateListPage() {
  const { isAuthenticated } = useAuth();

  // Fetch rebates
  const { data: rebatesData, isLoading } = useRebates({
    enabled: isAuthenticated,
  });

  const games = rebatesData?.Games ?? [];

  // Group games by category
  const groupedGames = useMemo(() => {
    const groups: Record<GameCategory, typeof games> = {
      SLOT: [],
      FISH: [],
      LIVE: [],
      SPORTS: [],
      LOTTERY: [],
      OTHER: [],
    };

    games.forEach((game) => {
      const category = getGameCategory(game.Code);
      groups[category].push(game);
    });

    // Return only non-empty categories in order
    const orderedCategories: GameCategory[] = ["SLOT", "FISH", "LIVE", "SPORTS", "LOTTERY", "OTHER"];
    return orderedCategories
      .filter((cat) => groups[cat].length > 0)
      .map((cat) => ({ category: cat, games: groups[cat] }));
  }, [games]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Rebate List" backHref="/account" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            Please login to access this page
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Rebate List" backHref="/account" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image - constrained to max-w-[430px] */}
      <div className="absolute inset-0 z-0 max-w-[430px] mx-auto left-0 right-0">
        <Image
          src="/images/background/rebate_list_background.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header variant="subpage" title="Rebate List" backHref="/account" />
      </div>

      {/* Banner */}
      <div className="relative z-10 px-4 pt-4">
        <div className="relative w-full aspect-[350/80] rounded-lg overflow-hidden">
          <Image
            src="/images/background/rebate_list_background.png"
            alt="AONE"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="relative z-10 mx-4 mt-4">
        <div className="grid grid-cols-4 bg-[#2C3E50] text-white text-sm font-roboto-medium rounded-t-lg overflow-hidden">
          <div className="py-3 px-2 text-center">Game</div>
          <div className="py-3 px-2 text-center">Player %</div>
          <div className="py-3 px-2 text-center">Upline L1 %</div>
          <div className="py-3 px-2 text-center">Upline L2 %</div>
        </div>
      </div>

      {/* Table Content */}
      <div className="relative z-10 flex-1 mx-4 mb-4 bg-white rounded-b-lg overflow-hidden">
        <div className="max-h-[calc(100vh-280px)] overflow-auto">
          {groupedGames.map(({ category, games: categoryGames }) => (
            <div key={category}>
              {/* Category Header */}
              <div className="bg-primary text-white text-sm font-roboto-bold py-2 px-4 text-center sticky top-0">
                {category}
              </div>

              {/* Games in Category */}
              {categoryGames.map((game, index) => (
                <div
                  key={game.Id}
                  className={`grid grid-cols-4 text-sm border-b border-zinc-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-zinc-50"
                  }`}
                >
                  <div className="py-3 px-2 text-center text-zinc-700 font-roboto-medium truncate">
                    {game.Name}
                  </div>
                  <div className="py-3 px-2 text-center text-zinc-600">
                    {game.PlayerCommRate.toFixed(1)}
                  </div>
                  <div className="py-3 px-2 text-center text-zinc-600">
                    {game.PlayerL1CommRate.toFixed(1)}
                  </div>
                  <div className="py-3 px-2 text-center text-zinc-600">
                    {game.PlayerL2CommRate.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {games.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <p>No rebate data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
