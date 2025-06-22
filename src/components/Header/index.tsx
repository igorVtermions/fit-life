import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "../sign-out-button";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="flex h-16 items-center justify-between bg-black px-8">
      <h1 className="text-2xl font-bold">
        <span className="text-orange-700">Fit</span>Life
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li className="cursor-pointer transition duration-200 hover:text-orange-700">
            Inicio
          </li>
          <li className="cursor-pointer transition duration-200 hover:text-orange-700">
            Planos
          </li>
          {session?.user ? (
            <li className="cursor-pointer transition duration-200 hover:text-orange-700">
              <SignOutButton
                variant="link"
                className="h-fit cursor-pointer p-0 text-white transition duration-200 hover:text-orange-700"
              />
            </li>
          ) : (
            <li className="cursor-pointer transition duration-200 hover:text-orange-700">
              <Link href={"/authentication"}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
