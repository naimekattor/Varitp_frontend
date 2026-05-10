import AuthLayout from "@/components/auth/AuthLayout";
import OtpVerificationForm from "@/components/auth/OtpVerificationForm";

export default function OtpPage() {
  return (
    <AuthLayout image="/images/otp.jpg">
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Verify OTP
        </h1>

        <p className="text-sm text-gray-500">
          Enter the OTP sent to your email.
        </p>
      </div>

      <OtpVerificationForm />
    </AuthLayout>
  );
}