"use client";

import { Eye, EyeOff, Lock } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  placeholder?: string;
}

export default function PasswordInput({
  value,
  onChange,
  visible,
  onToggle,
  placeholder,
}: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#E86F24]">
        <Lock size={18} />
      </div>

      <input
        type={visible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-3 rounded-xl border"
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {visible ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
}