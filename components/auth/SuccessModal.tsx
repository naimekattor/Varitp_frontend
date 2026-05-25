import { X, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: Props) {
  const t = useTranslations("Auth");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-12 relative z-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 text-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-gray-100 text-gray-400 hover:text-[#E86F24] hover:bg-orange-50 transition-all"
        >
          <X size={20} />
        </button>

        {/* Checkmark Circle */}
        <div className=" flex items-center justify-center mx-auto ">
          <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path 
    d="M75,48 A32,32 0 1,1 58,22" 
    fill="none" 
    stroke="#ffb380" 
    stroke-width="5.5" 
    stroke-linecap="round" 
  />
  
  <path 
    d="M38,48 L52,62 L74,25" 
    fill="none" 
    stroke="#eb7121" 
    stroke-width="11" 
    stroke-linecap="round" 
    strokeLinejoin="round" 
  />
</svg>

        </div>

        <h3 className="text-2xl font-serif font-bold text-[#E86F24] mb-3">
          {t("passwordChanged")}
        </h3>
        <p className="text-gray-400 text-[14px] font-medium mb-10 px-4">
          {t("passwordChangedText")}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          {t("returnToLogin")}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
