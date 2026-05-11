interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500"></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 relative z-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 text-center">
        {/* Animated Checkmark */}
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Password Updated!
        </h3>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Your password has been changed successfully. You can now use your new
          password to sign in to your account.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-lg active:scale-[0.98]"
        >
          Return to Sign In
        </button>
      </div>
    </div>
  );
}