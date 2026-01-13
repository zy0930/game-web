"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header, BottomNav } from "@/components/layout";
import { RequireAuth } from "@/components/auth";
import {
  User,
  Landmark,
  ShieldCheck,
  KeyRound,
  Users,
  Mail,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/providers/i18n-provider";
import { KycVerificationModal } from "@/components/account/kyc-verification-modal";
import { useProfile } from "@/hooks";

export default function AccountPage() {
  const [imgError, setImgError] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const { t } = useI18n();

  // Fetch user profile data
  const { data: profile, isLoading, isError } = useProfile();

  const quickActions = [
    {
      id: "deposit",
      labelKey: "wallet.deposit",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/deposit",
    },
    {
      id: "withdrawal",
      labelKey: "withdrawal.title",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      href: "/withdrawal",
    },
    {
      id: "transfer",
      labelKey: "wallet.transfer",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
      href: "/account/contact?mode=transfer",
    },
    {
      id: "report",
      labelKey: "account.report",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      href: "/report",
    },
  ];

  const menuItems = [
    { icon: User, labelKey: "account.profile", href: "/account/profile", isLink: true },
    { icon: Landmark, labelKey: "account.bankAccount", href: "/account/bank", isLink: true },
    { icon: ShieldCheck, labelKey: "account.kyc", onClick: () => setIsKycModalOpen(true), isLink: false },
    { icon: KeyRound, labelKey: "account.resetPin", href: "/account/reset-pin", isLink: true },
    { icon: Users, labelKey: "account.myContact", href: "/account/contact", isLink: true },
    { icon: Mail, labelKey: "account.inbox", href: "/account/inbox", badge: profile?.InboxCount, isLink: true },
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-MY", { minimumFractionDigits: 2 });
  };

  const formatOverviewDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col">
          <Header variant="logo" />
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <BottomNav />
        </div>
      </RequireAuth>
    );
  }

  // Error state
  if (isError || !profile) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col">
          <Header variant="logo" />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <p className="text-zinc-600 mb-4">{t("common.error")}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                {t("common.retry")}
              </button>
            </div>
          </div>
          <BottomNav />
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header variant="logo" />

      {/* Profile Section */}
      <div className="bg-dark px-4 py-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-600 flex-shrink-0">
            {!imgError && profile.Avatar ? (
              <Image
                src={profile.Avatar}
                alt={profile.Username}
                unoptimized
                width={64}
                height={64}
                className="object-cover w-full h-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xl font-roboto-bold">
                {profile.Username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white text-lg font-roboto-semibold">{profile.Username}</h2>
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <button
                onClick={() => setIsKycModalOpen(true)}
                className="px-2 py-0.5 rounded-full text-xs font-roboto-medium transition-opacity hover:opacity-80 bg-primary/20 text-primary"
              >
                {t("common.verified")}
              </button>
            </div>
            <p className="text-zinc-400 text-sm">UID: {profile.Id}</p>
          </div>
        </div>
      </div>

      {/* Balance Display - Cash & Chips Side by Side */}
      <div className="bg-zinc-700 px-4 py-4">
        <div className="flex gap-4">
          {/* Cash Balance */}
          <div className="flex-1 flex flex-col items-center">
            <span className="px-4 py-1 rounded-full bg-primary text-white text-xs font-roboto-medium mb-2">
              {t("wallet.cash")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-zinc-400 text-xs">{profile.Currency}</span>
              <span className="text-white text-xl font-roboto-bold">
                {formatCurrency(profile.Cash)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-zinc-600" />

          {/* Chips Balance */}
          <div className="flex-1 flex flex-col items-center">
            <span className="px-4 py-1 rounded-full bg-primary text-white text-xs font-roboto-medium mb-2">
              {t("wallet.chips")}
            </span>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="text-white text-xl font-roboto-bold">
                {formatCurrency(profile.Chip)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-roboto-medium text-zinc-700">{t("account.overview")}</span>
          <span className="text-sm text-primary">({formatOverviewDate(profile.OverviewDate)})</span>
        </div>
        <div className="flex items-center divide-x divide-zinc-200">
          <div className="flex-1 text-center">
            <p className="text-xl font-roboto-bold text-primary">{profile.RegisteredDownline}</p>
            <p className="text-xs text-zinc-500">{t("account.registered")}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xl font-roboto-bold text-primary">{profile.ActiveDownline}</p>
            <p className="text-xs text-zinc-500">{t("account.activePlayer")}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xl font-roboto-bold text-primary">{formatCurrency(profile.Turnover)}</p>
            <p className="text-xs text-zinc-500">{t("account.turnover")}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-4">
        <div className="flex justify-around">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {action.icon}
              </div>
              <span className="text-xs text-zinc-600">{t(action.labelKey)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-4 mt-4 mb-4 flex-1">
        <div className="bg-white rounded-xl overflow-hidden">
          {menuItems.map((item, index) => {
            const content = (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm text-zinc-700">{t(item.labelKey)}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              </>
            );

            const className = cn(
              "flex items-center justify-between px-4 py-3.5 hover:bg-zinc-50 transition-colors w-full",
              index !== menuItems.length - 1 && "border-b border-zinc-100"
            );

            return item.isLink ? (
              <Link key={item.href} href={item.href!} className={className}>
                {content}
              </Link>
            ) : (
              <button
                key={item.labelKey}
                onClick={item.onClick}
                className={className}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* KYC Verification Modal */}
      <KycVerificationModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
      />
    </div>
    </RequireAuth>
  );
}
