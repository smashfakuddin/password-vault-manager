"use client";
import { signOut } from "next-auth/react";

export default function Intro({
  session,
  message,
}: {
  session: any;
  message: any;
}) {
  return (
    <h1 className="text-4xl font-semibold tracking-tight  flex items-center gap-2">
      Good {message}, {session?.user?.name} !
      <span
        onClick={() => {
          signOut();
          console.log("hello");
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-log-out-icon lucide-log-out"
        >
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        </svg>
      </span>
    </h1>
  );
}
