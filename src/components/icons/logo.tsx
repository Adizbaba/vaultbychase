import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="150"
      height="36"
      viewBox="0 0 150 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VaultbyChase Logo"
      {...props}
    >
      <text
        x="0"
        y="26"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--primary))" // Use primary color from theme
      >
        VaultbyChase
      </text>
    </svg>
  );
}
