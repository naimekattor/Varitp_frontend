"use client";

import { useState } from "react";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { MapPin, Phone, User } from "lucide-react";

export default function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const updateField = (
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form className="space-y-5">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            updateField("firstName", e.target.value)
          }
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            updateField("lastName", e.target.value)
          }
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="relative">
        <MapPin
          className="absolute left-3 top-3.5 text-[#E86F24]"
          size={18}
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            updateField("address", e.target.value)
          }
          className="w-full border rounded-xl p-3 pl-10"
        />
      </div>

      <div className="relative">
        <Phone
          className="absolute left-3 top-3.5 text-[#E86F24]"
          size={18}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            updateField("phone", e.target.value)
          }
          className="w-full border rounded-xl p-3 pl-10"
        />
      </div>

      <PasswordInput
        value={form.password}
        onChange={(value) =>
          updateField("password", value)
        }
        visible={showPassword}
        onToggle={() =>
          setShowPassword(!showPassword)
        }
        placeholder="Password"
      />

      <PasswordInput
        value={form.confirmPassword}
        onChange={(value) =>
          updateField("confirmPassword", value)
        }
        visible={showConfirmPassword}
        onToggle={() =>
          setShowConfirmPassword(
            !showConfirmPassword
          )
        }
        placeholder="Confirm Password"
      />

      <button className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-3 rounded-xl">
        Create Account
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-[#E86F24] font-medium"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}