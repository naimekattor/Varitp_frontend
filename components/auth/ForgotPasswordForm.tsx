import { Mail } from "lucide-react";

interface Props {
  onSignIn: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ForgotPasswordForm({ onSignIn, onSubmit }: Props) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <form className="w-full space-y-5" onSubmit={onSubmit}>
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Mail size={18} strokeWidth={2} />
            </div>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E86F24] bg-white ring-4 ring-orange-500/5 outline-none transition-all text-sm placeholder:text-gray-400 shadow-[0_0_15px_rgba(232,111,36,0.05)]"
            />
          </div>
        </div>

        <div className="pt-4 transition-all">
          <button
            type="submit"
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98]"
          >
            Send Reset Link
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