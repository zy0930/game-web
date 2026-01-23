"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FormInput } from "@/components/ui/form-input";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import { useToast } from "@/providers/toast-provider";
import { useName, useChangeName } from "@/hooks";

export default function ChangeUsernamePage() {
  const { t } = useI18n();
  const { showSuccess, showError } = useToast();
  const [username, setUsername] = useState("");

  // Fetch current name
  const { data: nameData, isLoading: isLoadingName } = useName();
  const changeNameMutation = useChangeName();

  // Pre-populate username when data loads
  useEffect(() => {
    if (nameData?.Name) {
      setUsername(nameData.Name);
    }
  }, [nameData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      showError(t("auth.usernameRequired"));
      return;
    }

    try {
      await changeNameMutation.mutateAsync({ Name: username.trim() });
      showSuccess(t("profile.usernameChanged"));
    } catch (err) {
      showError(err instanceof Error ? err.message : t("common.error"));
    }
  };

  // Loading state while fetching current name
  if (isLoadingName) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Form */}
      <main className="flex-1 px-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <FormInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("auth.username")}
            prefix={
              <Image
                src="/images/icon/user_icon.png"
                alt="Username"
                width={24}
                height={24}
                unoptimized
                className="h-6 w-auto object-contain"
              />
            }
            error={undefined}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={changeNameMutation.isPending}
            className="cursor-pointer uppercase w-full py-3.5 bg-primary text-white font-roboto-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {changeNameMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t("common.loading")}
              </>
            ) : (
              t("common.confirm")
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
