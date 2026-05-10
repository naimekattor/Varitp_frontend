"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    router.push("/auth/otp");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="relative">
        <Mail
          className="absolute left-3 top-3.5 text-[#E86F24]"
          size={18}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-xl p-3 pl-10"
        />
      </div>

      <button className="w-full bg-[#E86F24] text-white py-3 rounded-xl">
        Send Reset Link
      </button>

      <p className="text-center text-sm text-gray-500">
        Back to{" "}
        <Link
          href="/auth/login"
          className="text-[#E86F24] font-medium"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}