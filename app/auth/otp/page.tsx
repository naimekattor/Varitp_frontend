"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="otp" 
      onBack={() => router.push("/")} 
    />
  );
}