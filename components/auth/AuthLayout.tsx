"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  image: string;
}

export default function AuthLayout({
  children,
  image,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-7xl w-full flex gap-6">
        <div className="w-full md:w-1/2 bg-white rounded-[2rem] p-10">
          {children}
        </div>

        <AuthImagePanel image={image} />
      </div>
    </div>
  );
}