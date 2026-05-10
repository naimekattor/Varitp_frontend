import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function LoginPage() {
  return (
    <AuthLayout image="/images/login.jpg">
      <SignInForm />
    </AuthLayout>
  );
}