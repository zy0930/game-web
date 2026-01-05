"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { useAuth } from "@/providers/auth-provider";
import { useI18n } from "@/providers/i18n-provider";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // DEV ONLY: Pre-filled dummy credentials
      email: "admin@test.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const result = await login(data);
    setIsLoading(false);

    if (result.success) {
      reset();
      onClose();
    } else {
      setError("root", { message: result.error || "Login failed" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          {!imgError ? (
            <Image
              src="/logo-header.png"
              alt="AON1E"
              width={120}
              height={48}
              className="h-12 w-auto object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-3xl font-bold">
              AON<span className="text-primary">1</span>E
            </span>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username/Email */}
          <div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                {...register("email")}
                type="text"
                placeholder={t("auth.username")}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.email ? "border-red-500" : "border-zinc-300"
                )}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.password")}
                className={cn(
                  "w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.password ? "border-red-500" : "border-zinc-300"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary"
              />
              <span className="text-zinc-600">{t("auth.rememberMe")}</span>
            </label>
            <Link href="/forgot-password" onClick={onClose} className="text-primary hover:underline">
              {t("auth.forgotPassword")}
            </Link>
          </div>

          {/* Error Message */}
          {errors.root && (
            <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("auth.signingIn") : t("auth.login").toUpperCase()}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-zinc-600">
            {t("auth.noAccount")}{" "}
            <Link
              href="/register"
              onClick={onClose}
              className="text-primary hover:underline font-medium"
            >
              {t("auth.register")} Here
            </Link>
          </p>

          {/* Support Notice */}
          <p className="text-xs text-center text-zinc-500 mt-4">
            If you encounter any issues while logging in,
            <br />
            please contact our Customer Service for further assist.
          </p>
        </form>
      </div>
    </div>
  );
}
