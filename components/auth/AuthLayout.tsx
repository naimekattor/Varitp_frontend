import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface Props {
  children: ReactNode;
  onBack: () => void;
}

export default function AuthLayout({ children, onBack }: Props) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] font-sans text-gray-900">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/40 rounded-full blur-3xl opacity-60 mix-blend-multiply translate-x-1/4 -translate-y-1/4" />

        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply -translate-x-1/4 translate-y-1/4" />
      </div>

      

      {/* Layout */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:px-6 lg:px-10">
        <div className="max-w-7xl w-full flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center min-h-screen p-4 md:p-6 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}