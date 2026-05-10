import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout image="/images/reset-password.jpg">
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Reset Password
        </h1>

        <p className="text-sm text-gray-500">
          Enter your new password below.
        </p>
      </div>

      <ResetPasswordForm />
    </AuthLayout>
  );
}