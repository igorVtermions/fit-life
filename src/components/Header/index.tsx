"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
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
          <li className="cursor-pointer transition duration-200 hover:text-orange-700">
            <Link href={"/authentication"}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
