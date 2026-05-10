"use client";

import { useRef } from "react";

interface Props {
  otp: string[];
  setOtp: (otp: string[]) => void;
}

export default function OtpInput({ otp, setOtp }: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = [...otp];
    next[index] = digit;

    setOtp(next);

    if (digit && index < otp.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          maxLength={1}
          className="w-12 h-12 text-center border rounded-xl"
        />
      ))}
    </div>
  );
}