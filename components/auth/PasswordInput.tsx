import { Eye, EyeOff, Lock } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  placeholder?: string;
  label?: string;
}

export default function PasswordInput({
  value,
  onChange,
  visible,
  onToggle,
  placeholder,
  label,
}: Props) {
  return (
    <div className="space-y-1.5 relative z-10 transition-all">
      {label && (
        <label className="text-[13px] font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
          <Lock size={18} strokeWidth={2} />
        </div>
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder || "••••••••••••"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors"
        >
          {visible ? (
            <Eye size={18} strokeWidth={1.5} />
          ) : (
            <EyeOff size={18} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}