"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Headphones,
  Menu,
  Users,
  CreditCard,
  Lock,
  User,
  Phone,
  Wallet,
  ChevronDown,
  FolderOpen,
  Camera,
} from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import { useAuth } from "@/providers/auth-provider";
import { LoginModal } from "@/components/auth/login-modal";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      referralCode: "",
      uid: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      otpCode: "",
    },
  });

  const onSubmit = async (data: {
    referralCode?: string;
    uid: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phoneNumber: string;
    otpCode?: string;
  }) => {
    if (!agreeTerms) {
      setError("root", { message: "Please agree to the Terms & Conditions" });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords don't match" });
      return;
    }

    setIsLoading(true);

    const result = await registerUser({
      name: data.fullName,
      email: data.uid,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    setIsLoading(false);

    if (result.success) {
      router.push("/");
    } else {
      setError("root", { message: result.error || "Registration failed" });
    }
  };

  const handleRequestOTP = () => {
    // TODO: Implement OTP request
    console.log("Request OTP");
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      {/* Header */}
      <header className="bg-zinc-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-white hover:text-zinc-300 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white font-medium text-lg">
          {t("auth.register")}
        </h1>
        <div className="flex items-center gap-3">
          <button className="text-primary hover:text-primary/80 transition-colors">
            <Headphones className="w-6 h-6" />
          </button>
          <button className="text-white hover:text-zinc-300 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Welcome Banner */}
        <div className="relative w-full h-48 bg-gradient-to-r from-orange-100 via-yellow-50 to-blue-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-800 mb-1">
                Welcome to
              </p>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-black text-zinc-800">AON</span>
                <span className="text-4xl font-black text-primary">1</span>
                <span className="text-4xl font-black text-zinc-800">E</span>
              </div>
              <p className="text-primary text-sm font-medium mt-1">
                where the excitement
              </p>
              <p className="text-primary text-sm font-medium">never stops</p>
            </div>
          </div>
          {/* Decorative elements - you can add actual images here */}
          <div className="absolute left-0 bottom-0 w-32 h-32 opacity-20">
            {/* Placeholder for decorative image */}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
          {/* Referral Code */}
          <div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <Users className="w-5 h-5" />
              </div>
              <input
                {...register("referralCode")}
                type="text"
                placeholder="Referral Code"
                className="w-full pl-10 pr-20 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  type="button"
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  <FolderOpen className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-1 ml-1">
              <span className="font-medium">Note:</span> If no referral code,
              system will auto assign a default referral code
            </p>
          </div>

          {/* UID */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <input
              {...register("uid", { required: "UID is required" })}
              type="text"
              placeholder="UID"
              className="w-full pl-10 pr-4 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            />
            {errors.uid && (
              <p className="text-xs text-red-500 mt-1">{errors.uid.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
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
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-12 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <User className="w-5 h-5" />
            </div>
            <input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <Phone className="w-5 h-5" />
            </div>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              type="tel"
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Send to Dropdown */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <Wallet className="w-5 h-5" />
            </div>
            <select
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              className="w-full pl-10 pr-10 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white appearance-none text-zinc-500"
            >
              <option value="">Send to</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          {/* OTP Code */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <Wallet className="w-5 h-5" />
              </div>
              <input
                {...register("otpCode")}
                type="text"
                placeholder="OTP Code"
                className="w-full pl-10 pr-4 py-3.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              />
            </div>
            <button
              type="button"
              onClick={handleRequestOTP}
              className="px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Request OTP
            </button>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-zinc-600">
              I have read & agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </Link>
            </span>
          </label>

          {/* Error Message */}
          {errors.root && (
            <p className="text-sm text-red-500 text-center">
              {errors.root.message}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("auth.creatingAccount") : t("auth.register").toUpperCase()}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-zinc-600 pb-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="text-primary hover:underline font-medium"
            >
              Login Here
            </button>
          </p>
        </form>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
