"use client";

import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/home"); 
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <SignedOut>
        <SignInButton>
          <button className="cursor-pointer">
            Login
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
      </SignedIn>
    </div>
  );
}