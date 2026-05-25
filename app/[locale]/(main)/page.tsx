"use client";

import { useRouter } from "@/src/i18n/navigation";
import LandingPage from "@/components/home/LandingPage";
import { AuthViewState } from "@/components/auth/AuthPage";

export default function HomePage() {
  const router = useRouter();

  return (
    <LandingPage 
      onNavigate={(page) => {
        if (page === "login") {
          router.push("/auth/login");
        } else if (page === "register") {
          router.push("/auth/register");
        } else if (page === "cart") {
          router.push("/cart");
        } else {
          router.push(`/${page}`);
        }
      }} 
    />
  );
}
