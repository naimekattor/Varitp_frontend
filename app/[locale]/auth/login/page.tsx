"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "@/src/i18n/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="signin" 
      onBack={() => router.push("/")} 
    />
  );
}
