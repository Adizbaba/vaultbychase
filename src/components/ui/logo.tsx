"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const { theme } = useTheme();

  return (
    <div className="relative w-[120px] h-[40px]">
      <Image
        src={theme === "dark" ? "/darklogo.png" : "/lightlogo.png"}
        alt="VaultbyChase Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
} 