"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  const { theme } = useTheme();

  return (
    <div className={cn("relative w-[150px] h-[36px]", className)} {...props}>
      <Image
        src={theme === "dark" ? "/darkmode.png" : "/lightmode.png"}
        alt="VaultbyChase Logo"
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 120px, 150px"
      />
    </div>
  );
}
