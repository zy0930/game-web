"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

interface GameCategory {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface GameCategoriesProps {
  categories?: GameCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

// Category icons
const CategoryIcons = {
  slots: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" opacity="0.3" />
      <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">7</text>
    </svg>
  ),
  appSlot: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <rect x="8" y="5" width="8" height="9" rx="1" opacity="0.5" fill="currentColor" />
    </svg>
  ),
  live: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.24 7.76a6 6 0 010 8.49M7.76 7.76a6 6 0 000 8.49" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.68.69 5.06 1.83L15.64 8H8.36L6.94 5.83A7.95 7.95 0 0112 4zm-6.5 8c0-.69.09-1.36.25-2h3.96l1.22 2-1.22 2H5.75c-.16-.64-.25-1.31-.25-2zm.44 4h3.85l1.42 2.17A7.95 7.95 0 015.44 16zm7.56 3.9V16h2.79l-2.79 3.9zM12 14l-1.5-2 1.5-2 1.5 2-1.5 2zm0-6l1.22 2H10.78L12 8zm.79 11.9L15.58 16h3.85a7.95 7.95 0 01-6.64 3.9zM18.25 14h-3.96l-1.22-2 1.22-2h3.96c.16.64.25 1.31.25 2s-.09 1.36-.25 2z" />
    </svg>
  ),
  lottery: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <circle cx="6" cy="6" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  ),
  fishing: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M18.5 10.5c0 1.93-1.57 3.5-3.5 3.5H9c-1.93 0-3.5-1.57-3.5-3.5S7.07 7 9 7c.33 0 .65.05.95.13C10.57 5.3 12.14 4 14 4c2.21 0 4 1.79 4 4 0 .24-.02.47-.06.7.97.58 1.56 1.64 1.56 2.8zM6 14l3 6 3-6M15 14l3 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="12" cy="11" rx="5" ry="3" opacity="0.3" />
    </svg>
  ),
};

const defaultCategories: GameCategory[] = [
  { id: "slots", labelKey: "games.slots", icon: CategoryIcons.slots },
  { id: "appSlot", labelKey: "games.appSlot", icon: CategoryIcons.appSlot },
  { id: "live", labelKey: "games.live", icon: CategoryIcons.live },
  { id: "sports", labelKey: "games.sports", icon: CategoryIcons.sports },
  { id: "lottery", labelKey: "games.lottery", icon: CategoryIcons.lottery },
  { id: "fishing", labelKey: "games.fishing", icon: CategoryIcons.fishing },
];

export function GameCategories({
  categories = defaultCategories,
  activeCategory,
  onCategoryChange,
  className,
}: GameCategoriesProps) {
  const { t } = useI18n();

  return (
    <div className={cn("flex gap-2 overflow-x-auto scrollbar-hide pb-2", className)}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex flex-col items-center min-w-[60px] px-3 py-2 rounded-xl transition-all",
            activeCategory === category.id
              ? "bg-primary text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          )}
        >
          <span className={cn(
            "mb-1",
            activeCategory === category.id ? "text-white" : "text-zinc-500"
          )}>
            {category.icon}
          </span>
          <span className="text-[10px] font-medium whitespace-nowrap">{t(category.labelKey)}</span>
        </button>
      ))}
    </div>
  );
}

export { defaultCategories, CategoryIcons };
