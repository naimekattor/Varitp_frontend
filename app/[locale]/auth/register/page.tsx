"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "@/src/i18n/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="signup" 
      onBack={() => router.push("/")} 
    />
  );
}
