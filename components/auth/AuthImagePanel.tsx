"use client";

import Image from "next/image";

interface Props {
  image: string;
}

export default function AuthImagePanel({
  image,
}: Props) {
  return (
    <div className="hidden md:block relative w-1/2 rounded-[2rem] overflow-hidden">
      <Image
        src={image}
        alt="Auth Image"
        fill
        className="object-cover"
      />
    </div>
  );
}