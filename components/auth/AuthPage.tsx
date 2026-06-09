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
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AuthPage({
  onBack,
  initialView = "signin",
}: {
  onBack: () => void;
  initialView?: AuthViewState;
}) {
  const t = useTranslations("Auth");
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
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);

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
      console.log("Signing in with email:", signInForm.email);
      
      const result = await signIn("credentials", {
        email: signInForm.email,
        password: signInForm.password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        console.error("SignIn error:", result.error);
        if (result.error === "CredentialsSignin") {
          setError(t("invalidCredentials"));
        } else {
          setError(result.error || t("authFailed"));
        }
      } else if (result?.ok) {
        console.log("Sign in successful");
        onBack(); // Redirect home or to dashboard
      } else {
        setError(t("signInFailed"));
      }
    } catch (err: any) {
      console.error("Sign in exception:", err);
      setError(t("unexpected"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic password matching validation
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError(t("passwordMismatch"));
      setIsLoading(false);
      return;
    }

    const isBusiness = signUpForm.role === "business_owner";

    // Frontend validations
    if (isBusiness) {
      const requiredFields = [
        signUpForm.email,
        signUpForm.firstName,
        signUpForm.lastName,
        signUpForm.phone,
        signUpForm.password,
        signUpForm.confirmPassword,
        signUpForm.companyName,
        signUpForm.oib,
        signUpForm.website,
        signUpForm.businessDescription,
        signUpForm.country,
        signUpForm.city,
        signUpForm.streetAddress,
        signUpForm.postalCode,
        signUpForm.contactName,
        signUpForm.contactEmail,
        signUpForm.contactPhone,
      ];
      if (requiredFields.some((f) => !f || f.trim() === "")) {
        setError(t("requiredFields"));
        setIsLoading(false);
        return;
      }
    } else {
      const requiredFields = [
        signUpForm.email,
        signUpForm.firstName,
        signUpForm.lastName,
        signUpForm.address,
        signUpForm.phone,
        signUpForm.password,
        signUpForm.confirmPassword,
      ];
      if (requiredFields.some((f) => !f || f.trim() === "")) {
        setError(t("requiredFields"));
        setIsLoading(false);
        return;
      }
    }

    try {
      // For business owner, format the address nicely since the backend takes the regular payload address
      const address = isBusiness
        ? `${signUpForm.streetAddress}, ${signUpForm.postalCode} ${signUpForm.city}, ${signUpForm.country}`
        : signUpForm.address;

      const payload = {
        email: signUpForm.email,
        first_name: signUpForm.firstName,
        last_name: signUpForm.lastName,
        address: address,
        phone: signUpForm.phone,
        password: signUpForm.password,
        confirm_password: signUpForm.confirmPassword,
        role: signUpForm.role || "user",
      };

      console.log("Submitting registration payload:", JSON.stringify(payload, null, 2));

      const response = await api.post("/auth/api/v1/signup/", payload);

      if (response.data.status) {
        // Trigger OTP
        await api.post("/auth/api/v1/get-otp/", {
          email: signUpForm.email,
          task: "registration",
        });
        setViewState("otp");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t("registrationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/api/v1/get-otp/", {
        email: forgotPasswordEmail,
        task: "password_reset",
      });

      if (response.data.status) {
        setViewState("otp");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t("resetCodeFailed"));
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
      
      // Determine which email to use based on the flow
      let email = "";
      if (forgotPasswordEmail) {
        // Forgot password flow
        email = forgotPasswordEmail;
      } else if (viewState === "otp" && signUpForm.email) {
        // Registration flow
        email = signUpForm.email;
      } else {
        // Fallback
        email = signInForm.email;
      }
      
      console.log("OTP Submit - Email:", email, "OTP:", otp);
      
      const response = await api.post("/auth/api/v1/verify-otp/", {
        email,
        otp,
      });

      if (response.data.status) {
        // Capture token if provided (e.g. for reset password flow)
        if (response.data.access || response.data.token) {
          setResetToken(response.data.access || response.data.token);
        }

        if (viewState === "otp" && (forgotPasswordEmail || signInForm.email)) {
          // If we were in forgot password flow (detected by having an email in that state or coming from signin's forgot link)
          // Actually, let's just check the viewState transition logic.
          // If we are at 'otp' and we came from 'forgot-password', we should go to 'reset-password'.
          // Let's use a more robust way: if forgotPasswordEmail is set, we are in reset flow.
          if (forgotPasswordEmail) {
            setViewState("reset-password");
          } else {
            setViewState("signin");
            setError(t("otpVerified"));
          }
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t("otpFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const email = forgotPasswordEmail || (viewState === "otp" ? signUpForm.email : signInForm.email);
      await api.post("/auth/api/v1/get-otp/", {
        email,
        task: viewState === "otp" ? "registration" : "password_reset",
      });
      setError(t("newCodeSent"));
    } catch (err: any) {
      setError(err.response?.data?.message || t("resendFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/api/v1/reset-password/", {
        email: forgotPasswordEmail,
        new_password: resetPasswordForm.password,
        confirm_password: resetPasswordForm.confirmPassword,
      }, {
        headers: resetToken ? { Authorization: `Bearer ${resetToken}` } : {}
      });

      if (response.data.status) {
        setShowSuccess(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t("passwordResetFailed"));
    } finally {
      setIsLoading(false);
    }
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
      <div
        className="w-full md:w-1/2
    min-h-[780px]
    lg:min-h-[820px]
    bg-linear-to-b from-[#fdece0] via-white to-white
    rounded-[2.5rem]
    p-6 sm:p-8 md:p-10 lg:p-14
    flex flex-col items-center justify-center
    relative
    shadow-[0_8px_40px_rgb(0,0,0,0.04)]
    border border-white "
      >
        {/* Subtle decorative elements for the form panel */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-50/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-50/50 rounded-full blur-3xl -z-10"></div>

        <div className="w-full max-w-[500px] flex flex-col justify-center flex-1 mx-auto relative z-10">
          {/* Logo */}
          <Link href={"/"}>
          <div className=" flex flex-col items-center">
            <div className="relative w-24 h-24 mb-2 bg-white p-1 rounded-2xl">
              <Image
                src="/images/Varivo_LOGO_RGB_boja.png"
                alt="Varivo Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          </Link>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
              {viewState === "signin" && t("welcomeBack")}
              {viewState === "signup" && t("createAccount")}
              {viewState === "forgot-password" && t("forgotPassword")}
              {viewState === "otp" && t("checkEmail")}
              {viewState === "reset-password" && t("newPassword")}
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              {viewState === "signin" && t("signinSubtitle")}
              {viewState === "signup" && t("signupSubtitle")}
              {viewState === "forgot-password" &&
                t("forgotSubtitle")}
              {viewState === "otp" && ""}
              {viewState === "reset-password" &&
                t("resetSubtitle")}
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
              email={forgotPasswordEmail}
              setEmail={setForgotPasswordEmail}
              onSignIn={() => switchView("signin")}
              onSignUp={() => switchView("signup")}
              onSubmit={handleForgotPasswordSubmit}
              isLoading={isLoading}
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
              onSignUp={() => switchView("signup")}
              onSubmit={handleResetSubmit}
              isLoading={isLoading}
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
