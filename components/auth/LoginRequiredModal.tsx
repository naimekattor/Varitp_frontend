import React from "react";
import { User, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export default function LoginRequiredModal({ open, onClose, onLogin, onRegister }: Props) {
  const t = useTranslations("Auth");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 md:p-10 relative z-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 text-center">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10 text-[#E86F24]" />
        </div>

        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
          {t("signInRequired")}
        </h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {t("signInRequiredText")}
        </p>

        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-lg active:scale-[0.98]"
          >
            {t("signIn")}
          </button>
          <button
            onClick={onRegister}
            className="w-full bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-bold transition-all text-[15px] active:scale-[0.98]"
          >
            {t("createAnAccount")}
          </button>
        </div>
      </div>
    </div>
  );
}
