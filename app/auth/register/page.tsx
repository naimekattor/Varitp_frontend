import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

export default function RegisterPage() {
  return (
    <AuthLayout image="/images/register.jpg">
      <div className="space-y-3 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="text-sm text-gray-500">
          Join us and start ordering your favorite meals.
        </p>
      </div>

      <SignUpForm />
    </AuthLayout>
  );
}