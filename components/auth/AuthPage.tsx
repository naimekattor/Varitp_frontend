"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AuthViewState } from "./types";
export type { AuthViewState };
import {
  OTP_LENGTH,
  createEmptyOtp,
  createEmptySignInForm,
  createEmptySignUpForm,
  createEmptyResetPasswordForm,
} from "./constants";
import { signIn } from "next-auth/react";
import api from "@/lib/api";
import AuthLayout from "./AuthLayout";
import AuthImagePanel from "./AuthImagePanel";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OtpVerificationForm from "./OtpVerificationForm";
import ResetPasswordForm from "./ResetPasswordForm";
import SuccessModal from "./SuccessModal";

export default function AuthPage({
  onBack,
  initialView = "signin",
}: {
  onBack: () => void;
  initialView?: AuthViewState;
}) {
  const [viewState, setViewState] = useState<AuthViewState>(initialView);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [signInForm, setSignInForm] = useState(createEmptySignInForm());
  const [signUpForm, setSignUpForm] = useState(createEmptySignUpForm());
  const [resetPasswordForm, setResetPasswordForm] = useState(
    createEmptyResetPasswordForm(),
  );

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Logic
  const [otpDigits, setOtpDigits] = useState<string[]>(createEmptyOtp());
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    // Accept alphanumeric characters and take only the last one
    const digit = value.slice(-1).toUpperCase();
    if (digit && !/^[A-Z0-9]$/.test(digit)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = digit;
    setOtpDigits(newOtp);

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text")
      .slice(0, OTP_LENGTH)
      .toUpperCase();
    if (!/^[A-Z0-9]+$/.test(pastedData)) return;

    const newOtp = [...otpDigits];
    pastedData.split("").forEach((digit, i) => {
      if (i < OTP_LENGTH) newOtp[i] = digit;
    });
    setOtpDigits(newOtp);
    otpRefs.current[Math.min(pastedData.length, OTP_LENGTH - 1)]?.focus();
  };

  // Handlers
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        email: signInForm.email,
        password: signInForm.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        onBack(); // Redirect home or to dashboard
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/api/v1/signup/", {
        email: signUpForm.email,
        first_name: signUpForm.firstName,
        last_name: signUpForm.lastName,
        address: signUpForm.address,
        phone: signUpForm.phone,
        password: signUpForm.password,
        confirm_password: signUpForm.confirmPassword,
      });

      if (response.data.status) {
        // Trigger OTP
        await api.post("/auth/api/v1/get-otp/", {
          email: signUpForm.email,
          task: "registration",
        });
        setViewState("otp");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const otp = otpDigits.join("");
      const email = viewState === "otp" ? signUpForm.email : signInForm.email;
      const response = await api.post("/auth/api/v1/verify-otp/", {
        email,
        otp,
      });

      if (response.data.status) {
        setViewState("signin");
        setError("OTP Verified! Please sign in with your new account.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const email = viewState === "otp" ? signUpForm.email : signInForm.email;
      await api.post("/auth/api/v1/get-otp/", {
        email,
        task: viewState === "otp" ? "registration" : "password_reset",
      });
      setError("A new code has been sent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const updateSignInField = (field: string, value: string) => {
    setSignInForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSignUpField = (field: string, value: string) => {
    setSignUpForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateResetField = (field: string, value: string) => {
    setResetPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  // Helper to switch views and reset related states
  const switchView = (view: AuthViewState) => {
    setViewState(view);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <AuthLayout onBack={onBack}>
      {/* Form Panel */}
      <div className="w-full md:w-1/2 bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col items-center justify-start md:justify-center relative overflow-y-auto max-h-screen shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white scrollbar-hide">
        {/* Subtle decorative elements for the form panel */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-50/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-50/50 rounded-full blur-3xl -z-10"></div>

        <div className="w-full max-w-[400px] flex flex-col items-center mx-auto transition-all duration-300 relative z-10 py-8">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-2">
              <Image
                src="/images/Varivo_LOGO_RGB_boja.png"
                alt="Varivo Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
              {viewState === "signin" && "Welcome Back"}
              {viewState === "signup" && "Create Account"}
              {viewState === "forgot-password" && "Forgot Password"}
              {viewState === "otp" && "Verify Code"}
              {viewState === "reset-password" && "Set New Password"}
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              {viewState === "signin" && "Please enter your details to sign in"}
              {viewState === "signup" && "Join our community of food lovers"}
              {viewState === "forgot-password" &&
                "Enter your email to receive a reset code"}
              {viewState === "otp" && "Enter the 5-digit code sent to your email"}
              {viewState === "reset-password" &&
                "Please choose a new strong password"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-300">
              {error}
            </div>
          )}

          {/* Dynamic Content Rendering */}
          {viewState === "signin" && (
            <SignInForm
              form={signInForm}
              updateField={updateSignInField}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              onForgotPassword={() => switchView("forgot-password")}
              onSignUp={() => switchView("signup")}
              onSubmit={handleSignInSubmit}
              isLoading={isLoading}
            />
          )}

          {viewState === "signup" && (
            <SignUpForm
              form={signUpForm}
              updateField={updateSignUpField}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              showConfirmPassword={showConfirmPassword}
              toggleConfirmPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              onSignIn={() => switchView("signin")}
              onSubmit={handleSignUpSubmit}
              isLoading={isLoading}
            />
          )}

          {viewState === "forgot-password" && (
            <ForgotPasswordForm
              onSignIn={() => switchView("signin")}
              onSubmit={(e) => {
                e.preventDefault();
                switchView("otp");
              }}
            />
          )}

          {viewState === "otp" && (
            <OtpVerificationForm
              otpDigits={otpDigits}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              handleOtpPaste={handleOtpPaste}
              otpRefs={otpRefs}
              onSubmit={handleOtpSubmit}
              onResendOtp={handleResendOtp}
              onSignUp={() => switchView("signup")}
              isLoading={isLoading}
            />
          )}

          {viewState === "reset-password" && (
            <ResetPasswordForm
              form={resetPasswordForm}
              updateField={updateResetField}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              showConfirmPassword={showConfirmPassword}
              toggleConfirmPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              onSignIn={() => switchView("signin")}
              onSubmit={handleResetSubmit}
            />
          )}
        </div>
      </div>

      <AuthImagePanel viewState={viewState} />

      <SuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          switchView("signin");
        }}
      />
    </AuthLayout>
  );
}
