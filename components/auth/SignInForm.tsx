"use client";

import { useState } from "react";
import PasswordInput from "./PasswordInput";

export default function SignInForm() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <form className="space-y-5">
      <input
        type="text"
        placeholder="Username"
        className="w-full border rounded-xl p-3"
      />

      <PasswordInput
        value={password}
        onChange={setPassword}
        visible={visible}
        onToggle={() => setVisible(!visible)}
      />

      <button className="w-full bg-[#E86F24] text-white py-3 rounded-xl">
        Sign In
      </button>
    </form>
  );
}