import { useRef } from "react";

interface Props {
  otpDigits: string[];
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOtpPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  otpRefs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  disabled?: boolean;
}

export default function OtpInput({
  otpDigits,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  otpRefs,
  disabled,
}: Props) {
  return (
    <div className="flex justify-between md:justify-center gap-3 md:gap-5 max-w-[340px] mx-auto pb-2">
      {otpDigits.map((digit, i) => (
        <input
          key={i}
          type="text"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          autoCapitalize="characters"
          maxLength={1}
          disabled={disabled}
          value={digit}
          onChange={(event) => handleOtpChange(i, event.target.value)}
          onKeyDown={(event) => handleOtpKeyDown(i, event)}
          onPaste={handleOtpPaste}
          ref={(node) => {
            otpRefs.current[i] = node;
          }}
          className={`w-[52px] h-[52px] md:w-14 md:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
            digit
              ? "border-[#E86F24] text-[#E86F24] bg-orange-50/30"
              : "border-gray-100 text-gray-900 bg-gray-50/50 focus:border-[#E86F24] focus:bg-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      ))}
    </div>
  );
}