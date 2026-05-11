import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface Props {
  children: ReactNode;
  onBack: () => void;
}

export default function AuthLayout({ children, onBack }: Props) {
  return (
    <div className="flex-1 bg-[#FAFAFA] font-sans overflow-x-hidden text-gray-900 flex items-center justify-center relative w-full min-h-screen">
      {/* Background abstract elements - Consistent with LandingPage */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/40 rounded-full blur-3xl opacity-60 mix-blend-multiply translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply -translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-50 bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-[#E86F24] transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center h-full min-h-[90vh] p-4 md:p-6 lg:p-12">
        {children}
      </div>
    </div>
  );
}