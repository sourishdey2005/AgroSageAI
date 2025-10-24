import type { SVGProps } from "react";

export function AgroSageLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M13 22V8a5 5 0 0 0-5-5H3" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}
