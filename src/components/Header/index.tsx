import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "../sign-out-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>AH</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black hover:bg-gray-900">
                <DropdownMenuItem>
                  <li className="cursor-pointer">
                    <SignOutButton
                      variant="link"
                      className="h-fit cursor-pointer p-0 text-white"
                    />
                  </li>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
