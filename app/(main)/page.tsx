"use client";

import { useRouter } from "next/navigation";
import LandingPage from "@/components/home/LandingPage";
import { AuthViewState } from "@/components/auth/AuthPage";

export default function HomePage() {
  const router = useRouter();

  return (
    <LandingPage 
      onNavigate={(page) => {
        if (page === "signin" || page === "signup") {
          router.push("/auth"); // You can pass state here if needed, but simple redirect for now
        } else if (page === "cart") {
          router.push("/cart");
        } else {
          router.push(`/${page}`);
        }
      }} 
    />
  );
}