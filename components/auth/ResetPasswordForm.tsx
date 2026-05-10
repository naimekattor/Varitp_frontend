"use client";

import { useState } from "react";
import PasswordInput from "./PasswordInput";
import SuccessModal from "./SuccessModal";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setShowSuccess(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <PasswordInput
          value={form.password}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              password: value,
            }))
          }
          visible={showPassword}
          onToggle={() =>
            setShowPassword(!showPassword)
          }
          placeholder="New Password"
        />

        <PasswordInput
          value={form.confirmPassword}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              confirmPassword: value,
            }))
          }
          visible={showConfirmPassword}
          onToggle={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
          placeholder="Confirm Password"
        />

        <button className="w-full bg-[#E86F24] text-white py-3 rounded-xl">
          Change Password
        </button>
      </form>

      <SuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);

          router.push("/auth/login");
        }}
      />
    </>
  );
}