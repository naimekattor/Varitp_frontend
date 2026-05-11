import Image from "next/image";
import { Sparkles } from "lucide-react";
import { AuthViewState } from "./types";

const signInImage = "/images/GOJ_3289.jpg";
const signUpImage = "/images/GOJ_7329.jpg";
const forgotPasswordImage =
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80";
const otpImage =
  "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=1200&q=80";
const resetPasswordImage =
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80";

interface Props {
  viewState: AuthViewState;
}

export default function AuthImagePanel({ viewState }: Props) {
  const isSignIn = viewState === "signin";
  const isSignUp = viewState === "signup";
  const isForgotPassword = viewState === "forgot-password";
  const isOtp = viewState === "otp";
  const isResetPassword = viewState === "reset-password";

  return (
    <div className="hidden md:block w-full md:w-1/2 relative rounded-[2.5rem] overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.08)] min-h-[600px] bg-stone-900 group">
      {/* Sign In Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isSignIn ? 1 : 0 }}
      >
        <Image
          src={signInImage}
          alt="Artisan Bread"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
      </div>

      {/* Sign Up Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isSignUp ? 1 : 0 }}
      >
        <Image
          src={signUpImage}
          alt="Traditional Food"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
      </div>

      {/* Forgot Password Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isForgotPassword ? 1 : 0 }}
      >
        <Image
          src={forgotPasswordImage}
          alt="Traditional Meat Stew"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
      </div>

      {/* OTP Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isOtp ? 1 : 0 }}
      >
        <Image
          src={otpImage}
          alt="Spaghetti Bolognese"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
      </div>

      {/* Reset Password Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isResetPassword ? 1 : 0 }}
      >
        <Image
          src={resetPasswordImage}
          alt="Traditional Pasta Dish"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Content overlay */}
      <div className="absolute bottom-16 left-12 right-12 pr-8 z-10">
        <div className="relative">
          <Sparkles
            className="absolute -top-12 -left-6 text-yellow-100 opacity-60 animate-pulse"
            size={24}
            fill="currentColor"
          />
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.1] relative">
            Fresh, traditional dishes <br />
            <span className="text-[#E86F24] italic">prepared</span> daily
          </h2>
          <p className="text-white/60 mt-6 text-sm max-w-[280px] leading-relaxed">
            Experience the authentic taste of Varivo bistro, where every meal is
            a celebration of tradition.
          </p>
          <Sparkles
            className="absolute -bottom-4 right-0 text-white opacity-40"
            size={20}
            fill="currentColor"
          />
        </div>
      </div>

      {/* Decorative lines */}
      <svg
        className="absolute top-1/2 left-0 w-full h-[200px] text-white/5 pointer-events-none"
        viewBox="0 0 1000 200"
        fill="none"
      >
        <path
          d="M0,150 Q150,50 300,100 T600,150 T900,80 T1100,120"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 20"
        />
      </svg>
    </div>
  );
}