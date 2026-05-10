"use client";

import { useState } from "react";
import OtpInput from "./OtpInput";
import { useRouter } from "next/navigation";

export default function OtpVerificationForm() {
  const router = useRouter();

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    router.push("/auth/reset-password");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="bg-[#FFF2E8] text-[#E86F24] p-4 rounded-xl text-sm">
        We sent an OTP to your email address.
      </div>

      <div className="flex justify-center">
        <OtpInput
          otp={otp}
          setOtp={setOtp}
        />
      </div>

      <button className="w-full bg-[#E86F24] text-white py-3 rounded-xl">
        Verify OTP
      </button>
    </form>
  );
}