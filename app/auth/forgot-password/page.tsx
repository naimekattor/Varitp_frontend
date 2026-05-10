import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout image="/images/forgot-password.jpg">
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot Password?
        </h1>

        <p className="text-sm text-gray-500">
          Enter your email to receive reset instructions.
        </p>
      </div>

      <ForgotPasswordForm />
    </AuthLayout>
  );
}