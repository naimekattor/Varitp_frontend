import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  form: any;
  updateField: (field: string, value: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPassword: () => void;
  onSignIn: () => void;
  onSignUp?: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function ResetPasswordForm({
  form,
  updateField,
  showPassword,
  togglePassword,
  showConfirmPassword,
  toggleConfirmPassword,
  onSignIn,
  onSignUp,
  onSubmit,
  isLoading,
}: Props) {
  const t = useTranslations("Auth");
  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <form className="w-full space-y-5" onSubmit={onSubmit}>
        <div className="space-y-1.5 relative z-10 transition-all">
          <label className="text-[13px] font-bold text-gray-800 tracking-wide ml-1">
            {t("newPasswordLabel")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("newPasswordPlaceholder")}
              value={form.password}
              disabled={isLoading}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full px-4 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
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

        <div className="space-y-1.5 relative z-10 transition-all">
          <label className="text-[13px] font-bold text-gray-800 tracking-wide ml-1">
            {t("confirmPassword")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("confirmNewPassword")}
              value={form.confirmPassword}
              disabled={isLoading}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="w-full px-4 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
            <button
              type="button"
              disabled={isLoading}
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
            disabled={isLoading}
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t("updating")}
              </>
            ) : (
              t("changePassword")
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
