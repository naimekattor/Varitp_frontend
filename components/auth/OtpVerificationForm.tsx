import OtpInput from "./OtpInput";

interface Props {
  otpDigits: string[];
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  handleOtpPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  otpRefs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  onSubmit: (e: React.FormEvent) => void;
  onResendOtp: () => void;
  onSignUp: () => void;
  isLoading?: boolean;
}

export default function OtpVerificationForm({
  otpDigits,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  otpRefs,
  onSubmit,
  onResendOtp,
  onSignUp,
  isLoading,
}: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 w-full pt-2 duration-500">
      <div className="bg-[#FFF2E8] border-none rounded-2xl p-5 flex gap-4 items-center justify-center text-left">
        <div className="w-5 h-5 rounded-full bg-[#E86F24] text-white flex items-center justify-center shrink-0 text-[11px] font-bold shadow-sm">
          !
        </div>
        <p className="text-[13px] text-[#E86F24] font-medium leading-relaxed">
          We have sent you an OTP on your email address, please enter it here to
          reset the password.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <OtpInput
          otpDigits={otpDigits}
          handleOtpChange={handleOtpChange}
          handleOtpKeyDown={handleOtpKeyDown}
          handleOtpPaste={handleOtpPaste}
          otpRefs={otpRefs}
          disabled={isLoading}
        />

        <div className="pt-2 space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onResendOtp}
              disabled={isLoading}
              className="text-[13px] text-gray-500 hover:text-[#E86F24] font-semibold transition-colors disabled:opacity-50"
            >
              Didn't receive the code? <span className="text-[#E86F24] ml-1">Resend Code</span>
            </button>
          </div>
        </div>
      </form>

      <p className="mt-10 text-[14px] text-gray-400 transition-all text-center pb-2">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="text-[#E86F24] font-bold hover:underline ml-1"
        >
          Create Account
        </button>
      </p>
    </div>
  );
}