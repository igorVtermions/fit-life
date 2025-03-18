"use client";

import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {

  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/home"); 
    }
  }, [isSignedIn, router]);

  return (
    <header className="h-16 bg-black flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold">
        <span className="text-orange-700">Fit</span>Life
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li className="cursor-pointer hover:text-orange-700 transition duration-200">
            Inicio
          </li>
          <li className="cursor-pointer hover:text-orange-700 transition duration-200">
            Planos
          </li>
          <li className="cursor-pointer hover:text-orange-700 transition duration-200 ">
            <SignedOut>
              <SignInButton>Login</SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </nav>
    </header>
  );
}
