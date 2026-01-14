"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  EyeOff,
  Eye,
  Loader2,
  Phone,
  KeyRound,
  Lock,
} from "lucide-react";
import { authApi } from "@/lib/api";
import { Header } from "@/components/layout";
import { FormInput } from "@/components/ui/form-input";
import Image from "next/image";

type SendToOption = "SMS" | "WhatsApp";

interface ForgotPasswordFormData {
  username: string;
  phoneNumber: string;
  otpCode: string;
  newPassword: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [sendTo, setSendTo] = useState<SendToOption | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      username: "",
      phoneNumber: "",
      otpCode: "",
      newPassword: "",
    },
  });

  const usernameValue = watch("username");
  const phoneValue = watch("phoneNumber");

  // OTP countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Handle OTP request
  const handleRequestOTP = useCallback(async () => {
    // Validate username
    if (!usernameValue || usernameValue.trim().length < 1) {
      setError("username", { message: "Please enter your username" });
      return;
    }

    // Validate phone number
    if (!phoneValue || phoneValue.trim().length < 10) {
      setError("phoneNumber", { message: "Please enter a valid phone number" });
      return;
    }

    // Validate send to option
    if (!sendTo) {
      setError("root", {
        message: "Please select how to receive OTP (SMS or WhatsApp)",
      });
      return;
    }

    clearErrors("root");
    setIsRequestingOtp(true);

    try {
      const result = await authApi.forgotPasswordGetTac({
        Username: usernameValue.trim(),
        Phone: phoneValue.trim(),
        Option: sendTo,
      });

      if (result.Code === 0) {
        setOtpSent(true);
        setOtpCountdown(result.ExpiresIn || 300);
      } else {
        setError("root", { message: result.Message || "Failed to send OTP" });
      }
    } catch {
      setError("root", { message: "Failed to send OTP. Please try again." });
    } finally {
      setIsRequestingOtp(false);
    }
  }, [usernameValue, phoneValue, sendTo, setError, clearErrors]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Validate OTP was requested and code is entered
    if (!otpSent) {
      setError("root", { message: "Please request and enter OTP code" });
      return;
    }

    if (!data.otpCode || data.otpCode.trim().length < 4) {
      setError("otpCode", { message: "Please enter a valid OTP code" });
      return;
    }

    setIsLoading(true);

    try {
      const result = await authApi.forgotPassword({
        Username: data.username.trim(),
        Phone: data.phoneNumber.trim(),
        Tac: data.otpCode.trim(),
        Password: data.newPassword,
      });

      if (result.Code === 0) {
        // Password reset successful - redirect to login
        alert(
          "Password reset successfully! Please login with your new password."
        );
        router.push("/login");
      } else {
        setError("root", {
          message: result.Message || "Failed to reset password",
        });
      }
    } catch {
      setError("root", {
        message: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canRequestOtp =
    usernameValue &&
    usernameValue.trim().length > 0 &&
    phoneValue &&
    phoneValue.trim().length >= 10 &&
    sendTo &&
    otpCountdown === 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header variant="subpage" title="Forgot Password" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
          {/* Username */}
          <FormInput
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="UID"
            prefix={
              <Image
                src="/images/icon/uuid_icon.png"
                alt="AON1E uid"
                width={24}
                height={24}
                unoptimized
                className="h-6 w-auto object-contain"
              />
            }
            error={errors.username?.message}
          />

          {/* Phone Number */}
          <FormInput
            {...register("phoneNumber", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
            })}
            type="tel"
            placeholder="Phone Number"
            prefix={
              <Image
                src="/images/icon/phone_icon.png"
                alt="AON1E phone"
                width={24}
                height={24}
                unoptimized
                className="h-6 w-auto object-contain"
              />
            }
            error={errors.phoneNumber?.message}
          />

          {/* Send to Dropdown */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <Image
                src="/images/icon/otp_icon.png"
                alt="AON1E otp"
                width={24}
                height={24}
                unoptimized
                className="h-6 w-auto object-contain"
              />
            </div>
            <select
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value as SendToOption | "")}
              className={`w-full pl-12 pr-10 py-3.5 border border-[#959595] rounded-lg focus:outline-none focus:border-[#0DC3B1] focus:bg-[#00D6C61A] focus:shadow-[0px_0px_20px_0px_#14BBB033] bg-white appearance-none ${
                !sendTo ? "text-zinc-500" : "text-zinc-900"
              }`}
            >
              <option value="">Send to</option>
              <option value="SMS">SMS</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
              <ChevronDown className="w-auto h-6" />
            </div>
          </div>

          {/* OTP Code */}
          <div className="flex gap-2">
            <FormInput
              {...register("otpCode", {
                required: otpSent ? "OTP code is required" : false,
              })}
              type="text"
              placeholder="OTP Code"
              maxLength={6}
              prefix={
                <Image
                  src="/images/icon/otp_icon.png"
                  alt="AON1E otp"
                  width={24}
                  height={24}
                  unoptimized
                  className="h-6 w-auto object-contain"
                />
              }
              error={errors.otpCode?.message}
              wrapperClassName="flex-1"
            />
            <button
              type="button"
              onClick={handleRequestOTP}
              disabled={!canRequestOtp || isRequestingOtp}
              className="px-4 py-3.5 bg-primary text-white font-roboto-bold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
            >
              {isRequestingOtp ? (
                <Loader2 className="w-auto h-6 animate-spin" />
              ) : otpCountdown > 0 ? (
                `Resend (${otpCountdown}s)`
              ) : otpSent ? (
                "Resend OTP"
              ) : (
                "Request OTP"
              )}
            </button>
          </div>
          {otpSent && otpCountdown > 0 && (
            <p className="text-xs text-green-600 ml-1">
              OTP sent! Please check your{" "}
              {sendTo === "WhatsApp" ? "WhatsApp" : "SMS"}.
            </p>
          )}

          {/* New Password */}
          <FormInput
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            prefix={
              <Image
                src="/images/icon/lock_icon.png"
                alt="AON1E lock"
                width={24}
                height={24}
                unoptimized
                className="h-6 w-auto object-contain"
              />
            }
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? (
                  <EyeOff className="w-auto h-6" />
                ) : (
                  <Eye className="w-auto h-6" />
                )}
              </button>
            }
            error={errors.newPassword?.message}
          />

          {/* Error Message */}
          {errors.root && (
            <p className="text-sm text-red-500 text-center">
              {errors.root.message}
            </p>
          )}

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 text-base w-full py-3.5 bg-primary text-white font-roboto-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-auto h-6 animate-spin" />
                PROCESSING...
              </>
            ) : (
              "CONFIRM"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
