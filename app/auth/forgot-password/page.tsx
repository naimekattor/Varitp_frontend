"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="forgot-password" 
      onBack={() => router.push("/")} 
    />
  );
}