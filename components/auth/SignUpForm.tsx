import { MapPin, Phone, Lock, Eye, EyeOff, Mail } from "lucide-react";

interface Props {
  form: any;
  updateField: (field: string, value: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPassword: () => void;
  onSignIn: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function SignUpForm({
  form,
  updateField,
  showPassword,
  togglePassword,
  showConfirmPassword,
  toggleConfirmPassword,
  onSignIn,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <form className="w-full space-y-5" onSubmit={onSubmit}>
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex-1 space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-700 ml-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              disabled={isLoading}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-700 ml-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              disabled={isLoading}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
        </div>

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
              placeholder="Enter your email address"
              value={form.email}
              disabled={isLoading}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <MapPin size={18} strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Enter your full address"
              value={form.address}
              disabled={isLoading}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Phone size={18} strokeWidth={2} />
            </div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              disabled={isLoading}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative z-10 transition-all">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Lock size={18} strokeWidth={2} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={form.password}
              disabled={isLoading}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors disabled:opacity-50"
            >
              {showPassword ? (
                <Eye size={18} strokeWidth={1.5} />
              ) : (
                <EyeOff size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
          <label className="text-[13px] font-semibold text-gray-700 ml-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
              <Lock size={18} strokeWidth={2} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={form.confirmPassword}
              disabled={isLoading}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={toggleConfirmPassword}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors disabled:opacity-50"
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
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>

      <p className="mt-10 text-[14px] text-gray-400 transition-all text-center pb-2">
        Already have an account?{" "}
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