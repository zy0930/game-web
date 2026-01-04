"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";

interface NavItem {
  labelKey: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    labelKey: "referral",
    href: "/referral",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    labelKey: "event",
    href: "/event",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    labelKey: "transaction",
    href: "/transaction",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    labelKey: "account",
    href: "/account",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

// Label translations mapping
const labelTranslations: Record<string, string> = {
  referral: "nav.referral",
  event: "nav.event",
  transaction: "transaction.title",
  account: "account.title",
};

export function BottomNav() {
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);
  const { t } = useI18n();

  return (
    <nav className="bg-zinc-900 px-2 pt-2 pb-4 sticky bottom-0 left-0 right-0">
      <div className="flex items-end justify-around">
        {/* Left items */}
        {navItems.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs transition-colors min-w-[60px]",
              pathname === item.href
                ? "text-primary"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {item.icon}
            <span>{t(labelTranslations[item.labelKey] || item.labelKey)}</span>
          </Link>
        ))}

        {/* Center Logo Button */}
        <Link
          href="/home"
          className="flex flex-col items-center -mt-6 min-w-[70px]"
        >
          <div className="w-16 h-16 rounded-full border-4 border-primary bg-white flex items-center justify-center shadow-lg overflow-hidden">
            {!imgError ? (
              <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-primary font-bold text-xl">A1</span>
            )}
          </div>
        </Link>

        {/* Right items */}
        {navItems.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs transition-colors min-w-[60px]",
              pathname === item.href
                ? "text-primary"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {item.icon}
            <span>{t(labelTranslations[item.labelKey] || item.labelKey)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
