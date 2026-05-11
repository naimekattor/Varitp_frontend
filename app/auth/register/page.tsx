"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="signup" 
      onBack={() => router.push("/")} 
    />
  );
}