"use client";

import AuthPage from "@/components/auth/AuthPage";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  return (
    <AuthPage 
      initialView="signin" 
      onBack={() => router.push("/")} 
    />
  );
}