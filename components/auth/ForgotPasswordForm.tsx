import { Mail, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onSignIn: () => void;
  onSignUp?: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function ForgotPasswordForm({ 
  email, 
  setEmail, 
  onSignIn, 
  onSignUp,
  onSubmit, 
  isLoading 
}: Props) {
  const t = useTranslations("Auth");
  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <form className="w-full space-y-6" onSubmit={onSubmit}>
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            {t("email")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Mail size={18} strokeWidth={2} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="example@gmail.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-2 transition-all">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("sendEmail")
            )}
          </button>
        </div>
      </form>

      <p className="mt-20 text-[14px] text-gray-400 transition-all text-center pb-2">
        {t("dontHaveAccount")}{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="text-[#E86F24] font-bold hover:underline ml-1"
        >
          {t("createAccount")}
        </button>
      </p>
    </div>
  );
}
