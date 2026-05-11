import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthViewState } from "./types";

interface Props {
  form: any;
  updateField: (field: string, value: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function SignInForm({
  form,
  updateField,
  showPassword,
  togglePassword,
  onForgotPassword,
  onSignUp,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <form className="w-full space-y-5" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Mail size={18} strokeWidth={2} />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              disabled={isLoading}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative z-10 transition-all">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[13px] font-semibold text-gray-700">
              Password
            </label>
            <button
              type="button"
              disabled={isLoading}
              onClick={onForgotPassword}
              className="text-[11px] text-gray-400 hover:text-[#E86F24] transition-colors font-medium disabled:opacity-50"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Lock size={18} strokeWidth={2} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={form.password}
              disabled={isLoading}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors"
            >
              {showPassword ? (
                <Eye size={18} strokeWidth={1.5} />
              ) : (
                <EyeOff size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div className="pt-4 transition-all">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      <p className="mt-10 text-[14px] text-gray-400 transition-all text-center pb-2">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="text-[#E86F24] font-bold hover:underline ml-1"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}