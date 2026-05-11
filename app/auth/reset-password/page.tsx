"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="reset-password" 
      onBack={() => router.push("/")} 
    />
  );
}