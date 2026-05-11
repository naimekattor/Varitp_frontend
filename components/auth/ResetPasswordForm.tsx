import { Eye, EyeOff } from "lucide-react";

interface Props {
  form: any;
  updateField: (field: string, value: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPassword: () => void;
  onSignIn: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ResetPasswordForm({
  form,
  updateField,
  showPassword,
  togglePassword,
  showConfirmPassword,
  toggleConfirmPassword,
  onSignIn,
  onSubmit,
}: Props) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <form className="w-full space-y-5" onSubmit={onSubmit}>
        <div className="space-y-1.5 relative z-10 transition-all">
          <label className="text-[13px] font-bold text-gray-800 tracking-wide ml-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full px-4 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400"
            />
            <button
              type="button"
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

        <div className="space-y-1.5 relative z-10 transition-all">
          <label className="text-[13px] font-bold text-gray-800 tracking-wide ml-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat new password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="w-full px-4 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors"
            >
              {showConfirmPassword ? (
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
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98]"
          >
            Update Password
          </button>
        </div>
      </form>

      <p className="mt-10 text-[14px] text-gray-400 transition-all text-center pb-2">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onSignIn}
          className="text-[#E86F24] font-bold hover:underline ml-1"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}